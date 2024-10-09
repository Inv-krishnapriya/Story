import { render, fireEvent } from "@testing-library/react";
import SendOffModal from "../details/[id]/SendOffModal";
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

describe("SendOffModal component", () => {
  const onClose = jest.fn();
  const onAgree = jest.fn();
  const onDisagree = jest.fn();
  const applicantList = [
    { name: "Monitor 1" },
    { name: "Monitor 2" },
    { name: "Monitor 3" },
  ];

  it("renders correctly", () => {
    const { getByText, getAllByRole } = render(
      <AppTheme>
        <SendOffModal
          open={true}
          onClose={onClose}
          onAgree={onAgree}
          onDisagree={onDisagree}
          applicantList={applicantList}
        />
      </AppTheme>
    );

    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(applicantList.length);
  });
});
