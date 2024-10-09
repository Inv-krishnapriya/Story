import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodaysFeedDetails from "../TodaysFeedDetails";
import AppTheme from "../../../../theme";
import { useDispatch } from "react-redux";

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

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"),
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
(useDispatch as jest.Mock).mockReturnValue(mockDispatch);

const mockData = {
  monitorId: "123",
  id: "123",
  startsAt: "2024-02-29T10:00:00Z",
  endsAt: "2024-02-29T12:00:00Z",
  nickName: "John Doe",
  title: "Campaign Title",
};

describe("TodaysFeedDetails", () => {
  it("renders without crashing", () => {
    render(
      <AppTheme>
        <TodaysFeedDetails data={mockData} />
      </AppTheme>
    );
    const goToScheduleButton = screen.getByTestId("go-to-schedule");
    fireEvent.click(goToScheduleButton);
  });
});
