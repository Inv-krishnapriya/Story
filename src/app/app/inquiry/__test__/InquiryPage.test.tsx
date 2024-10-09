import AppTheme from "../../../../theme";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import InquiryPage from "../page";
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => ["1"]),
}));
const renderWithTheme = (Component: React.ReactNode) =>
  render(<AppTheme>{Component}</AppTheme>);

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});

describe("Inquiry Page", () => {
  it("renders without error", () => {
    renderWithTheme(<InquiryPage />);

    expect(screen.getByText("inquiry.heading")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "inquiry.send" })).toBeDisabled();
  });

  it("should be able to update form", async () => {
    await act(async () => {
      renderWithTheme(<InquiryPage />);
    });

    const radios = screen.getAllByRole("radio");
    // radios.forEach((radio) => {
    //   expect(radio).not.toBeChecked();
    // });

    const textBoxes = screen.getAllByRole("textbox");
    const titleInput = textBoxes[0];
    const inquiryInput = textBoxes[1];

    await waitFor(() => {
      fireEvent.click(radios[0]);
      expect(radios[0]).toBeChecked();

      fireEvent.change(titleInput, { target: { value: "example@gmail.com" } });
      fireEvent.change(inquiryInput, { target: { value: "Some inquiry" } });
    });
  });
});
