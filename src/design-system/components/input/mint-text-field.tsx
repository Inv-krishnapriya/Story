import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Box,
  InputAdornment,
  styled,
  SxProps,
  TextField,
  TextFieldProps,
  useTheme,
} from "@mui/material";
import { MintTypography } from "./mint-typography";
import { MintIconButton } from "./mint-icon-button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { VisibilityIcon } from "../icons/VisibilityIcon";
import { VisibilityOffIcon } from "../icons/VisibilityIOffcon";
import { number } from "yup";

export type MintTextFieldProps = TextFieldProps & {
  hidePasswordShowIcon?: boolean;
  hideLabel?: boolean;
  index?: number;
  size?: 'small' |'medium'| 'large'

};

export function MintTextField(props: MintTextFieldProps) {
  const { required, onChange,index, ...newProps } = props;
  newProps.size = props.size || "small";
  newProps.label = "";
  newProps.variant = "outlined";
  delete newProps.style;
  delete newProps.className;

  const theme = useTheme();
  const errorColor = theme.mint.color.system.error.error;
  const textColor = theme.mint.color.text.high;

  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInput] = useState<string>("");
  const inputType = props.type ?? "text";
  // const index=3;
  useEffect(() => {
    if (!props?.value && inputValue) {
      setInput("");
      // console.log("error on change value",index);
      
    }
  }, [props?.value]);
  const valueLength = useMemo(
    () => `${inputValue?.length}/${newProps?.inputProps?.maxLength ?? 0} `,
    [inputValue]
  );
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setInput(e?.target?.value);
  };
  
  
  return (
    <Box
      style={props.style}
      className={props.className}
      id={props.error ? "form-error" : ""}
    >
      {props.label ? (
        <div style={{ marginBottom: theme.mint.spacing.x3s }}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <MintTypography style={{ color: textColor }}>
              {!props?.hideLabel && (
                <>
                  {props.label}&nbsp;
                  {props.required ? (
                    <span style={{ color: errorColor }}>*</span>
                  ) : (
                    ""
                  )}
                </>
              )}
            </MintTypography>
            <MintTypography
              size="caption"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.medium}
            >
              {newProps?.inputProps?.maxLength > 0 && valueLength}
            </MintTypography>
          </Box>
        </div>
      ) : (
        ""
      )}
      <TextFieldStyled
   
        {...(!props?.hidePasswordShowIcon &&
          inputType === "password" && {
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <MintIconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    disableRipple
                    sx={{ p: 0 }}
                  >
                    {showPassword ? (
                      <VisibilityIcon color={theme.mint.color.object.low} />
                    ) : (
                      <VisibilityOffIcon color={theme.mint.color.object.low} />
                    )}
                  </MintIconButton>
                </InputAdornment>
              ),
            },
          })}
        {...newProps}
        {...(showPassword && { type: showPassword ? "text" : inputType })}
        onChange={handleOnChange}
        inputValue={inputValue}
      />
    </Box>
  );
}

const TextFieldStyled = styled(TextField)<{ inputValue?: string }>(
  ({ theme, type, inputValue, multiline }) => `
  .MuiOutlinedInput-root {
    border-radius: ${theme.mint.cornerRadius.s};
    background-color: ${theme.mint.color.surfaceGray.componentBg.bg};
    letter-spacing:${type === "password" && inputValue ? "10px" : "inherit"}; 
    padding:${multiline ? "12px 16px" : "8px 12px"};
    &.Mui-focused {
      outline: 3px solid ${theme.mint.color.system.focus.bright};
      background-color: ${
        theme.mint.color.surfaceGray.componentBg.bg
      } !important;
    }
    .MuiInputBase-input{
      padding:0;
    }
    &.MuiInput-password {
      letter-spacing: 8px;
    }
    &:hover {
      background-color: ${theme.mint.color.surfaceGray.componentBg.hover};
      .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.mint.color.border.medium};
      }
    }
    &:active {
      background-color: ${theme.mint.color.surfaceGray.componentBg.hover};
      .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.mint.color.border.medium};
      }
    }
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${theme.mint.color.border.medium};
    border-width: 1px;
  }

  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border-color: ${theme.mint.color.system.error.error};
    border-width: 1px;
  }

  .MuiOutlinedInput-root.Mui-error {
    background-color: ${theme.mint.color.system.error.bright};
    border-color: ${theme.mint.color.system.error.error};
    &:focus {
      outline: none;
    }
  }

  .MuiOutlinedInput-root.Mui-disabled {
    background-color: ${theme.mint.color.surfaceGray.disabled.alpha}; 
    border-color: ${theme.mint.color.border.low};
    &:focus {
      outline: none;
    }
  }
  .MuiInputBase-inputSizeSmall {
    padding:8px 12px;
  }
  .MuiFormHelperText-root {
    margin: ${theme.mint.spacing.x3s} 0 0 0;
    font-size: ${theme.mint.typography.fontSize.body}px;
    font-weight: ${theme.mint.typography.fontWeight[400]};
  }
`
);
