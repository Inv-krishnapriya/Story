import { TableCell, TableCellProps, styled } from "@mui/material";
import React from "react";

export function MintTableHead(props: TableCellProps) {
  return <StyledTableHead {...props}>{props.children}</StyledTableHead>;
}

const StyledTableHead = styled(TableCell)(({ theme }) => ({
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: "700",
  fontStyle: "normal",
  lineHeight: "150%",
}));
