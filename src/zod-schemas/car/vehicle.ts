import { z } from "zod";

const ImageSchema = z.union([z.instanceof(File), z.string(), z.null()]);

export const VehicleSchema = z.object({
  id: z.string().optional(),
  brand: z.string().min(1, "Vehicle brand is required"),
  name: z.string().min(1, "Full car name is required (e.g., SF90 Stradale)"),
  type: z
    .string()
    .min(1, "Vehicle type is required (e.g., V12 Hybrid Hypercar)"),
  pricePerDay: z.number().min(1, "Rental price per day is required"),
  description: z.string().min(5, "A descriptive summary is required"),
  seats: z.number().int().min(1, "Number of seats is required"),
  transmission: z.string().min(1, "Transmission type is required"),
  fuel: z.string().min(1, "Fuel/Energy type is required"),
  power: z.string().min(1, "Power output is required (e.g., 1015 CV / 584 hp)"),
  topSpeed: z.string().min(1, "Top speed is required (e.g., 340 km/h)"),
  features: z.string().min(1, "Please provide at least one vehicle feature"),
  images: z
    .array(ImageSchema)
    .length(3)
    .refine((imgs) => imgs.some((img) => img !== null), {
      message: "Please upload at least one vehicle image",
    }),
});

export const CreateVehicleSchema = VehicleSchema;

export const UpdateVehicleSchema = VehicleSchema.extend({
  id: z.string().min(1, "Vehicle ID is required for updating"),
});

export type CreateVehicleType = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicleType = z.infer<typeof UpdateVehicleSchema>;
