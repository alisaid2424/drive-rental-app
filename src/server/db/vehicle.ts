"use cache";

import prisma from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

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
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return vehicle;
}
