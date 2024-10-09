import { fireEvent, render, screen } from "@testing-library/react";
import SuccessModal from "../campaign/creation/SuccessModal";
import AppTheme from "../../../theme";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const props = {
  open: true,
  close: jest.fn(),
  data: {},
  handleSubmit: (status: number) => jest.fn(),
  setIsSubmitted: (value: boolean) => jest.fn(),
  isSubmitted: false,
};

describe("Success Modal", () => {
  beforeAll(async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (state: any) => any) =>
        selector({
          global: {
            tickets: {
              unlockedTickets: 10,
            },
            consumed: 10,
          },
        })
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render success modal", () => {
    render(
      <AppTheme>
        <SuccessModal {...props} />
      </AppTheme>
    );
  });

  it("should be able to click submit draft", () => {
    render(
      <AppTheme>
        <SuccessModal {...props} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("submit-draft"));
  });

  it("success modal publish submit", () => {
    render(
      <AppTheme>
        <SuccessModal {...props} />
      </AppTheme>
    );
    fireEvent.click(screen.getByTestId("submit-publish"));
  });

  describe("consumed tickets - 10", () => {
    beforeAll(async () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              tickets: {},
              consumed: 10,
            },
          })
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should render success modal", () => {
      render(
        <AppTheme>
          <SuccessModal {...props} />
        </AppTheme>
      );
    });
  });

  describe("No tickets", () => {
    beforeAll(async () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
      (useSelector as jest.Mock).mockImplementation(
        (selector: (state: any) => any) =>
          selector({
            global: {
              tickets: {},
            },
          })
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should render success modal", () => {
      render(
        <AppTheme>
          <SuccessModal {...props} />
        </AppTheme>
      );
    });
  });
});
