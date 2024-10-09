import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  cleanup,
} from "@testing-library/react";
import FilterModal from "../details/[id]/FilterModal";
import AppTheme from "../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => ["1"]),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));

describe("FilterModal", () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  (useSelector as jest.Mock).mockReturnValueOnce([]);

  beforeAll(() => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          campaign: {
            filterData:
              '{"memo":{"yes":false},"gender":{"male":false,"female":false},"isMarried":{"yes":true,"no":false},"hasChildren":{"yes":false,"no":true},"occupation":null,"prefecture":null,"personalIncome":{"start":"","end":""},"householdIncome":{"start":"","end":""},"date":"2024-04-24T05:58:59.026Z"}',
          },
        })
    );
  });

  beforeEach(() => {
    cleanup();
  });

  it("renders properly with initial values", () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      onDisagree: jest.fn(),
      profession: [],
      prefectures: [],
      campaignId: "123",
      handleFilterData: jest.fn(),
    };

    render(
      <AppTheme>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ja"
          dateFormats={{ monthAndYear: "YYYY年MM月" }}
        >
          <FilterModal {...props} />
        </LocalizationProvider>
      </AppTheme>
    );
  });

  it("should be able to check all checkboxes", async () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      onDisagree: jest.fn(),
      profession: [],
      prefectures: [],
      campaignId: "123",
      handleFilterData: jest.fn(),
    };

    render(
      <AppTheme>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ja"
          dateFormats={{ monthAndYear: "YYYY年MM月" }}
        >
          <FilterModal {...props} />
        </LocalizationProvider>
      </AppTheme>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await waitFor(() => {
      checkboxes.forEach((checkbox) => {
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      });
    });
  }, 10000);

  it("should list proffession and prefectures", async () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      onDisagree: jest.fn(),
      profession: [
        {
          id: 1,
          name: "profession 1",
        },
      ],
      prefectures: [
        {
          name: "prefecture 1",
          prefectures: [],
        },
      ],
      campaignId: "123",
      handleFilterData: jest.fn(),
    };

    render(
      <AppTheme>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ja"
          dateFormats={{ monthAndYear: "YYYY年MM月" }}
        >
          <FilterModal {...props} />
        </LocalizationProvider>
      </AppTheme>
    );

    expect(screen.getByText("profession 1")).toBeInTheDocument();
    expect(screen.getByText("prefecture 1")).toBeInTheDocument();
  });

  it("should list all area and prefectures", async () => {
    const props = {
      open: true,
      onClose: jest.fn(),
      onDisagree: jest.fn(),
      profession: [],
      prefectures: [
        {
          name: "Area 1",
          prefectures: [{ id: 1, name: "Prefecture 1" }],
        },
      ],
      campaignId: "123",
      handleFilterData: jest.fn(),
    };

    render(
      <AppTheme>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ja"
          dateFormats={{ monthAndYear: "YYYY年MM月" }}
        >
          <FilterModal {...props} />
        </LocalizationProvider>
      </AppTheme>
    );

    expect(screen.getByText("Area 1")).toBeInTheDocument();
    expect(screen.getByText("Prefecture 1")).toBeInTheDocument();
  });
});
