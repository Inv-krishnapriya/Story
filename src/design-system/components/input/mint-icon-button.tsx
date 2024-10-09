import React from 'react';
import { IconButton, IconButtonProps, styled } from '@mui/material';

export function MintIconButton(props: IconButtonProps) {
  return <IconButtonStyled {...props}>{props.children}</IconButtonStyled>;
}

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  '&.Mui-disabled .MuiSvgIcon-root': {
    fill: theme.mint.color.object.disabled,
  },
}));
