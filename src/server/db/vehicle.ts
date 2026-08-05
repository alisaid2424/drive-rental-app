"use cache";

import prisma from "@/lib/db";
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
