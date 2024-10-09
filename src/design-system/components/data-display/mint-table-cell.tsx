import { TableCell, TableCellProps, styled } from "@mui/material";
import React from "react";
interface IMintTableCellProps extends TableCellProps {
  disabledBorder?: boolean;
}
export function MintTableCell(props: IMintTableCellProps) {
  const { disabledBorder = false, ...others } = props;
  return (
    <StyledTableCell disabledBorder={disabledBorder} {...others}>
      {props.children}
    </StyledTableCell>
  );
}
const StyledTableCell = styled(TableCell)<{ disabledBorder?: boolean }>(
  ({ theme, disabledBorder }) => ({
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "150%",
    borderRight: disabledBorder ? "none" : "1px solid var(--mm-border-low)",
    borderBottom: "1px solid var(--mm-border-low)",
  })
);
