"use cache";

import { cacheLife, cacheTag } from "next/cache";
import clerkClient from "@clerk/clerk-sdk-node";
import prisma from "@/lib/db";

export async function getUserFavorites(userId: string) {
  cacheTag("get-user-favorites");
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
