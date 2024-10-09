"use client";

import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { customerService } from "@/common/apiUrls";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import { addClientData } from "@/stores/global/reducer";
import { useRouter } from "next/navigation";

import {
  MintAlert,
  MintButton,
  MintTextField,
  MintTypography,
} from "@/design-system";
import ConfirmationModal from "@/components/Modal/confirmation/ConfirmationModal";
import { getErrorCode, getErrorMessage } from "@/utils";
import { IResponse } from "@/common/types";

const Schema = yup.object().shape({
  username: yup.string().min(1).required(),
  password: yup.string().min(1).required(),
});

export type TScheme = yup.InferType<typeof Schema>;

interface ILoginResponse {
  userDetails: IUserDetails;
  accessToken: string;
  refreshToken: string;
}

interface IUserDetails {
  customerId: string;
  userId: string;
  lName: string;
  fName: string;
  isUserServiceAgreementAccepted: boolean;
  isUserConfidentialityAgreementAccepted: boolean;
  lNameKana: string;
  fNameKana: string;
  companyName: string;
}

function Login() {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState<{
    error: string | undefined;
    isDisabled: boolean;
    isModalOpen: boolean;
  }>({
    error: "",
    isDisabled: false,
    isModalOpen: false,
  });

  const [userData, setUserData] = useState<TScheme>({
    username: "",
    password: "",
  });

  const methods = useForm<TScheme>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(Schema),
  });
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = methods;

  setLocale({
    mixed: {
      default: "field_invalid",
      required: ({ path }) =>
        t("messages.required", { field: t(`login.${path}`) }),
    },
    string: {
      max: ({ max, path }) =>
        t("messages.max-length", {
          field: t(`login.${path}`),
          max,
        }),
    },
  });

  const loginUser = async (form: TScheme, isSessionExist: boolean = false) => {
    try {
      const res: any = await customerService.authenticateUser({
        ...form,
        isSessionExist,
      });

      const response: IResponse<ILoginResponse> = res.data;
      const userDetails = response.data?.userDetails;
      const accessToken = response.data?.accessToken;
      const refreshToken = response.data?.refreshToken;
      dispatch(
        addClientData(
          JSON.stringify({ ...userDetails, accessToken, refreshToken })
        )
      );

      setForm((prev) => ({
        ...prev,
        isDisabled: false,
      }));

      const hasUserAgreedPolicies =
        userDetails?.isUserConfidentialityAgreementAccepted &&
        userDetails?.isUserServiceAgreementAccepted;
      router.push(
        hasUserAgreedPolicies ? "/app/home" : "/auth/accept-app-policy"
      );
    } catch (error: any) {
      const errorCode = getErrorCode(error?.response?.data);
      const errorMessage = getErrorMessage(error?.response?.data) ?? "";
      if (errorCode !== "E100002") {
        reset();
      }
      setForm((prev) => ({
        ...prev,
        isDisabled: false,
        error: errorMessage,
        isModalOpen: errorCode === "E100002",
      }));
    }
  };

  const handleClose = () => {
    setForm((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
  };

  const handleModalSubmit = () => {
    loginUser(userData, true);
  };

  const onSubmit = handleSubmit((data) => {
    setUserData(data);
    loginUser(data);
  });

  return (
    <form onSubmit={onSubmit} data-testid="login-form">
      <Box
        sx={{
          px: theme.mint.spacing.s,
          py: theme.mint.spacing.xxs,
        }}
      >
        <MintTypography
          size="head-l"
          weight="700"
          color={theme.mint.color.text.accent}
        >
          {t("forms.client-login.header")}
        </MintTypography>
      </Box>
      <Box
        p={theme.mint.spacing.s}
        bgcolor={theme.mint.color.background.containerBg.layer1}
        display={"flex"}
        flexDirection={"column"}
        gap={theme.mint.spacing.l}
        borderRadius={theme.mint.cornerRadius.xs}
        mt={theme.mint.spacing.m}
      >
        <MintTypography weight="400" size="body">
          {t("forms.client-login.instruction.label")}
        </MintTypography>
        {form.error && (
          <MintAlert severity="error" variant="outlined" message={form.error} />
        )}

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={theme.mint.spacing.s}
        >
          <Controller
            name={"username"}
            control={control}
            render={({ field }) => (
              <MintTextField
                label={t("forms.client-login.login-id.label")}
                required
                placeholder={t("forms.client-login.login-id.placeholder")}
                fullWidth
                {...field}
                error={!!form.error}
                inputProps={{
                  "data-testid": "login-id",
                }}
              />
            )}
          />
          <Controller
            name={"password"}
            control={control}
            render={({ field }) => (
              <MintTextField
                label={t("forms.client-login.password.label")}
                required
                placeholder={t("forms.client-login.password.placeholder")}
                fullWidth
                type="password"
                {...field}
                error={!!form.error}
                inputProps={{
                  "data-testid": "password",
                }}
              />
            )}
          />
        </Box>
        <Box>
          <MintButton
            color="primary"
            type="submit"
            disabled={!isValid || form?.isDisabled}
            data-testid="login-submit"
          >
            {t("forms.client-login.submit.label")}
          </MintButton>
        </Box>
        {form.isModalOpen && (
          <ConfirmationModal
            open={form.isModalOpen}
            onAgree={handleModalSubmit}
            onDisagree={handleClose}
            onClose={handleClose}
            title="modal.client-login.title"
            content="modal.client-login.content"
            agreeButtonName="modal.client-login.agreeButton"
            disAgreeButtonName="modal.client-login.disAgreeButton"
            modalWidth="400px"
          />
        )}
      </Box>
    </form>
  );
}

export default Login;
