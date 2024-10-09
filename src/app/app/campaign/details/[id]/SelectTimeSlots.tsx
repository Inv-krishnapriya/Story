import React from "react";
import { SelectChangeEvent } from "@mui/material";
import { MintSelectField, MintSelectFieldOptionProps } from "@/design-system";

interface SelectTimeSlotsProp {
  limitReached: boolean;
  value: string;
  options: MintSelectFieldOptionProps[];
  onChange?: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => void;
}

export const SelectTimeSlots: React.FC<SelectTimeSlotsProp> = (props) => {
  const { limitReached, options, value, onChange } = props;
  return (
    <MintSelectField
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
          },
        },
      }}
      sx={{
        width: "144px",
        display: limitReached ? "none" : "flex",
      }}
      options={options}
      value={value}
      onChange={onChange}
      disabled={!options?.length}
    />
  );
};
