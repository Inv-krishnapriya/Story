import store from "@/stores";
import { RootState } from "@/stores/rootReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { addClientData, resetGlobalState } from "@/stores/global/reducer";
import { getErrorCode } from "@/utils";
import { SSO_Redirection_URL } from "./ApiConstants";

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const options = Intl.DateTimeFormat().resolvedOptions();
const timeZone = options.timeZone;
const toastMsg = () => {
  toast.dismiss();
  toast.info("Session timedout!", {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const axiosInstance = axios.create({
  baseURL: apiEndpoint,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "ja",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storeState: any = store.getState();
    const rootState: RootState = storeState;
    const accessToken = rootState?.global?.clientData?.accessToken;
    const token = accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;

      config.headers["tz"] = timeZone;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const storeState: any = store.getState();
    const rootstate: RootState = storeState;
    const isSsoLogin = rootstate?.global?.clientData?.isSsoLogin;
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      getErrorCode(error?.response?.data) === "E100103"
    ) {
      console.log("Refresh token expired!");
      store.dispatch(resetGlobalState());
      if (isSsoLogin) {
        window.location.replace(SSO_Redirection_URL);
      } else {
        window.location.replace("/auth/login");
      }
    } else if (
      error?.response?.status === 401 &&
      (getErrorCode(error?.response?.data) === "E100101" ||
        getErrorCode(error?.response?.data) === "E100003")
    ) {
      console.log("Token blacklisted or invalid token!");

      store.dispatch(resetGlobalState());
      if (isSsoLogin) {
        window.location.replace(SSO_Redirection_URL);
      } else {
        window.location.replace("/auth/login");
      }
      setTimeout(() => {
        if (isSsoLogin) {
          window.location.replace(SSO_Redirection_URL);
        } else {
          window.location.replace("/auth/login");
        }
      }, 500);
    } else if (
      error?.response?.status === 401 &&
      getErrorCode(error?.response?.data) === "E100102" &&
      !originalRequest._retry
    ) {
      console.log("Inside else if");
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + accessToken;
      axiosInstance.defaults.headers.common["tz"] = timeZone;
      return axiosPrivate(originalRequest);
    } else {
      throw error;
    }
  }
);
const refreshAccessToken = async () => {
  const storeState: any = store.getState();
  const rootstate: RootState = storeState;
  const refreshToken = rootstate?.global?.clientData?.refreshToken;
  const isSsoLogin = rootstate?.global?.clientData?.isSsoLogin;
  const data = { refreshToken: refreshToken };
  try {
    const response = await axios.post(
      `${apiEndpoint}customers/refresh-token`,
      data
    );
    console.log(response);
    const accessToken = response?.data?.data?.accessToken;
    let authTokens = JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    store.dispatch(addClientData(authTokens));
    return accessToken;
  } catch (err) {
    console.log("Error occured in generating refresh token: ", err);
    toastMsg();

    setTimeout(() => {
      store.dispatch(resetGlobalState());
      if (isSsoLogin) {
        window.location.replace(SSO_Redirection_URL);
      } else {
        window.location.replace("/auth/login");
      }
    }, 1000);
  }
};
const axiosPrivate = axiosInstance;
async function Api(
  path: string,
  request: any,
  method: any,
  params?: object | null,
  headers: any = {}
) {
  return axiosPrivate({
    data: request,
    method: method,
    url: path,
    params: params,
    headers: headers,
  }).then((res: any) => {
    if (res) {
      return res.data;
    } else {
      throw Object.assign(new Error("Invalid Response"), { code: 402 });
    }
  });
}

export { axiosPrivate, Api };
