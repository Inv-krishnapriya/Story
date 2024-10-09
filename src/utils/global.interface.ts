export interface ISuccessResponse {
  errorCode: any;
  message: string;
  data: any;
  serviceHealth: IServiceHealth;
}

interface IServiceHealth {
  [key: string]: any;
}

export interface ISuccessResponseData {
  errorCode: any;
  message: string;
  data: any;
}
