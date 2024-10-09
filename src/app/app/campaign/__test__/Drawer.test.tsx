import React from "react";
import {
  fireEvent,
  logRoles,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import AppliedMonitorDrawer from "../details/[id]/Drawer";
import { useDispatch } from "react-redux";
import AppTheme from "@/theme";
import useWebSocket from "react-use-websocket";
import { act } from "react-dom/test-utils";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => (
    <div>{children}</div>
  ),
}));

jest.mock("swiper/css", () => "");

jest.mock("swiper/css/navigation", () => "");

jest.mock("swiper/modules", () => ({
  Navigation: jest.fn(),
  Autoplay: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-use-websocket");

const monitorDetail = {
  age: 45,
  gender: 1,
  memo: "",
  occupation: "",
  prefecture: "",
};

const meetingDetails = {
  id: "",
  meetingId: "",
  passcode: "",
  url: "",
};

const monitorData = {
  campaignId: "",
  id: "",
  name: "",
  status: 1,
  confirmedStatus: 1,
  timeslotsList: [],
  answers: [{ questionText: "", answer: "" }],
  meetingDetails,
  monitorDetail,
  scheduleConfirmationDetails: [],
  unreadCount: 1,
};

const campaignDetail = {
  campaignId: "yourCampaignIdHere",
  duration: 60,
  startDate: "2024-02-08T00:00:00Z",
  endDate: "2024-02-22T00:00:00Z",
};

describe("DrawerComponent", () => {
  beforeAll(async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useWebSocket as any).mockImplementation((url: any, options: any) => {
      const { onOpen, onClose, onReconnectStop, shouldReconnect, onMessage } =
        options;

      React.useEffect(() => {
        onMessage({
          data: `{"data": {"message": "hkiiiiii", "messageId": ["d7746372c3f645ca9b02d263fa6bc98f"], "senderId": "c0abef3c9cdd49aaa89e89e9fccb9e5e", "type": "chat_message", "messageType": 2, "datetime": "2024-02-20T12:20:54.751Z", "status": 0, "files": [], "id": "c6c4f5ee147c4a50b2789baffd44b059"}}`,
        });
      }, []);

      return {
        readyState: 1,
        sendJsonMessage: jest.fn(),
      };
    });
  });

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <AppliedMonitorDrawer
          open
          closeDrawer={jest.fn()}
          handleCampaign={jest.fn()}
          limitReached={false}
          campaignDetail={campaignDetail}
          monitorData={monitorData}
        />
      </AppTheme>
    );

    expect(screen.getAllByRole("tab").length).toBe(3);
  });

  it("should be able to click on close button", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <AppliedMonitorDrawer
            open
            closeDrawer={jest.fn()}
            handleCampaign={jest.fn()}
            limitReached={false}
            campaignDetail={campaignDetail}
            monitorData={monitorData}
          />
        </AppTheme>
      );
    });

    const presentation = screen.getByRole("presentation");
    await waitFor(() => {
      fireEvent.click(within(presentation).getByRole("button"));
    });
  });

  it("should be able to switch tabs", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <AppliedMonitorDrawer
            open
            closeDrawer={jest.fn()}
            handleCampaign={jest.fn()}
            limitReached={false}
            campaignDetail={campaignDetail}
            monitorData={monitorData}
          />
        </AppTheme>
      );
    });

    const tabs = screen.getAllByRole("tab");
    await waitFor(() => {
      tabs.forEach((tab) => {
        fireEvent.click(tab);
      });
    });
  });

  it("should be able to send offer", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <AppliedMonitorDrawer
            open
            closeDrawer={jest.fn()}
            handleCampaign={jest.fn()}
            limitReached={false}
            campaignDetail={campaignDetail}
            monitorData={monitorData}
          />
        </AppTheme>
      );
    });

    const buttons = screen.getAllByRole("button");
    await act(async () => {
      buttons.forEach((button) => {
        fireEvent.click(button);
      });
    });
  });
});
