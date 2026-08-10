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
