import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import Chat from "../details/[id]/Chat";
import AppTheme from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { customerService } from "../../../../common/apiUrls";
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

jest.mock("../../../../common/apiUrls");

describe("Chat component", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue({
      global: { clientData: { userId: "mockedUserId" } },
      chat: { pendingImageMessages: [], pendingFileMessages: [] },
    });
  });
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

  const mockProps: any = {
    tabValue: 0,
    chatData: [],
    roomId: "roomId",
    campaignId: "campaignId",
    onAddChatData: jest.fn(),
    onSocketAddData: jest.fn(),
    onPaginationChange: jest.fn(),
    monitorStatus: jest.fn(),
    chatScrollToBottom: jest.fn(),
    monitorNickname: "John Doe",
  };

  it("renders without crashing", () => {
    render(
      <AppTheme>
        <Chat {...mockProps} />
      </AppTheme>
    );
    expect(
      screen.getByText("campaign.campaignDetail.modalMessage.sub-title")
    ).toBeInTheDocument();
  });

  it("renders chat messages when chatData is provided", () => {
    const chatData = [
      {
        messageId: "1",
        message: "Hello",
        senderId: "sender1",
        datetime: "2024-03-01T12:00:00Z",
        files: [],
        type: "message",
        status: 0,
      },
    ];
    render(
      <AppTheme>
        <Chat {...mockProps} chatData={chatData} />
      </AppTheme>
    );
    expect(screen.getByText("送信")).toBeInTheDocument();
  });

  it("calls onInputChange when text input changes", () => {
    render(
      <AppTheme>
        <Chat {...mockProps} />
      </AppTheme>
    );
    const inputElement = screen.getByPlaceholderText(/メッセージを送信/i);
    fireEvent.change(inputElement, { target: { value: "New message" } });
  });

  it("handles multi file change correctly", () => {
    render(
      <AppTheme>
        <Chat {...mockProps} />
      </AppTheme>
    );
    const inputElement = screen.getByTestId("file-input");
    const files = [
      new File(["file1 content"], "file1.txt", { type: "text/plain" }),
      new File(["file2 content"], "file2.txt", { type: "text/plain" }),
    ];
    Object.defineProperty(inputElement, "files", {
      value: files,
    });
    fireEvent.change(inputElement);
  });

  test("submits text", () => {
    const onAddChatData = jest.fn();
    const dispatch: any = jest.fn();
    const onSocketAddData: any = jest.fn();
    const monitorStatus = () => false;
    const formData = {
      textValue: "ddddddd",
      selectedFile: [],
      imagePreview: "",
      isActive: true,
      fileName: "",
      error: "",
    };

    render(
      <AppTheme>
        <Chat
          onSocketAddData={onSocketAddData}
          onAddChatData={onAddChatData}
          dispatch={dispatch}
          monitorStatus={monitorStatus}
          formData={formData}
        />
      </AppTheme>
    );
    fireEvent.change(screen.getByTestId("chat-input"), {
      target: { value: "chat" },
    });
    fireEvent.click(screen.getByTestId("chat-form"));
  });

  test("submits files when no text is provided", async () => {
    const mockCreateObjectURL = jest.fn();
    (global as any).URL.createObjectURL = mockCreateObjectURL;
    mockCreateObjectURL.mockImplementation(
      (file: any) => `mock-url/${file.name}`
    );
    const uploadFileMock = jest
      .fn()
      .mockResolvedValue({ data: { data: "mock-data" } });
    customerService.uploadFile = uploadFileMock;

    const onAddChatData = jest.fn();
    const dispatch = jest.fn();
    const onSocketAddData = jest.fn();
    const file = [
      new File(["hello"], "hello.png", {
        type: "image/png",
      }),
      new File(["hello"], "hello.png", {
        type: "txt/plain",
      }),
    ];
    const monitorStatus = () => false;
    const formData = {
      textValue: null,
      selectedFile: [{ name: "file1.txt", type: "image/png", size: 1024 }],
      imagePreview: "",
      isActive: true,
      fileName: "",
      error: "",
    };

    render(
      <AppTheme>
        <Chat
          onSocketAddData={onSocketAddData}
          onAddChatData={onAddChatData}
          dispatch={dispatch}
          monitorStatus={monitorStatus}
          formData={formData}
        />
      </AppTheme>
    );
    const input = screen.getByTestId("file-input");
    userEvent.upload(input, file);
    fireEvent.click(screen.getByTestId("chat-form"));
  });

  test("submits files when no text exception", async () => {
    const mockCreateObjectURL = jest.fn();
    (global as any).URL.createObjectURL = mockCreateObjectURL;
    mockCreateObjectURL.mockImplementation(
      (file: any) => `mock-url/${file.name}`
    );
    const uploadFileMock = jest
      .fn()
      .mockRejectedValue({ data: { data: "mock-data" } });
    customerService.uploadFile = uploadFileMock;

    const onAddChatData = jest.fn();
    const dispatch = jest.fn();
    const onSocketAddData = jest.fn();
    const file = [
      new File(["hello"], "hello.png", {
        type: "image/png",
      }),
      new File(["hello"], "hello.png", {
        type: "txt/plain",
      }),
    ];
    const monitorStatus = () => false;
    const formData = {
      textValue: null,
      selectedFile: [{ name: "file1.txt", type: "image/png", size: 1024 }],
      imagePreview: "",
      isActive: true,
      fileName: "",
      error: "",
    };

    render(
      <AppTheme>
        <Chat
          onSocketAddData={onSocketAddData}
          onAddChatData={onAddChatData}
          dispatch={dispatch}
          monitorStatus={monitorStatus}
          formData={formData}
        />
      </AppTheme>
    );
    const input = screen.getByTestId("file-input");
    userEvent.upload(input, file);
    fireEvent.click(screen.getByTestId("chat-form"));
  });

  it("uploads files correctly", async () => {
    const mockCreateObjectURL = jest.fn();
    (global as any).URL.createObjectURL = mockCreateObjectURL;
    mockCreateObjectURL.mockImplementation(
      (file: any) => `mock-url/${file.name}`
    );

    const mockedResponse = { data: { data: "mocked file data" } };
    customerService.uploadFile = jest.fn().mockResolvedValue(mockedResponse);

    const { getByTestId } = render(
      <AppTheme>
        <Chat {...mockProps} />
      </AppTheme>
    );

    const fileInput = getByTestId("file-input");
    fireEvent.change(fileInput, {
      target: {
        files: [
          new File(["file contents"], "file1.jpg", { type: "image/jpeg" }),
          new File(["file contents"], "file2.jpg", { type: "image/jpeg" }),
        ],
      },
    });
  });
});
