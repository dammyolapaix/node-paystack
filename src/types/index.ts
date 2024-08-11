import { z } from "zod";
import { CurrencyEnum } from "../schemas";

type MakeGetRequest<Query, ReqData> = {
  method: "get";
  url: string;
  query?: Query;
  data?: ReqData;
};

type MakePostRequest<ReqData> = {
  method: "post";
  url: string;
  data: ReqData;
};

export type MakeRequest<Query, ReqData> =
  | MakeGetRequest<Query, ReqData>
  | MakePostRequest<ReqData>;

export type MakeRequestWithSchema<Query, ReqData, QuerySchema, DataSchema> =
  | (MakeGetRequest<Query, ReqData> & {
      querySchema?: QuerySchema;
      dataSchema?: DataSchema;
    })
  | (MakePostRequest<ReqData> & { dataSchema?: DataSchema });

export type ListMetaResponse = {
  meta: {
    total: number;
    skipped: number;
    perPage: 50 | number;
    page: 1 | number;
    pageCount: number;
  };
};

export type SuccessResponse<ResData, ResMsg> = {
  status: true;
  message: ResMsg;
  data: ResData;
};

export type ListSuccessResponse<ResData, ResMsg> = SuccessResponse<
  ResData,
  ResMsg
> &
  ListMetaResponse;

export type ErrorResponse = {
  status: false;
  message: string;
};

export type PaystackApiResponse<ResData, ResMsg> =
  | ListSuccessResponse<ResData, ResMsg>
  | SuccessResponse<ResData, ResMsg>
  | ErrorResponse;

export type Currency = z.infer<typeof CurrencyEnum>;
