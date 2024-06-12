export type ErrorType = {
  code: number;
  data: ErrorData;
};

export type ErrorData = {
  message: string;
  status: boolean;
};
