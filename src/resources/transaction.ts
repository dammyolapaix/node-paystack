import PaystackApiClient from "../api-client";
import {
  transactionFetchSchema,
  transactionInitializeSchema,
  transactionQuerySchema,
  transactionVerifySchema,
} from "../schemas/transaction";
import {
  FetchTransactionReqData,
  FetchTransactionResMessage,
  InitializeTransactionRequest,
  InitializeTransactionRequestOptions,
  InitializeTransactionResData,
  InitializeTransactionResMessage,
  ListTransactionQuery,
  ListTransactionResMessage,
  TransactionResData,
  VerifyTransactionReqData,
  VerifyTransactionResMessage,
} from "../types/transaction";
import z from "zod";

/*
 * The Transactions API allows you create and manage payments on your integration.
 *
 * @export
 * @class Transaction
 * */
export default class Transaction {
  private paystackApi: PaystackApiClient;
  private baseEndPoint: "/transaction";

  constructor(paystackApi: PaystackApiClient) {
    this.baseEndPoint = "/transaction";
    this.paystackApi = paystackApi;
  }

  /**
   * Initialize a transaction from your backend
   *
   * @memberOf Transaction
   */
  initialize = async (
    data: InitializeTransactionRequest,
    options?: InitializeTransactionRequestOptions
  ) =>
    await this.paystackApi.makeRequest<
      never,
      z.infer<typeof transactionInitializeSchema>,
      InitializeTransactionResData,
      InitializeTransactionResMessage,
      never,
      typeof transactionInitializeSchema
    >({
      url: `${this.baseEndPoint}/initialize`,
      method: "post",
      data: {
        ...data,
        amount:
          options && options.subunit === false
            ? (Number(data.amount) * 100).toString()
            : data.amount.toString(),
      },
      dataSchema: transactionInitializeSchema,
    });

  /**
   * Confirm the status of a transaction
   *
   * @memberOf Transaction
   */
  verify = async ({ reference }: VerifyTransactionReqData) =>
    await this.paystackApi.makeRequest<
      never,
      VerifyTransactionReqData,
      TransactionResData,
      VerifyTransactionResMessage,
      never,
      typeof transactionVerifySchema
    >({
      url: `${this.baseEndPoint}/verify/${reference}`,
      method: "get",
      data: { reference },
      dataSchema: transactionVerifySchema,
    });

  list = async (query?: ListTransactionQuery) =>
    await this.paystackApi.makeRequest<
      ListTransactionQuery,
      never,
      TransactionResData[],
      ListTransactionResMessage,
      typeof transactionQuerySchema,
      never
    >({
      method: "get",
      url: this.baseEndPoint,
      query,
      querySchema: transactionQuerySchema,
    });

  fetch = async ({ id }: FetchTransactionReqData) =>
    await this.paystackApi.makeRequest<
      never,
      FetchTransactionReqData,
      TransactionResData,
      FetchTransactionResMessage,
      never,
      typeof transactionFetchSchema
    >({
      method: "get",
      url: `${this.baseEndPoint}/${id}`,
      dataSchema: transactionFetchSchema,
    });
}
