import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MonitorCancellation from "../details/[id]/MonitorCancellation";
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

describe("MonitorCancellation component", () => {
  const confirmedSchedule = {
    startTime: "2024-02-29T09:00:00Z",
    endTime: "2024-02-29T10:00:00Z",
  };

  it("renders correctly", () => {
    const props = {
      monitorStatus: 8,
      campaignId: "campaign1",
      monitorId: "monitor1",
      confirmedSchedule: confirmedSchedule,
      handleCampaign: jest.fn(),
      closeDrawer: jest.fn(),
    };

    const { getByText } = render(
      <AppTheme>
        <MonitorCancellation {...props} />{" "}
      </AppTheme>
    );

    // Check if the component renders with the correct text content

    expect(
      getByText(
        "キャンセルされた日程を、他の候補者が応募できるようにしますか？"
      )
    ).toBeInTheDocument();
  });

  it("handles schedule open or block actions", async () => {
    const handleCampaign = jest.fn();
    const closeDrawer = jest.fn();
    const props = {
      monitorStatus: 8,
      campaignId: "campaign1",
      monitorId: "monitor1",
      confirmedSchedule: confirmedSchedule,
      handleCampaign: handleCampaign,
      closeDrawer: closeDrawer,
    };

    render(
      <AppTheme>
        <MonitorCancellation {...props} />{" "}
      </AppTheme>
    );

    const buttons = screen.queryAllByRole("button");
    await waitFor(() => {
      buttons.forEach((button) => {
        fireEvent.click(button);
      });
    });
  });
});
