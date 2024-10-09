




import { act, render } from "@testing-library/react";
import AppTheme from "../../../theme";
import NotificationDetailsPage from "../home/notification/[id]/page";
import { customerService } from "@/common/apiUrls";
import { useDispatch } from "react-redux";

jest.mock("axios");
jest.mock("../../../common/apiUrls", () => ({
  customerService: {
    getNotificationDetails: jest.fn(() => Promise.resolve({ data: { data: "" } })),
    
  },
}));
jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn().mockReturnValue({ id: 123456 }),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
describe("Notification Detail with data", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });
  beforeEach(async () => {
    await act(async () => {
      customerService.getNotificationDetails.mockResolvedValue({
        data:{
          data:{
            id: "5c2c91c0e39c406cb98c076a9b982ef9",
            title: "New message from monitor",
            body: "Monitor from test video interview has sent you a message",
            sender: "c0abef3c9cdd49aaa89e89e9fccb9e5e",
            receiver: "d7206b5d30554cb1a382fb6f230b1812",
            readStatus: true,
            interviewId: "4b7a7e20a2154e2a966d769485cfeab6",
            notificationType: 7,
            category: 2,
            createdAt: "2024-02-12T10:14:25.097818Z",
            updatedAt: "2024-02-12T10:14:25.097852Z",
          }
        }
      })
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("notiification page", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <NotificationDetailsPage />
        </AppTheme>
      );
    });
  });
});




describe("Notification Detail without data", () => {
  beforeAll(() => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });
  beforeEach(async () => {
    await act(async () => {

    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("notiification page", async () => {
    await act(async () => {
      render(
        <AppTheme>
          <NotificationDetailsPage />
        </AppTheme>
      );
    });
  });
});
