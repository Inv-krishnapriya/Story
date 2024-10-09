import React from "react";
import { Button, ButtonProps, CircularProgress, styled } from "@mui/material";

interface MintButtonProps extends ButtonProps {
  loading?: boolean;
  color?: 'primary' | 'secondary' | 'error',
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'contained'|'text' 
  
}

export function MintButton(props: MintButtonProps) {
  const newProps = { ...props };
  if (!newProps.variant) {
    newProps.variant = "contained";
  }
  return (
    <ButtonStyled {...newProps} disableTouchRipple>
      {props.loading && <CircularProgress size={20} />}
      {props.children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled(Button)(
  (props) => `
  &.MuiButton-root {
    box-shadow: none;
    border-radius: 8px;
    gap: 8px;
  }
  .MuiButton-startIcon{
    margin:0px;
  }
  &.MuiButton-sizeSmall {
    height: 32px;
    padding: ${props.theme.mint.spacing.xxs};
  }

  &.MuiButton-sizeMedium {
    height: 40px;
    padding: ${props.theme.mint.spacing.xs};
  }

  &.MuiButton-sizeLarge {
    height: 48px;
    padding: ${props.theme.mint.spacing.s};
  }

  &.MuiButton-contained {
    min-width: 64px;
    font-size: 14px;
    font-weight: 500;
    
    &:focus {
      outline: 2px solid ${props.theme.mint.color.extendedColors.teal.ex2};
    }
  }
  &.MuiButton-textPrimary {
    color:${props.theme.mint.color.text.accent};
    &:hover {
      background-color: #0071E31A;
    }

    &:active {
      background-color: #0071E330;
    }
  }
  &.MuiButton-containedPrimary {
    background-color: ${props.theme.mint.color.surfaceAccent.primary.primary};
    &:hover {
      background-color: ${props.theme.mint.color.surfaceAccent.primary.hover};
    }

    &:active {
      background-color: ${props.theme.mint.color.surfaceAccent.primary.pressed};
    }
  }


  &.MuiButton-containedSecondary {
    &:hover {
      background-color: ${props.theme.mint.color.surfaceAccent.secondary.hover};
    }

    &:active {
      background-color: ${props.theme.mint.color.surfaceAccent.secondary.pressed};
    }
  }
  
  &.MuiButton-containedTonal {
    background-color: ${props.theme.mint.color.surfaceAccent.primary.bright};
    color: ${props.theme.mint.color.text.accent};
    &:hover {
      background-color: ${props.theme.mint.color.surfaceAccent.primary.brightHover};
    }

    &:active {
      background-color: ${props.theme.mint.color.surfaceAccent.primary.pressed};
    }
  }

  &.MuiButton-containedError {
    &:hover {
      background-color: ${props.theme.mint.color.system.error.hover};
    }

    &:active {
      background-color: ${props.theme.mint.color.system.error.pressed};
    }
  }

  &.MuiButton-outlined {
    min-width: 64px;
    font-size: 14px;
    font-weight: 500;

    &:focus {
      outline: 2px solid ${props.theme.mint.color.extendedColors.teal.ex2};
    }
  }

  &.MuiButton-outlinedPrimary {
    border: 1px solid ${props.theme.mint.color.border.accent};
    color: ${props.theme.mint.color.text.accent};
    background-color: ${props.theme.mint.color.surfaceGray.componentBg.bg};
    &:hover {
      background-color: #0071E31A;
    }

    &:active {
      background-color: #0071E330;
    }
    &.Mui-disabled {
      background-color: ${props.theme.mint.color.surfaceGray.componentBg.bg};
      color:${props.theme.mint.color.text.disabled};
      border: 1px solid ${props.theme.mint.color.border.disabled};
      &:hover {
        background-color: ${props.theme.mint.color.system.error.brightHover};
      }
  
      &:active {
        background-color: ${props.theme.mint.color.system.error.brightPressed};
      }
      }
  }

  &.MuiButton-outlinedInherit {
    border: 1px solid ${props.theme.mint.color.border.high};
    &:hover {
      background-color: ${props.theme.mint.color.surfaceGray.high.hover};
    }

    &:active {
      background-color: ${props.theme.mint.color.surfaceGray.high.pressed};
    }
  }

  &.MuiButton-outlinedError {
    border: 1px solid ${props.theme.mint.color.system.error.error};
    &:hover {
      background-color: ${props.theme.mint.color.system.error.brightHover};
    }

    &:active {
      background-color: ${props.theme.mint.color.system.error.brightPressed};
    }
  }

  &.MuiButton-text {
    min-width: 64px;
    font-size: 14px;
    font-weight: 500;
  
    &:focus {
      outline: 2px solid ${props.theme.mint.color.extendedColors.teal.ex2};

    }
  } 

  & .MuiButton-textInherit {
    &:hover {
      background-color: #0A18260A;
    }

    &:active {
      background-color: ${props.theme.palette.action.disabledBackground};
    }
  }

  &.MuiButton-textError {
    &:hover {
      background-color: ${props.theme.mint.color.system.error.brightHover};
    }

    &:active {
      background-color: ${props.theme.mint.color.system.error.brightPressed};
    }
  }
  &.Mui-disabled {
    background-color:${props.theme.mint.color.surfaceGray.disabled.disabled};
    color:${props.theme.mint.color.text.disabled};
    }
  
`
);
