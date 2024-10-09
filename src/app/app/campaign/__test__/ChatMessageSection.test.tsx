import { render } from "@testing-library/react";
import AppTheme from "../../../../theme";
import ChatMessageSection from "../details/[id]/ChatMessageSection";
import { useSelector } from "react-redux";

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

jest.mock("moment", () => () => ({
  local: () => ({
    format: () => "12:00",
  }),
  format: () => "2022-03-07T12:00:00",
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("ChatMessageSection component", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            clientData: { userId: "user123" },
          },
          chat: {
            pendingImageMessages: [
              {
                messageId: "1",
                files: [{ fileId: "1", fileUrl: "image1.jpg" }],
              },
              {
                messageId: "2",
                files: [{ fileId: "2", fileUrl: "image2.jpg" }],
              },
            ],
            pendingFileMessages: [
              {
                messageId: "3",
                files: [{ fileId: "3", fileUrl: "file1.pdf" }],
              },
              {
                messageId: "4",
                files: [{ fileId: "4", fileUrl: "file2.docx" }],
              },
            ],
          },
        })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const mockProps = {
      bottomBarHeight: 50,
      onImageClick: jest.fn(),
      chatImageItemPreview: jest.fn(),
      data: [],
      handleDownloadFile: jest.fn(),
      monitorName: "TestMonitor",
    };
    render(
      <AppTheme>
        <ChatMessageSection {...mockProps} />
      </AppTheme>
    );
  });

  it(" messages 1", () => {
    const userID = "user123";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 1,
          datetime: "2022-03-07T12:00:00",
          senderId: "user123",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it("messages 2", () => {
    const userID = "user3";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 2,
          status: 2,
          datetime: "2022-03-07T12:00:00",
          senderId: "user123",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it(" messages 3", () => {
    const userID = 3;
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 3,
          status: 2,
          messageId: ["1"],
          datetime: "2022-03-07T12:00:00",
          senderId: "user123",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it(" messages 4", () => {
    // (useSelector as jest.Mock).mockReturnValue('user123')

    const userID = "user123";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 4,
          status: 2,
          datetime: "2022-03-07T12:00:00",
          senderId: "user123",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it("messages image", () => {
    const userID = "user3";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 3,
          status: 2,
          datetime: "2022-03-07T12:00:00",
          senderId: "user3",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it("messages file and not sender id", () => {
    const userID = "user3";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 4,
          status: 2,
          datetime: "2022-03-07T12:00:00",
          senderId: "user3",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it("messages message type and not sender id", () => {
    const userID = "user3";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 2,
          status: 2,
          datetime: "2022-03-07T12:00:00",
          senderId: "user3",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it("messages image type and not sender id", () => {
    const userID = "user3";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 3,
          status: 2,
          messageId: ["1"],
          datetime: "2022-03-07T12:00:00",
          senderId: "use",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });

  it("ng messages and sender id", () => {
    const userID = "user3";
    const monitorName = "Monitor Name";
    const chatItem = {
      chat: [
        {
          messageType: 3,
          status: 3,
          messageId: ["1"],
          datetime: "2022-03-07T12:00:00",
          senderId: "user123",
          files: [{ fileUrl: "http://example.com/image.jpg" }],
        },
      ],
    };

    render(
      <AppTheme>
        <ChatMessageSection
          data={chatItem.chat}
          userID={userID}
          monitorName={monitorName}
          bottomBarHeight={0}
          onImageClick={() => {}}
          chatImageItemPreview={() => {}}
          handleDownloadFile={() => {}}
        />
      </AppTheme>
    );
  });
});
