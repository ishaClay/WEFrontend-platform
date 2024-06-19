export type ErrorType = {
  code: number;
  data: ErrorData;
};

export type ErrorData = {
  message: string;
  status: boolean;
};


export interface ErrorResponse {
  code: number;
  data: ErrorData;
}