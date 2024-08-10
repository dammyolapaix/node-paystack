import PaystackApi from "./api-client";
import Transaction from "./resources/transaction";

export default class Paystack {
  private paystackApi: PaystackApi;
  readonly transaction: Transaction;

  constructor(secretKey: string) {
    this.paystackApi = new PaystackApi(secretKey);
    this.transaction = new Transaction(this.paystackApi);
  }
}
