import { Booking, User, Vehicle } from "@prisma/client";

export type BookingWithUserVehicle = Booking & {
  vehicle: Vehicle;
  user: User;
};
