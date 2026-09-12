"use cache";

import { BOOKINGS_PER_PAGE } from "@/constants/enums";
import prisma from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export async function getBooking(bookingId: string) {
  cacheTag(`get_booking-${bookingId}`);
  cacheLife({ revalidate: 3600 });

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      vehicle: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
}

export async function getBookings({
  searchText = "",
  pageNumber = 1,
}: {
  searchText?: string;
  pageNumber?: number;
}) {
  cacheTag(`bookings-search-${searchText}-page-${pageNumber}`);
  cacheLife({ revalidate: 3600 });

  const whereClause = searchText
    ? {
        OR: [
          {
            user: {
              name: {
                contains: searchText,
                mode: "insensitive" as const,
              },
            },
          },
          {
            vehicle: {
              name: {
                contains: searchText,
                mode: "insensitive" as const,
              },
            },
          },
        ],
      }
    : {};

  const [bookings, totalCount] = await Promise.all([
    prisma.booking.findMany({
      where: whereClause,
      include: {
        user: true,
        vehicle: true,
      },
      skip: BOOKINGS_PER_PAGE * (pageNumber - 1),
      take: BOOKINGS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.booking.count({ where: whereClause }),
  ]);

  return {
    bookings,
    totalCount,
    totalPages: Math.ceil(totalCount / BOOKINGS_PER_PAGE),
  };
}
