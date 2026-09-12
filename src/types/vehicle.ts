import { Booking, Vehicle } from "@prisma/client";

export type GetVehiclesFiltersType = {
  types?: string[];
  brands?: string[];
  sort?: string;
  availableNow?: boolean;
  minPrice?: number;
  maxPrice?: number;
  carQuery?: string;
  rentalDate?: string;
};

export type VehicleWithBookings = Vehicle & {
  bookings: Booking[];
};
