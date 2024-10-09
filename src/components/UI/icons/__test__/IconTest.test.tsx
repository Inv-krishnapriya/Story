import { render } from "@testing-library/react";
import {
  CalendarSvgIcon,
  ChatSvgIcon,
  CheckBoxIcon,
  CheckboxCheckedIcon,
  ClockSvgIcon,
  DeleteSvgIcon,
  DownArrowIcon,
  DrawerCloseIcon,
  FilterSvgIcon,
  NoDataSvgIcon,
  PencilSvgIcon,
  PersonSvgIcon,
  PlusSvgIcon,
  PriceSvgIcon,
  UpArrowSvgIcon,
  UserSvgIcon,
  VectorSvgIcon,
} from "../Icon";

describe("TonalButton component", () => {
  test("renders with default blue tonal variant", () => {
    render(<UserSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<ChatSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<VectorSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<FilterSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<PlusSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<CalendarSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<PersonSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<ClockSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<PriceSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<UpArrowSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<DownArrowIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<CheckBoxIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<CheckboxCheckedIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<PencilSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<DeleteSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<NoDataSvgIcon />);
  });
  test("renders with default blue tonal variant", () => {
    render(<DrawerCloseIcon />);
  });

  // Add more tests for other variants and customizations
});
