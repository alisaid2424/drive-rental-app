"use cache";

import { cacheLife, cacheTag } from "next/cache";
import clerkClient from "@clerk/clerk-sdk-node";
import prisma from "@/lib/db";
import { USERS_PER_PAGE } from "@/constants/enums";

export async function getFavoritesUser(userId: string) {
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

export async function getBookingsUser(clerkUserId: string) {
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

export async function getUsersBysearch({
  searchText = "",
  pageNumber = 1,
}: {
  searchText?: string;
  pageNumber?: number;
}) {
  cacheTag(`users-search-${searchText}-page-${pageNumber}`);
  cacheLife({ revalidate: 3600 });

  const whereClause = searchText
    ? {
        OR: [
          {
            name: {
              contains: searchText,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: searchText,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      skip: USERS_PER_PAGE * (pageNumber - 1),
      take: USERS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.user.count({
      where: whereClause,
    }),
  ]);

  return {
    users,
    totalCount,
    totalPages: Math.ceil(totalCount / USERS_PER_PAGE),
  };
}
