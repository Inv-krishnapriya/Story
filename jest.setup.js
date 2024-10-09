import "@testing-library/jest-dom";

jest.mock("@mui/x-date-pickers/internals/demo", () => {
  return {
    DemoContainer: jest.fn(() => <></>),
  };
});
