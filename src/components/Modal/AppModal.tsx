import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme, styled } from '@mui/material/styles';
import { FC } from 'react';

type ModalProp = {
  handleClose?: () => void;
  open: boolean;
  children?: any;
  title?: string | React.JSX.Element;
  sx?: SxProps<Theme>;
  button?: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AppModal: FC<ModalProp> = ({
  open,
  handleClose,
  children,
  title,
  sx,
  button,
}) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          width: {
            xl: '90%',
            lg: '90%',
            md: '90%',
            sm: '100%',
            xs: '100%',
          },
        },
        ...sx,
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.lighter' }}>
        {title}
        {button && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[900],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </BootstrapDialog>
  );
};

export default AppModal;
