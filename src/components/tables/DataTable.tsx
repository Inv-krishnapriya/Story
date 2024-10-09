import { MintPagination, MintTableCell, MintTableHead } from "@/design-system";
import {
  Box,
  LinearProgress,
  PaginationProps,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCellProps,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import NoDataFound from "../Common/NoDataFound";
import { useTranslation } from "react-i18next";
import DoubleScrollbar from "../UI/scrollbar/DoubleScrollbar";

export interface IDataTableColumn {
  key: string;
  header: string;
  Cell?: (props: any) => void;
  cellProps?: TableCellProps;
  headerProps?: TableCellProps;
  avoidRowClick?: (item: any) => boolean;
}

interface TableRow {
  [key: string]: any;
}

interface CustomTableProps {
  columns: IDataTableColumn[];
  data: TableRow[];
  isFetching?: boolean;
  rowClick?: (item: any) => void;
  paginationProps?: IDataTablePaginationProps;
  noDataMessage?: string;
  fixedSizeTable?: boolean;
  showDoubleScroll?: boolean;
  tableContainerStyle?: SxProps;
  disableScrollButton?: boolean;
}

interface IDataTablePaginationProps extends PaginationProps {
  hasPagination?: boolean;
  itemsPerPage?: number;
}

const DataTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  isFetching = false,
  paginationProps = {
    hasPagination: false,
    itemsPerPage: 10,
  },
  rowClick,
  noDataMessage = "データがありません。",
  fixedSizeTable = false,
  showDoubleScroll,
  tableContainerStyle,
  disableScrollButton = false,
}) => {
  const { hasPagination, itemsPerPage = 10, ...pageProps } = paginationProps;
  const { t } = useTranslation();
  const theme = useTheme();
  const tableRowClick = (item: any) => {
    if (rowClick) {
      rowClick(item);
    }
  };

  useEffect(() => {
    if (data || columns) {
      console.log("found", columns, data);
    }
  }, [columns, data]);
  return (
    <Box
      borderRadius={"16px"}
      padding={3}
      bgcolor={theme.mint.color.background.containerBg.layer1}
      display={"flex"}
      flexDirection={"column"}
      sx={tableContainerStyle}
    >
      <Box flexGrow={1}>
        <DoubleScrollbar
          tableContainerStyle={{
            overflow: isFetching ? "hidden" : "auto",
            whiteSpace: "nowrap",
            width: 0,
            minWidth: "100%",
          }}
          hideUpperScrollbar={
            isFetching || !showDoubleScroll || data?.length === 0
          }
          enableScrollRight={!disableScrollButton}
          isLoading={isFetching}
        >
          {isFetching && (
            <Table
              sx={{
                ...(fixedSizeTable && { tableLayout: "fixed" }),
              }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <MintTableHead key={column.key} {...column.headerProps}>
                      {t(column.header)}
                    </MintTableHead>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          )}
          {!isFetching && data?.length > 0 && (
            <Table
              sx={{
                ...(fixedSizeTable && { tableLayout: "fixed" }),
                marginBottom: "8px",
                marginRight: !disableScrollButton ? "35px" : "",
              }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <MintTableHead key={column.key} {...column.headerProps}>
                      {t(column.header)}
                    </MintTableHead>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => {
                  return (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            theme.mint.color.surfaceGray.componentBg.hover,
                          cursor: rowClick ? "pointer" : "auto",
                        },
                      }}
                    >
                      {columns.map((column, columIndex) => {
                        const isLast = columIndex == columns?.length - 1;
                        const avoidCick = column?.avoidRowClick
                          ? column.avoidRowClick(row)
                          : false;
                        return (
                          <MintTableCell
                            key={column.key}
                            data-testid={`${column.key}${rowIndex}`}
                            {...column?.cellProps}
                            disabledBorder={isLast}
                            onClick={() => {
                              if (!avoidCick) {
                                tableRowClick(row);
                              }
                            }}
                          >
                            {column.Cell ? column?.Cell(row) : row[column.key]}
                          </MintTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {!isFetching && data?.length === 0 && (
            <Box pt={2}>
              <NoDataFound message={t(noDataMessage)} />
            </Box>
          )}
          {isFetching && (
            <Stack
              justifyContent={"center"}
              height={"100px"}
              data-testid="progress-bar"
            >
              <LinearProgress />
            </Stack>
          )}
        </DoubleScrollbar>
      </Box>

      {hasPagination && data?.length > 0 && (
        <Stack pt={3} justifyContent={"end"} flexDirection={"row"}>
          <MintPagination {...pageProps} />
        </Stack>
      )}
    </Box>
  );
};

export default DataTable;
