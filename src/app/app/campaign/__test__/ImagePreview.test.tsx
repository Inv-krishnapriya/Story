import { render, fireEvent } from "@testing-library/react";
import ImagePreviewModal from "../details/[id]/ImagePreviewModal";
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

describe("ImagePreviewModal component", () => {
  const imageData = [
    { fileUrl: "https://example.com/image1.jpg", fileName: "image1.jpg" },
    { fileUrl: "https://example.com/image2.jpg", fileName: "image2.jpg" },
  ];

  it("renders correctly", () => {
    const onClose = jest.fn();
    const handleDownloadFile = jest.fn();
    const activeCarousalIndex = 0;

    const { getByText, getByTestId } = render(
      <AppTheme>
        <ImagePreviewModal
          open={true}
          onClose={onClose}
          data={imageData}
          handleDownloadFile={handleDownloadFile}
          activeCarousalIndex={activeCarousalIndex}
        />
      </AppTheme>
    );
  });
});
