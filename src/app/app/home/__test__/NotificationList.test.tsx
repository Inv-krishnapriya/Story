import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import NotificationList from "../NotificationList";
import { useDispatch } from "react-redux";
import AppTheme from "../../../../theme";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  useSwiper: () => ({
    swiper: {
      slideNext: () => {},
    },
  }),
}));

jest.mock("swiper", () => ({
  default: jest.fn(),
  Thumbs: jest.fn(),
}));
jest.mock("swiper/modules", () => ({
  Navigation: jest.fn(),
  Autoplay: jest.fn(),
}));
jest.mock("swiper/css", () => "");
jest.mock("swiper/css/navigation", () => "");

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
(useDispatch as jest.Mock).mockReturnValue(mockDispatch);

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"),
  }),
}));

describe("NotificationList", () => {
  it("renders loading state when loading is true", () => {
    const { getByTestId } = render(
      <AppTheme>
        <NotificationList loading={true} />
      </AppTheme>
    );
    expect(getByTestId("progress-bar")).toBeInTheDocument();
  });

  it("renders notification items when notificationList is not empty", () => {
    const notificationList = [{ id: 1, title: "Notification 1" }];
    render(
      <AppTheme>
        <NotificationList notificationList={notificationList} loading={false} />
      </AppTheme>
    );
  });
});
