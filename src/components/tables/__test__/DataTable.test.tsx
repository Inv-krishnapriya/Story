// DataTable.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataTable from "../DataTable";
import AppTheme from "../../../theme";

// Mocking translations
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "action", header: "", Cell: (props: any) => <></> },
  // Add more columns as needed
];

const data = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  // Add more data as needed
];

const mockRowClick = jest.fn();

const defaultProps: any = {
  columns,
  data,
  rowClick: mockRowClick,
  paginationProps: { hasPagination: true, itemsPerPage: 10 },
};

describe("DataTable", () => {
  test("renders DataTable with data and headers", () => {
    render(
      <AppTheme>
        <DataTable {...defaultProps} />
      </AppTheme>
    );

    // Ensure headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();

    // Ensure data is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("calls rowClick when a row is clicked", () => {
    render(
      <AppTheme>
        <DataTable {...defaultProps} />
      </AppTheme>
    );

    userEvent.click(screen.getByText("John Doe"));

    // Ensure rowClick is called with the correct data
    expect(mockRowClick).toHaveBeenCalledWith(data[0]);
  });
  test("calls rowClick when a row is clicked", () => {
    const emptyData = {
      ...defaultProps,
      data: [],
    };
    render(
      <AppTheme>
        <DataTable {...emptyData} noDataMessage="NO DATA" />
      </AppTheme>
    );

    // Ensure rowClick is called with the correct data
    expect(screen.getByText("NO DATA")).toBeInTheDocument();
  });
  test("no data", () => {
    render(
      <AppTheme>
        <DataTable {...defaultProps} isFetching />
      </AppTheme>
    );

    // Ensure rowClick is called with the correct data
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });
  test("no data", () => {
    render(
      <AppTheme>
        <DataTable
          {...defaultProps}
          paginationProps={{
            hasPagination: true,
            count: 3,
            defaultPage: 1,
            boundaryCount: 1,
            siblingCount: 0,
          }}
          fixedSizeTable
          rowClick={() => {}}
        />
      </AppTheme>
    );

    // Ensure rowClick is called with the correct data
    expect(screen.getByTestId("mint-pagination-1")).toBeInTheDocument();
  });
});
// Add more tests based on your component's features and behavior
