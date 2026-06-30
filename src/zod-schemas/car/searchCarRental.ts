import { z } from "zod";

export const searchCarRentalSchema = z.object({
  carQuery: z.string().optional(),

  rentalDate: z.string().min(1, "Rental date is required"),
});

export type TSearchCarRentalSchema = z.infer<typeof searchCarRentalSchema>;
