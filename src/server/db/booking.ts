"use cache";

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
