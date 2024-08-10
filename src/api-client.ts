import axios, { AxiosError } from "axios";
import { ErrorResponse, PaystackApiResponse } from "./types";

type MakeGetRequest = {
  method: "get";
  url: string;
};

type MakePostRequest<T> = {
  method: "post";
  url: string;
  data: T;
};

type MakeRequest<T> = MakeGetRequest | MakePostRequest<T>;

export default class PaystackApi {
  private readonly secretKey: string;
  private readonly baseURL = "https://api.paystack.co";

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async makeRequest<T, U, V>(
    request: MakeRequest<T>
  ): Promise<PaystackApiResponse<U, V>> {
    const { url, method } = request;
    try {
      const { data } = await axios<PaystackApiResponse<U, V>>({
        method,
        baseURL: this.baseURL,
        url,
        data: method === "post" ? request.data : undefined,
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return {
          status: false,
          message: axiosError.response?.data.message || "An error occurred",
        };
      }
      return {
        status: false,
        message: "An unexpected error occurred",
      };
    }
  }
}
