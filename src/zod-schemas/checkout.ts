import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  licenseId: z
    .string()
    .min(5, "Driver license ID must be at least 5 characters"),
  cardholderName: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters"),
});

export type TCheckoutSchema = z.infer<typeof checkoutSchema>;
