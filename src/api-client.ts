import axios, { AxiosError } from "axios";
import {
  ErrorResponse,
  MakeRequestWithSchema,
  PaystackApiResponse,
} from "./types";
import { z } from "zod";

export default class PaystackApi {
  private readonly secretKey: string;
  private readonly baseURL = "https://api.paystack.co";

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async makeRequest<
    Query,
    ReqData,
    ResData,
    ResMsg,
    QuerySchema extends z.ZodType<Query>,
    DataSchema extends z.ZodType<ReqData>
  >(
    request: MakeRequestWithSchema<Query, ReqData, QuerySchema, DataSchema>
  ): Promise<PaystackApiResponse<ResData, ResMsg>> {
    const { url, method } = request;
    try {
      // Validate secret key and request
      z.string({ message: "The secretKey is required" })
        .min(10, "Invalid secret key")
        .parse(this.secretKey);

      if (method === "get" && request.query) {
        if (request.querySchema) {
          request.query = request.querySchema.parse(request.query);
        }
      } else if (method === "post" && request.data) {
        if ("dataSchema" in request && request.dataSchema) {
          request.data = request.dataSchema.parse(request.data);
        }
      }

      // Make request to Paystack after validating the request
      const { data } = await axios<PaystackApiResponse<ResData, ResMsg>>({
        method,
        baseURL: this.baseURL,
        url,
        params: method === "get" ? request.query : undefined,
        data: method === "post" ? request.data : undefined,
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          status: false,
          message: `Node-Paystack validation error: ${error.errors
            .map((e) => e.message)
            .join(", ")}`,
        };
      }

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
