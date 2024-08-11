import PaystackApiClient from "../api-client";
import {
  transactionFetchSchema,
  InitializeTransactionSchema,
  ListQueryTransactionSchema,
  VerifyTransactionSchema,
  ChargeAuthorizationTransactionSchema,
} from "../schemas/transaction";
import {
  ChargeAuthorizationTransactionReqData,
  ChargeAuthorizationTransactionResMessage,
  FetchTransactionReqData,
  FetchTransactionResMessage,
  InitializeTransactionReqData,
  InitializeTransactionRequestOptions,
  InitializeTransactionResData,
  InitializeTransactionResMessage,
  ListTransactionQuery,
  ListTransactionResMessage,
  TransactionResData,
  VerifyTransactionReqData,
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
   * Initialize Transaction
   *
   * Initialize a transaction from your backend
   *
   * @memberOf Transaction
   */
  initialize = async (
    data: InitializeTransactionReqData,
    options?: InitializeTransactionRequestOptions
  ) =>
    await this.paystackApi.makeRequest<
      never,
      InitializeTransactionReqData,
      InitializeTransactionResData,
      InitializeTransactionResMessage,
      never,
      typeof InitializeTransactionSchema
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
      dataSchema: InitializeTransactionSchema,
    });

  /**
   * Verify Transaction
   *
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
      typeof VerifyTransactionSchema
    >({
      url: `${this.baseEndPoint}/verify/${reference}`,
      method: "get",
      data: { reference },
      dataSchema: VerifyTransactionSchema,
    });

  /**
   * List Transaction
   *
   * List transactions carried out on your integration
   *
   * Transaction ID data type
   *
   * If you plan to store or make use of the the transaction ID, you should represent it as a unsigned 64-bit integer. To learn more, [check out our changelog]{@link https://paystack.com/docs/changelog/api/#june-2022}
   * @memberOf Transaction
   */
  list = async (query?: ListTransactionQuery) =>
    await this.paystackApi.makeRequest<
      ListTransactionQuery,
      never,
      TransactionResData[],
      ListTransactionResMessage,
      typeof ListQueryTransactionSchema,
      never
    >({
      method: "get",
      url: this.baseEndPoint,
      query,
      querySchema: ListQueryTransactionSchema,
    });

  /**
   * Fetch Transaction
   *
   * Get details of a transaction carried out on your integration
   *
   * Transaction ID data type
   *
   * If you plan to store or make use of the the transaction ID, you should represent it as a unsigned 64-bit integer. To learn more, [check out our changelog]{@link https://paystack.com/docs/changelog/api/#june-2022}
   * @memberOf Transaction
   */
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

  /**
   * Charge Authorization
   *
   * All authorizations marked as reusable can be charged with this endpoint whenever you need to receive payments
   *
   * @param data
   * @param options
   * @returns
   */
  chargeAuthorization = async (
    data: ChargeAuthorizationTransactionReqData,
    options?: InitializeTransactionRequestOptions
  ) =>
    await this.paystackApi.makeRequest<
      never,
      ChargeAuthorizationTransactionReqData,
      TransactionResData,
      ChargeAuthorizationTransactionResMessage,
      never,
      typeof ChargeAuthorizationTransactionSchema
    >({
      url: `${this.baseEndPoint}/charge_authorization`,
      method: "post",
      data: {
        ...data,
        amount:
          options && options.subunit === false
            ? (Number(data.amount) * 100).toString()
            : data.amount.toString(),
      },
      dataSchema: ChargeAuthorizationTransactionSchema,
    });
}
