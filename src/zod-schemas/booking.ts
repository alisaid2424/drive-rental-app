import { z } from "zod";

export const CarBookingSchema = z
  .object({
    pickupLocation: z.string().min(1, "Pickup location is required"),
    pickupDateTime: z.string().min(1, "Pickup date and time are required"),

    returnLocation: z.string().min(1, "Return location is required"),
    returnDateTime: z.string().min(1, "Return date and time are required"),
  })
  .refine(
    (data) => {
      const pickup = new Date(data.pickupDateTime);
      const returnDt = new Date(data.returnDateTime);
      return returnDt > pickup;
    },
    {
      message: "Return date & time must be after pickup date & time",
      path: ["returnDateTime"],
    },
  );

export type CarBookingSchemaType = z.infer<typeof CarBookingSchema>;

/////////////////////////////////////////////////////////////////////////////////////

//modify Booking Schema
export const modifyBookingSchema = CarBookingSchema.refine(
  (data) => {
    const returnDt = new Date(data.returnDateTime);
    const now = new Date();
    return returnDt > now;
  },
  {
    message: "Return date & time cannot be in the past",
    path: ["returnDateTime"],
  },
);

export type TModifyBookingSchema = z.infer<typeof modifyBookingSchema>;
