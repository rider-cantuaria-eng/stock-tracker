import { z } from "zod";

// Schema for form validation with string fields (for HTML inputs)
export const tradeFormSchema = z.object({
  ticker: z
    .string()
    .min(3, "Ticker must have at least 3 characters")
    .max(10, "Ticker must have at most 10 characters")
    .toUpperCase(),
  entryPrice: z
    .string()
    .min(1, "Entry price is required")
    .transform((val) => {
      const num = parseFloat(val);
      if (isNaN(num)) {
        throw new Error("Entry price must be a valid number");
      }
      return num;
    })
    .refine((val) => val > 0, "Entry price must be greater than zero"),
  exitPrice: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) {
        throw new Error("Exit price must be a valid number");
      }
      return num;
    })
    .refine((val) => val === undefined || val >= 0, "Exit price must be greater than or equal to zero"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .transform((val) => {
      const num = parseFloat(val);
      if (isNaN(num)) {
        throw new Error("Quantity must be a valid number");
      }
      return num;
    })
    .refine((val) => val > 0, "Quantity must be greater than zero"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => {
      try {
        const date = new Date(val);
        return !isNaN(date.getTime());
      } catch {
        return false;
      }
    }, "Date must be valid"),
  portfolioId: z
    .string()
    .min(1, "Portfolio is required"),
});

export type TradeFormInput = z.infer<typeof tradeFormSchema>;
