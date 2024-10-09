import React from "react";
import { render } from "@testing-library/react";
import TodaysFeedList from "../TodaysFeedList";
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

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"),
  }),
}));

const mockTodaysList = [
  {
    id: "1",
    startsAt: "2024-02-29T10:00:00Z",
    endsAt: "2024-02-29T12:00:00Z",
    nickName: "John Doe",
    title: "Interview Title",
  },
];

jest.mock("@/common/apiUrls", () => ({
  customerService: {
    getTodaysInterviewList: jest.fn(() =>
      Promise.resolve({ data: { data: mockTodaysList } })
    ),
  },
}));

describe("TodaysFeedList", () => {
  it("renders without crashing", () => {
    render(
      <AppTheme>
        <TodaysFeedList />
      </AppTheme>
    );
  });
});
