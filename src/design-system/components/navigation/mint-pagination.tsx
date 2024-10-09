import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationProps,
  styled,
} from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

export function MintPagination(props: PaginationProps) {
  const newProps = { ...props };
  newProps.variant = props.variant || "outlined";
  newProps.shape = props.shape || "rounded";
  return (
    <PaginationStyled
      {...newProps}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: ArrowLeftIcon,
            next: ArrowRightIcon,
          }}
          data-testid={`mint-pagination-${item.page}`}
          {...item}
        />
      )}
    />
  );
}

const PaginationStyled = styled(Pagination)(
  ({ theme }) => ` 
  &.MuiPagination-root  {
    .MuiPaginationItem-page {
      border: 1px solid ${theme.mint.color.border.medium};
      padding: 3px 9px;
      gap: 8px;
      &: hover {
        background-color: ${theme.mint.color.surfaceAccent.primary.areaHover};
      }
      &: active {
        background-color:${theme.mint.color.surfaceAccent.primary.areaPressed};
      }
      &: focus {
        outline: 2px solid${theme.mint.color.system.focus.focus};
      }
  }
  
  .Mui-selected {
      background-color:${theme.mint.color.surfaceAccent.primary.primary};
      color: #FFFFFF;
      &: hover {
        background-color: ${theme.mint.color.surfaceAccent.primary.primary};
      }
    }
  }
  
  .MuiPaginationItem-previousNext{
    color:${theme.mint.color.object.medium};
  }
  .Mui-disabled {
    background-color:${theme.mint.color.surfaceGray.disabled.disabled};
    border: 1px solid ${theme.mint.color.border.disabled};
    color:${theme.mint.color.object.low};
    opacity:1 !important;
    path{
      fill:${theme.mint.color.object.low};
    }
  }
    `
);
