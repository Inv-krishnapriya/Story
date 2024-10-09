import {
  render,
  fireEvent,
  waitFor,
  screen,
  logRoles,
  act,
} from "@testing-library/react";
import NotificationDetails from "../NotificationDetails";
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

describe("NotificationDetails component", () => {
  const data = {
    id: "notificationId",
    body: "Notification Body",
    reciever: "recieverId",
    updatedAt: "2024-02-28T09:00:00Z",
    category: 2,
    interviewId: "interviewId",
    notificationType: 1,
    sender: "senderId",
    title: "Notification Title",
    createdAt: "2024-02-28T09:00:00Z",
    readStatus: false,
    interviewTitle: "Interview Title",
  };

  const props = {
    data: data,
    fromHome: true,
  };

  it("renders notification details correctly", () => {
    const { getByText } = render(
      <AppTheme>
        <NotificationDetails {...props} />
      </AppTheme>
    );

    expect(getByText("Notification Title")).toBeInTheDocument();
    expect(getByText("2024/02/28 (水) 14:30")).toBeInTheDocument();
  });

  it("handles notification selection for system message", async () => {
    const { getByTestId } = render(
      <AppTheme>
        <NotificationDetails {...props} />
      </AppTheme>
    );

    const listItem = getByTestId("notificationId");
    fireEvent.click(listItem);
  });

  it("handles notification selection for normal message", async () => {
    const mockApiResponse = {
      data: {
        data: {
          monitors: [
            {
              id: "senderId",
              nickName: "Sender Nickname",
              monitorStatus: "active",
              timeSlotDetails: {
                consumedStatus: "confirmed",
              },
              answer: ["Answer 1", "Answer 2"],
              memo: "Monitor Memo",
              gender: "Male",
              age: 30,
              occupation: "Software Engineer",
              prefecture: "Tokyo",
              meetingDetails: {
                link: "https://example.com/meeting",
                id: "meetingId",
                passCode: "123456",
                meetingId: "agoraMeetingId",
              },
              unreadCount: 0,
            },
          ],
          screening: {
            question: [
              { questionText: "Question 1" },
              { questionText: "Question 2" },
            ],
          },
          timeslotsList: [{ startTime: "startTime", endTime: "endTime" }],
          id: "campaignId",
        },
      },
    };

    const getFilterDataMock = jest
      .spyOn(require("@/common/apiUrls").customerService, "getFilterData")
      .mockResolvedValue(mockApiResponse);

    const { getByTestId } = render(
      <AppTheme>
        <NotificationDetails {...props} />
      </AppTheme>
    );

    const listItem = getByTestId("notificationId");
    fireEvent.click(listItem);
  });

  it("Should be able to click notification title", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <NotificationDetails {...props} />
        </AppTheme>
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Notification Title"));
    });
  });
});
