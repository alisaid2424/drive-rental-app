export enum Routes {
  ROOT = "/",
  ADMIN = "/admin",
  LISTVEHICLES = "/admin/vehicles",
  LISTBOOKINGS = "/admin/bookings",
  ADDVEHICLE = "/admin/vehicles/add-vehicle",
  CUSTOMERS = "/admin/customers",
  SETTINGS = "/admin/settings",
}

export enum Pages {
  LOGIN = "/sign-in",
  Register = "/signup",
  BROWSE = "/browse",
  FAVORITE = "/favorites",
  ABOUT = "/about",
  CONTACT = "/contact",
  MYBOOKINGS = "/my-bookings",
  LOCATIONS = "/locations",
}

export const VEHICLES_PER_PAGE = 5;
export const ORDERS_PER_PAGE = 5;
export const BOOKINGS_PER_PAGE = 5;

const PRODUCTION_DOMAIN = "";

const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
