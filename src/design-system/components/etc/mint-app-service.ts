import { AlertColor } from '@mui/material/Alert';
import { ReactNode } from 'react';

export type ToastType = AlertColor;

export type AppServiceComponentRef = {
  toast: (message: string, type: ToastType) => void;
  confirm: (message: string | ReactNode) => Promise<boolean>;
};

export class MintAppService {
  private appServiceComponentRef: AppServiceComponentRef | null = null;

  setAppServiceComponentRef(appServiceComponentRef: AppServiceComponentRef) {
    this.appServiceComponentRef = appServiceComponentRef;
  }

  getAppServiceComponentRef() {
    return this.appServiceComponentRef;
  }

  toast(message: string, type: ToastType = 'info') {
    this.appServiceComponentRef?.toast(message, type);
  }

  toastInfo(message: string) {
    this.toast(message, 'info');
  }

  toastSuccess(message: string) {
    this.toast(message, 'success');
  }

  toastWarning(message: string) {
    this.toast(message, 'warning');
  }

  toastError(message: string) {
    this.toast(message, 'error');
  }

  confirm(message: string | ReactNode): Promise<boolean> {
    if (this.appServiceComponentRef) {
      return this.appServiceComponentRef.confirm(message);
    }
    return Promise.reject('Component not initiated');
  }
}

export const mintAppService = new MintAppService();
