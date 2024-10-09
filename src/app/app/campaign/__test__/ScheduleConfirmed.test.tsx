import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ScheduleConfirmed from "../details/[id]/ScheduleConfirmed";
import AppTheme from "../../../../theme";
import { useDispatch } from "react-redux";
import moment from "moment";

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

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue("123"), // mock campaignId
  }),
}));

const mockDispatch = jest.fn();
(useDispatch as jest.Mock).mockReturnValue(mockDispatch);
const writeTextMock = jest.fn().mockImplementation((text) => {
  return Promise.resolve(); // or Promise.reject() for rejection
});
Object.assign(navigator, {
  clipboard: {
    writeText: writeTextMock,
  },
});

describe("ScheduleConfirmed component", () => {
  const scheduleInfo = {
    url: "https://example.com/meeting",
    id: "1234567890",
    passcode: "1234",
    meetingId: "1234",
  };
  const now = moment();
  const startTime = now.clone().subtract(5, "minutes");
  const endTime = now.clone().add(5, "minutes");
  const confirmationDetails = {
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    id: "scheduleId",
  };

  const props = {
    campaignId: "campaign1",
    monitorId: "monitor1",
    monitorStatus: 7,
    scheduleInfo: scheduleInfo,
    closeDrawer: jest.fn(),
    handleCampaign: jest.fn(),
    confirmationDetails: confirmationDetails,
  };

  it("renders correctly", () => {
    render(
      <AppTheme>
        <ScheduleConfirmed {...props} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("copy-button"));
  });
  it("renders correctly", () => {
    render(
      <AppTheme>
        <ScheduleConfirmed {...props} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("cancellation-button"));
    fireEvent.click(screen.getByTestId("modal-onAgree"));
  });
  it("renders correctly", () => {
    const confirmationDetails = {
      startTime: "2024-02-29T09:00:00Z",
      endTime: "2024-02-29T10:00:00Z",
      id: "scheduleId",
    };
    const newProps = {
      ...props,
      confirmationDetails: confirmationDetails,
    };
    render(
      <AppTheme>
        <ScheduleConfirmed {...newProps} />
      </AppTheme>
    );

    fireEvent.click(screen.getByTestId("cancellation-button"));
    fireEvent.click(screen.getByTestId("join-room"));
    fireEvent.click(screen.getByTestId("modal-onAgree"));
  });
  it("renders correctly", () => {
    render(
      <AppTheme>
        <ScheduleConfirmed {...props} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("cancellation-button"));
    fireEvent.click(screen.getByTestId("modal-onDisAgree"));
  });
  it("renders correctly", () => {
    const confirmationDetails = {
      startTime: "2024-02-29T09:00:00Z",
      endTime: "2024-02-29T10:00:00Z",
      id: "scheduleId",
    };
    const newProps = {
      ...props,
      confirmationDetails: confirmationDetails,
    };
    render(
      <AppTheme>
        <ScheduleConfirmed {...newProps} />
      </AppTheme>
    );

    fireEvent.click(screen.getByTestId("cancellation-button"));

    fireEvent.click(screen.getByTestId("modal-onDisAgree"));
  });
});
