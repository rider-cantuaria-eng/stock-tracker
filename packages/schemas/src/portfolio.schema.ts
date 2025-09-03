import { z } from "zod";

// Schema for form validation with string fields (for HTML inputs)
export const portfolioFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(50, "Name must have at most 50 characters")
    .transform((val) => val.toUpperCase()),
  initialValue: z
    .string()
    .min(1, "Initial value is required")
    .transform((val) => {
      const num = parseFloat(val);
      if (isNaN(num)) {
        throw new Error("Initial value must be a valid number");
      }
      return num;
    })
    .refine((val) => val >= 0, "Initial value must be greater than or equal to zero")    
});

export type PortfolioFormInput = z.infer<typeof portfolioFormSchema>;
