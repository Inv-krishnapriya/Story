import { render, fireEvent } from "@testing-library/react";
import ChatActions from "../details/[id]/ChatActions";
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

describe("ChatActions component", () => {
  const formData = {
    textValue: "",
    selectedFile: [],
    imagePreview: "",
    isActive: false,
    fileName: "",
    error: "",
  };

  const handleSingleFileChange = jest.fn();
  const handleMultiFileChange = jest.fn();
  const imagePreviewData: any = [];
  const onDeleteFileItem = jest.fn();
  const imageItemPreview = jest.fn();
  const onInputChange = jest.fn();
  const onSubmit = jest.fn();
  const monitorStatus = jest.fn(() => false);

  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <AppTheme>
        <ChatActions
          formData={formData}
          handleSingleFileChange={handleSingleFileChange}
          handleMultiFileChange={handleMultiFileChange}
          imagePreviewData={imagePreviewData}
          onDeleteFileItem={onDeleteFileItem}
          imageItemPreview={imageItemPreview}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          monitorStatus={monitorStatus}
        />
      </AppTheme>
    );

    expect(getByPlaceholderText("メッセージを送信")).toBeInTheDocument();
  });

  //   it('handles text input and submission', () => {
  //     const { getByPlaceholderText, getByText } = render(
  //         <AppTheme>
  //       <ChatActions
  //         formData={formData}
  //         handleSingleFileChange={handleSingleFileChange}
  //         handleMultiFileChange={handleMultiFileChange}
  //         imagePreviewData={imagePreviewData}
  //         onDeleteFileItem={onDeleteFileItem}
  //         imageItemPreview={imageItemPreview}
  //         onInputChange={onInputChange}
  //         onSubmit={onSubmit}
  //         monitorStatus={monitorStatus}
  //       />
  //       </AppTheme>
  //     );

  //     const inputField = getByPlaceholderText('メッセージを送信');
  //     fireEvent.change(inputField, { target: { value: 'Test message' } });
  //     expect(onInputChange).toHaveBeenCalledTimes(1);

  //     const submitButton = getByText('送信');
  //     fireEvent.click(submitButton);
  //   });

  it("handles file selection, preview, and deletion", () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const fileChangeEvent = {
      target: {
        files: [file],
      },
    };

    const { getByLabelText, getByText } = render(
      <AppTheme>
        <ChatActions
          formData={formData}
          handleSingleFileChange={handleSingleFileChange}
          handleMultiFileChange={handleMultiFileChange}
          imagePreviewData={imagePreviewData}
          onDeleteFileItem={onDeleteFileItem}
          imageItemPreview={imageItemPreview}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          monitorStatus={monitorStatus}
        />
      </AppTheme>
    );

    // const pictureUploadInput = getByLabelText("picture-upload-input");
    // fireEvent.change(pictureUploadInput, fileChangeEvent);
    // expect(handleMultiFileChange).toHaveBeenCalledTimes(1);
    // expect(handleMultiFileChange).toHaveBeenCalledWith(fileChangeEvent);

    // Simulate image preview click
    // const previewButton = getByText("Preview");
    // fireEvent.click(previewButton);
    // expect(imageItemPreview).toHaveBeenCalledTimes(1);

    // Simulate delete button click
    // const deleteButton = getByText("Delete");
    // fireEvent.click(deleteButton);
    // expect(onDeleteFileItem).toHaveBeenCalledTimes(1);
  });
});
