import { z } from "zod";

export const searchCarRentalSchema = z.object({
  carQuery: z
    .string()
    .min(3, "Must be at least 2 characters")
    .max(50, "Must be less than 50 characters"),

  rentalDate: z
    .string()
    .min(1, "Rental date is required")
    .optional()
    .or(z.literal("")),
});

export type TSearchCarRentalSchema = z.infer<typeof searchCarRentalSchema>;
