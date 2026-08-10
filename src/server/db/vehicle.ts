"use cache";

import { VEHICLES_PER_PAGE } from "@/constants/enums";
import prisma from "@/lib/db";
import { GetVehiclesFiltersType } from "@/types/vehicle";
import { Prisma, VehicleStatus } from "@prisma/client";
import { cacheLife, cacheTag } from "next/cache";

export async function getTopRentedVehicles(limit?: number) {
  cacheTag("get_top_rented_vehicles");
  cacheLife({ revalidate: 3600 });

  return prisma.vehicle.findMany({
    where: {
      bookings: {
        some: {},
      },
    },
    orderBy: {
      bookings: {
        _count: "desc",
      },
    },
    take: limit,
  });
}

export async function getVehicles() {
  cacheTag("get_All_vehicles");
  cacheLife({ revalidate: 3600 });

  return prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getVehicle(id: string) {
  cacheTag("get_vehicle");
  cacheLife({ revalidate: 3600 });

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      bookings: true,
    },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const bookingsCount = vehicle.bookings.length;

  const revenue = vehicle.bookings.reduce((acc, booking) => {
    return acc + booking.totalAmount;
  }, 0);

  return {
    ...vehicle,
    bookingsCount,
    revenue,
  };
}

export async function getVehiclesFilters(
  filters?: GetVehiclesFiltersType,
  pageNumber: number = 1,
) {
  cacheTag("get_vehicles_Filters");
  cacheLife({ revalidate: 3600 });

  const where: Prisma.VehicleWhereInput = {};

  if (filters?.availableNow) {
    where.status = VehicleStatus.AVAILABLE;
  }

  if (filters?.carQuery?.trim()) {
    where.OR = [
      {
        name: {
          contains: filters.carQuery,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: filters.carQuery,
          mode: "insensitive",
        },
      },
    ];
  }

  if (filters?.rentalDate) {
    const selectedDate = new Date(filters.rentalDate);

    where.bookings = {
      none: {
        status: {
          not: "CANCELLED",
        },
        pickupDate: {
          lte: selectedDate,
        },
        dropoffDate: {
          gte: selectedDate,
        },
      },
    };
  }

  if (filters?.types?.length) {
    where.fuel = {
      in: filters.types,
      mode: "insensitive",
    };
  }

  if (filters?.brands?.length) {
    where.brand = {
      in: filters.brands,
      mode: "insensitive",
    };
  }

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    where.pricePerDay = {};
    if (filters.minPrice !== undefined && !isNaN(filters.minPrice)) {
      where.pricePerDay.gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined && !isNaN(filters.maxPrice)) {
      where.pricePerDay.lte = filters.maxPrice;
    }
  }

  const orderBy: Prisma.VehicleOrderByWithRelationInput =
    filters?.sort === "Price Low to High"
      ? { pricePerDay: "asc" }
      : filters?.sort === "Price High to Low"
        ? { pricePerDay: "desc" }
        : { createdAt: "desc" };

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where,
      orderBy,
      skip: (pageNumber - 1) * VEHICLES_PER_PAGE,
      take: VEHICLES_PER_PAGE,
    }),

    prisma.vehicle.count({ where }),
  ]);

  return {
    vehicles,
    totalPages: Math.ceil(total / VEHICLES_PER_PAGE),
  };
}
