"use cache";

import { cacheLife, cacheTag } from "next/cache";
import clerkClient from "@clerk/clerk-sdk-node";
import prisma from "@/lib/db";

export async function getUserFavorites(userId: string) {
  cacheTag(`get-user-favorites-${userId}`);
  cacheLife({ revalidate: 3600 });

  const user = await clerkClient.users.getUser(userId);

  const favorites = Array.isArray(user?.privateMetadata?.favorites)
    ? (user.privateMetadata.favorites as string[])
    : [];

  if (!favorites.length) return [];

  return prisma.vehicle.findMany({
    where: {
      id: {
        in: favorites,
      },
    },
  });
}

export async function getUserBookings(clerkUserId: string) {
  cacheTag(`get-user-bookings-${clerkUserId}`);
  cacheLife({ revalidate: 3600 });

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
      vehicle: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
