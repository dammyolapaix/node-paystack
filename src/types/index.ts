export type SuccessResponse<T, U> = {
  status: true;
  message: U;
  data: T;
};

export type ErrorResponse = {
  status: false;
  message: string;
};

export type PaystackApiResponse<T, U> = SuccessResponse<T, U> | ErrorResponse;

export type Currency = "NGN" | "USD" | "GHS" | "ZAR" | "KES";
