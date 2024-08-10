import PaystackApi from "./api-client";

export default class Paystack {
  private paystackApi: PaystackApi;

  constructor(secretKey: string) {
    this.paystackApi = new PaystackApi(secretKey);
  }
}
