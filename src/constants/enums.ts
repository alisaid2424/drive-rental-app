export enum Routes {
  ROOT = "/",
  ADMIN = "/admin",
  LISTVEHICLES = "/admin/vehicles",
  LISTBOOKINGS = "/admin/bookings",
  ADDVEHICLE = "/admin/vehicles/add-vehicle",
  SETTINGS = "/admin/settings",
  USERS = "/admin/users",
}

export enum Pages {
  LOGIN = "/sign-in",
  Register = "/signup",
  BROWSE = "/browse?pageNumber=1",
  FAVORITE = "/favorites",
  ABOUT = "/about",
  CONTACT = "/contact",
  MYBOOKINGS = "/my-bookings",
  LOCATIONS = "/locations",
  CHECKOUT = "/checkout",
}

export const USERS_PER_PAGE = 6;
export const VEHICLES_PER_PAGE = 6;
export const ORDERS_PER_PAGE = 6;
export const BOOKINGS_PER_PAGE = 6;

const PRODUCTION_DOMAIN = "";

const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;
