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
