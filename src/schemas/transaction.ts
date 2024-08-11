import z from "zod";
import { CurrencyEnum } from ".";

export const ChannelEnum = z.enum([
  "card",
  "bank",
  "ussd",
  "qr",
  "mobile_money",
  "bank_transfer",
  "eft",
]);

export const transactionInitializeSchema = z.object({
  email: z
    .string({ required_error: "The email is required" })
    .email({ message: "The transaction email is invalid" }),
  amount: z.union([
    z.number({ required_error: "The amount is required" }),
    z
      .string({ required_error: "The amount is required" })
      .refine((val) => !isNaN(Number(val)), {
        message: "The amount can't be converted to a number",
      }),
  ]),
  currency: CurrencyEnum.optional(),
  reference: z
    .string({ invalid_type_error: "The reference must be a string" })
    .optional(),
  callback_url: z
    .string()
    .url("The callback_url must be a valid url")
    .optional(),
  plan: z
    .string({ invalid_type_error: "The plan must be a string" })
    .optional(),
  invoice_limit: z.number().positive().optional(),
  metadata: z
    .string({ invalid_type_error: "The metadata must be a string" })
    .optional(),
  channels: z.array(ChannelEnum).optional(),
  split_code: z
    .string({ invalid_type_error: "The split_code must be a string" })
    .optional(),
  subaccount: z
    .string({ invalid_type_error: "The subaccount must be a string" })
    .optional(),
  transaction_charge: z.number().positive().optional(),
  bearer: z.enum(["account", "subaccount"]).optional(),
});

export const transactionVerifySchema = z.object({
  reference: z
    .string({ invalid_type_error: "The reference must be a string" })
    .min(3, "The reference must be at least 3 characters"),
});

export const transactionFetchSchema = z.object({
  id: z.number({ invalid_type_error: "The id must be a number" }),
});

export const transactionQuerySchema = z.object({
  perPage: z
    .number({ message: "perPage query must be a number" })
    .min(0, "The min value of perPage is 0")
    .optional(),
  page: z
    .number({ message: "page query must be a number" })
    .min(0, "The min value of page is 1")
    .optional(),
  customer: z
    .number({ message: "customer id query must be a number" })
    .optional(),
  terminalid: z
    .string({ message: "terminalid query must be a string" })
    .optional(),
  status: z
    .enum(["failed", "success", "abandoned"], {
      message:
        "The transaction status query only accepts 'failed', 'success', and 'abandoned'",
    })
    .optional(),
  amount: z
    .number({ message: "amount query query must be a number" })
    .optional(),
  from: z
    .union([
      z.string().datetime({ message: "from query must be a valid date time" }),
      z.string().date("from query must be a valid date"),
    ])
    .optional(),
  to: z
    .union([
      z.string().datetime({ message: "to query must be a valid date time" }),
      z.string().date("to query must be a valid date"),
    ])
    .optional(),
});
