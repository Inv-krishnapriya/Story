import React, { CSSProperties, ReactNode } from "react";
import { Box, TypographyProps, useTheme } from "@mui/material";


interface MintTypographyProps extends TypographyProps {
  size?:
    | "head-xxl"
    | "head-xl"
    | "head-l"
    | "head-m"
    | "head-s"
    | "head-xs"
    | "body"
    | "button"
    | "caption";
  weight?: "400" | "500" | "700" | "800";
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'; 
 fontWeight?: '400'| '500'|'700'| '800';
 fontSize?:'12'|'14'| '16'| '18'| '20';
  
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function MintTypography({
  size,
  weight,
  className,
  align,
  style,
  children,
  ...others
}: Readonly<MintTypographyProps>) {
  const theme = useTheme();
  let fontSize = theme.mint.typography.fontSize.body;
  if (size) {
    switch (size) {
      case "head-xxl":
        fontSize = theme.mint.typography.fontSize.headXXL;
        break;
      case "head-xl":
        fontSize = theme.mint.typography.fontSize.headXL;
        break;
      case "head-l":
        fontSize = theme.mint.typography.fontSize.headL;
        break;
      case "head-m":
        fontSize = theme.mint.typography.fontSize.headM;
        break;
      case "head-s":
        fontSize = theme.mint.typography.fontSize.headS;
        break;
      case "head-xs":
        fontSize = theme.mint.typography.fontSize.headXS;
        break;
      case "body":
        fontSize = theme.mint.typography.fontSize.body;
        break;
      case "button":
        fontSize = theme.mint.typography.fontSize.button;
        break;
      case "caption":
        fontSize = theme.mint.typography.fontSize.caption;
        break;
    }
  }



  let fontWeight = theme.mint.typography.fontWeight[400];
  if (weight) {
    switch (weight) {
      case "400":
        fontWeight = theme.mint.typography.fontWeight[400];
        break;
      case "500":
        fontWeight = theme.mint.typography.fontWeight[500];
        break;
      case "700":
        fontWeight = theme.mint.typography.fontWeight[700];
        break;
      case "800":
        fontWeight = theme.mint.typography.fontWeight[800];
        break;
    }
  }

  const newStyle: CSSProperties = {
    fontSize,
    fontWeight,
    textAlign: align, 
    ...style,
  };



  return (
    <Box style={newStyle} className={className} {...others}>
      {children}
    </Box>
  );
}
