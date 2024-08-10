import { z } from "zod";

export const CurrencyEnum = z.enum(["NGN", "USD", "GHS", "ZAR", "KES"]);
