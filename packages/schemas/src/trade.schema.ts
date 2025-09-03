import { z } from "zod";

// Schema for form validation with direct types (no transformation)
export const tradeFormSchema = z.object({
  ticker: z
    .string()
    .min(3, "Ticker must have at least 3 characters")
    .max(10, "Ticker must have at most 10 characters")
    .transform(val => val.toUpperCase()),
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
    .transform((val) => {
      if (val === undefined || val === "") return undefined;
      const num = typeof val === "number" ? val : parseFloat(val);
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
});

export type TTradeFormInput = z.infer<typeof tradeFormSchema>;

export const tradeFormRawSchema = tradeFormSchema.pick({
  ticker: true,
  entryPrice: true,
  exitPrice: true,
  quantity: true,
  date: true,
});

export type TTradeFormRawInput = z.input<typeof tradeFormSchema>;
