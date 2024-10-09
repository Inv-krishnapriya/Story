import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OfferSchedule from "../../campaign/details/[id]/OfferSchedule";
import AppTheme from "../../../../theme";
import { act } from "react-dom/test-utils";

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

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();

  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

jest.useFakeTimers();

const mockProps = {
  open: true,
  onClose: jest.fn(),
  onDisagree: jest.fn(),
  applicantList: [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Doe" },
  ],
  timeslotList: [
    {
      id: "1",
      startTime: "2024-02-29T10:00:00Z",
      endTime: "2024-02-29T12:00:00Z",
      type: 0,
    },
    {
      id: "2",
      startTime: "2024-02-29T14:00:00Z",
      endTime: "2024-02-29T16:00:00Z",
      type: 0,
    },
  ],
  campaignId: "campaignId",
  handleCampaign: jest.fn(),
};

describe("OfferSchedule", () => {
  act(() => {
    jest.runAllTimers();
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <OfferSchedule {...mockProps} />
      </AppTheme>
    );
    jest.advanceTimersByTime(400);

    const mintSwitch = screen.getByLabelText("checkbox");
    fireEvent.click(mintSwitch);
    fireEvent.click(mintSwitch);
    fireEvent.click(screen.getByLabelText("item-0"));
    fireEvent.click(screen.getByTestId("more-button"));
    fireEvent.click(screen.getByTestId("offer-button"));
  });
});
