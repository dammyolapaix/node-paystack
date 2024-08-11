import { z } from "zod";
import { Currency } from ".";
import {
  ChannelEnum,
  transactionFetchSchema,
  InitializeTransactionSchema,
  ListQueryTransactionSchema,
  VerifyTransactionSchema,
  ChargeAuthorizationTransactionSchema,
} from "../schemas/transaction";

type Channel = z.infer<typeof ChannelEnum>;

export type InitializeTransactionRequestOptions = {
  subunit: false;
};

export type InitializeTransactionResData = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

type LogHistoryItem = {
  type: "action" | "success" | "error";
  message: string;
  time: number;
};

type TransactionLog = {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: unknown[];
  history: LogHistoryItem[];
};

type TransactionAuthorization = {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: Channel;
  card_type: "visa" | "mastercard DEBIT";
  bank: string;
  country_code: "NG" | "GH";
  brand: "visa";
  reusable: boolean;
  signature: string;
  account_name: string | null;
};

type Customer = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: unknown | null;
  risk_action: "default" | string;
  international_format_phone: string | null;
};

export type TransactionResData = {
  id: number;
  domain: "test" | "live";
  status: "success" | "abandoned" | "failed";
  reference: string;
  amount: number;
  message: unknown | null;
  gateway_response:
    | "Successful"
    | "The transaction was not completed"
    | "Declined";
  paid_at: string | null; // ISO 8601 format date
  created_at: string; // ISO 8601 format date
  channel: Channel;
  currency: Currency;
  ip_address: string;
  metadata: unknown | null;
  log: TransactionLog | null;
  fees: number | null;
  fees_split: null;
  authorization: Record<string, unknown> | TransactionAuthorization;
  customer: Customer;
  plan: unknown | null;
  split: Record<string, unknown>;
  order_id: string | null;
  paidAt: string | null; // ISO 8601 format date
  createdAt: string; // ISO 8601 format date
  requested_amount: number;
  pos_transaction_data: unknown | null;
  source: unknown | null;
  fees_breakdown: unknown | null;
  transaction_date: string; // ISO 8601 format date
  plan_object: Record<string, unknown>;
  subaccount: Record<string, unknown>;
};

export type InitializeTransactionReqData = z.infer<
  typeof InitializeTransactionSchema
>;
export type VerifyTransactionReqData = z.infer<typeof VerifyTransactionSchema>;
export type ListTransactionQuery = z.infer<typeof ListQueryTransactionSchema>;
export type FetchTransactionReqData = z.infer<typeof transactionFetchSchema>;
export type ChargeAuthorizationTransactionReqData = z.infer<
  typeof ChargeAuthorizationTransactionSchema
>;

export type InitializeTransactionResMessage = "Authorization URL created";
export type VerifyTransactionResMessage = "Verification successful";
export type ListTransactionResMessage = "Transactions retrieved";
export type FetchTransactionResMessage = "Transaction retrieved";
export type ChargeAuthorizationTransactionResMessage = "Charge attempted";
