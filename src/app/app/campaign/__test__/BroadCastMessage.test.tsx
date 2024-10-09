import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  logRoles,
  createEvent,
  act,
  waitFor,
} from "@testing-library/react";
import BroadCastMessage from "../details/[id]/BroadcastMessage";
import AppTheme from "../../../../theme";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

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
  useSelector: jest.fn(() => ["1"]),
}));

// Manual mock for IntersectionObserver
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Define IntersectionObserver in the global scope
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserverMock;
  }
}
(window.IntersectionObserver as any) = IntersectionObserverMock;
jest.mock("react-use-websocket", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      sendJsonMessage: jest.fn(),
    })),
    setMockReadyState: jest.fn(),
    setMockSendJsonMessage: jest.fn(),
    setMockSendMessage: jest.fn(),
    readyState: jest.fn(),
    ReadyState: {
      CONNECTING: "Connecting",
      OPEN: "Open",
      CLOSING: "Closing",
      CLOSED: "Closed",
      UNINSTANTIATED: "Uninstantiated",
    },
  };
});

describe("BroadCastMessage component", () => {
  beforeAll(() => {});

  afterAll(() => {
    jest.clearAllMocks();
  });

  const onClose = jest.fn();

  const onDisagree = jest.fn();

  const handleCampaign = (id: any) => jest.fn();

  const props = {
    open: true,
    onClose,
    onDisagree,
    applicantList: [
      { id: "1", name: "Applicant 1" },
      { id: "2", name: "Applicant 2" },
      { id: "3", name: "Applicant 3" },
      { id: "4", name: "Applicant 4" },
      { id: "5", name: "Applicant 5" },
      { id: "6", name: "Applicant 6" },
      { id: "7", name: "Applicant 7" },
    ],
    campaignId: "campaign123",
    handleCampaign,
  };

  (useSelector as jest.Mock).mockReturnValueOnce([]);

  it("renders properly", () => {
    render(
      <AppTheme>
        <BroadCastMessage {...props} />
      </AppTheme>
    );

    props.applicantList.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  it("should be able add files", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <BroadCastMessage {...props} />
        </AppTheme>
      );
    });

    const fileContent = "a".repeat(1024 * 1024);

    const testImageFile = [
      new File([fileContent], "Hello.png", { type: "image/png" }),
      new File([fileContent], "World.png", { type: "image/png" }),
    ];

    const fileInput = screen.getByTestId("file-input");

    await waitFor(() => {
      userEvent.upload(fileInput, testImageFile);
    });
  });

  it("should be able add files", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <BroadCastMessage {...props} />
        </AppTheme>
      );
    });

    const fileContent = "a".repeat(1024 * 1024);

    const testImageFile = [
      new File([fileContent], "Hello.png", { type: "image/png" }),
      new File([fileContent], "World.png", { type: "image/png" }),
    ];

    const fileInput = screen.getByTestId("file-input");

    await waitFor(() => {
      userEvent.upload(fileInput, testImageFile);
    });
  });

  it("should display hidden user count", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <BroadCastMessage {...props} />
        </AppTheme>
      );
    });

    const displayedUsers = screen.queryAllByText(/Applicant/i);
    const hiddenUserCount = props.applicantList.length - displayedUsers.length;
    if (hiddenUserCount > 0) {
      expect(screen.getByText(`+他${hiddenUserCount}名`)).toBeInTheDocument();
    }
  });
});
