import PaystackApiClient from "../api-client";
import {
  InitializeTransactionRequest,
  InitializeTransactionRequestOptions,
  InitializeTransactionResData,
  InitializeTransactionResMessage,
  VerifyTransactionResData,
  VerifyTransactionResMessage,
} from "../types/transaction";

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
      Omit<InitializeTransactionRequest, "amount"> & { amount: string },
      InitializeTransactionResData,
      InitializeTransactionResMessage
    >({
      url: `${this.baseEndPoint}/initialize`,
      method: "post",
      data: {
        ...data,
        amount:
          options && options.subunit === false
            ? (data.amount * 100).toString()
            : data.amount.toString(),
      },
    });

  /**
   * Confirm the status of a transaction
   *
   * @memberOf Transaction
   */
  verify = async ({ reference }: { reference: string }) =>
    await this.paystackApi.makeRequest<
      undefined,
      VerifyTransactionResData,
      VerifyTransactionResMessage
    >({
      url: `${this.baseEndPoint}/verify/${reference}`,
      method: "get",
    });
}
