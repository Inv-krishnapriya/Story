import { render, fireEvent } from "@testing-library/react";
import DisplaySettingsModal from "../details/[id]/DisplaySettingsModal";
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

describe("DisplaySettingsModal component", () => {
  const toggleCoulmnVisibility = jest.fn();
  const onClose = jest.fn();
  const anchorEl = document.createElement("div");
  const visiblecolumns = [1, 2, 3]; // Sample visible columns
  const campaignDetails = {};

  afterEach(() => {
    toggleCoulmnVisibility.mockClear();
    onClose.mockClear();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <AppTheme>
        <DisplaySettingsModal
          campaignDetails={campaignDetails}
          open={true}
          onClose={onClose}
          anchorEl={anchorEl}
          toggleCoulmnVisibility={toggleCoulmnVisibility}
          visiblecolumns={visiblecolumns}
        />
      </AppTheme>
    );
  });
});
