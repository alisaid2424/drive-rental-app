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
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number length")
    .refine((val) => {
      const cleaned = val.replace(/[\s-]/g, "");
      return /^\d{16}$/.test(cleaned);
    }, "Card number must be a valid 16-digit credit card number"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiration date must be in MM/YY format",
    ),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

export type TCheckoutSchema = z.infer<typeof checkoutSchema>;
