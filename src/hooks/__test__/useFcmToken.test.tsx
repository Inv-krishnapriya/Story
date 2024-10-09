import { getToken } from "firebase/messaging";
import { useDispatch } from "react-redux";
import { communicationService } from "@/common/apiUrls";
import { act, fireEvent, render, screen } from "@testing-library/react";
import UseFcmToken from "../useFcmToken";
import AppTheme from "@/theme";
import { AxiosResponse } from "axios";

jest.mock("firebase/messaging", () => ({
  getMessaging: jest.fn(),
  getToken: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("@/common/apiUrls", () => ({
  communicationService: {
    registerFCMToken: jest.fn(),
  },
}));

jest.mock("@/stores/global/reducer", () => ({
  setFcmToken: jest.fn(),
}));

(global as any).window.Notification = {
  requestPermission: jest.fn(),
  // permission: jest.fn(),
};

const mockPermission = jest.fn();

Object.defineProperty(window, "Notification", {
  value: {
    get permission() {
      return mockPermission();
    },
  },
});

const mockServiceWorker = {
  register: jest.fn(),
  unregister: jest.fn(),
  // Add any other methods or properties you need to mock
};

Object.defineProperty(navigator, "serviceWorker", {
  value: mockServiceWorker,
  writable: true,
});

jest.useFakeTimers();

describe("useFcmToken", () => {
  describe("Permission granted", () => {
    beforeAll(() => {
      window.Notification.requestPermission = jest
        .fn()
        .mockResolvedValue("granted");

      mockPermission.mockReturnValue("granted");
    });

    const axiosResponse = {
      data: { message: "Success" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };

    jest
      .spyOn(communicationService, "registerFCMToken")
      .mockResolvedValue(axiosResponse as AxiosResponse);

    beforeEach(() => {
      // Clear mocks before each test
      jest.clearAllMocks();
    });

    it("registers FCM token if permission is granted", async () => {
      const mockDispatch = jest.fn();
      (useDispatch as any).mockReturnValue(mockDispatch);

      // Mock getToken to return a token
      (getToken as any).mockResolvedValue("mock-token");

      // Mock Notification.requestPermission to grant permission

      await act(async () => {
        render(<UseFcmToken />);
      });

      // Wait for async operations to complete
      await Promise.resolve();
    });
  });

  describe("Permission denied", () => {
    beforeAll(() => {
      window.Notification.requestPermission = jest
        .fn()
        .mockResolvedValue("denied");

      mockPermission.mockReturnValue("denied");
    });

    beforeEach(() => {
      // Clear mocks before each test
      jest.clearAllMocks();
    });

    it("should render the confirmation modal and able to click confirm", async () => {
      const mockDispatch = jest.fn();
      (useDispatch as any).mockReturnValue(mockDispatch);

      // Mock getToken to return a token
      (getToken as any).mockResolvedValue("mock-token");

      await act(async () => {
        render(
          <AppTheme>
            <UseFcmToken />
          </AppTheme>
        );
      });

      await act(async () => {
        jest.runAllTimers();
      });

      const confirmationButton = screen.getAllByRole("button")[1];
      expect(confirmationButton).toHaveAttribute(
        "id",
        "confirmation-agreeButton"
      );

      await act(async () => {
        fireEvent.click(confirmationButton);
      });
    });

    it("should render the confirmation modal and able to click disagree", async () => {
      const mockDispatch = jest.fn();
      (useDispatch as any).mockReturnValue(mockDispatch);

      // Mock getToken to return a token
      (getToken as any).mockResolvedValue("mock-token");

      await act(async () => {
        render(
          <AppTheme>
            <UseFcmToken />
          </AppTheme>
        );
      });

      await act(async () => {
        jest.runAllTimers();
      });

      const disagreeButton = screen.getAllByRole("button")[0];
      expect(disagreeButton).toHaveAttribute(
        "id",
        "confirmation-disAgreeButton"
      );

      await act(async () => {
        fireEvent.click(disagreeButton);
      });
    });
  });
});
