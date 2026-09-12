"use cache";

import prisma from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

export async function getDashboardData(days = 7) {
  cacheTag("dashboard-data");
  cacheLife({ revalidate: 3600 });

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - (days - 1));

  const [
    totalBookings,
    revenueResult,
    totalFleetCount,
    activeFleetCount,
    recentBookings,
    revenueBookings,
    vehiclesWithBookingCount,
  ] = await Promise.all([
    // Total Booking
    prisma.booking.count(),

    // Total Revenue Paid bookings only
    prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        paymentStatus: "Paid",
        status: {
          not: "CANCELLED",
        },
      },
    }),

    // Total Fleet
    prisma.vehicle.count(),

    // Active Fleet
    prisma.vehicle.count({
      where: {
        bookings: {
          some: {
            status: {
              not: "CANCELLED",
            },
            pickupDate: {
              lte: now,
            },
            dropoffDate: {
              gte: now,
            },
          },
        },
      },
    }),

    // Recent Bookings
    prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        user: true,
        vehicle: true,
      },
    }),

    // Revenue Last N Days
    prisma.booking.findMany({
      where: {
        paymentStatus: "Paid",
        status: {
          not: "CANCELLED",
        },
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      select: {
        createdAt: true,
        totalAmount: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    // Fleet Health
    prisma.vehicle.findMany({
      select: {
        fuel: true,
        _count: {
          select: {
            bookings: {
              where: {
                status: { not: "CANCELLED" },
              },
            },
          },
        },
      },
    }),
  ]);

  // Revenue Chart Data
  function getRevenueData(
    bookings: { createdAt: Date; totalAmount: number }[],
    days: number,
  ) {
    const revenueMap = bookings.reduce((map, b) => {
      const key = b.createdAt.toDateString();
      return map.set(key, (map.get(key) || 0) + b.totalAmount);
    }, new Map<string, number>());

    const today = new Date();

    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (days - 1 - i));

      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        revenue: revenueMap.get(date.toDateString()) || 0,
      };
    });
  }
  const revenueData = getRevenueData(revenueBookings, days);

  // Fleet Health
  const fleetHealthData = Object.entries(
    vehiclesWithBookingCount.reduce(
      (acc, vehicle) => {
        acc[vehicle.fuel] = (acc[vehicle.fuel] || 0) + vehicle._count.bookings;
        return acc;
      },
      {} as Record<string, number>,
    ),
  )
    .map(([fuel, count]) => ({
      label: fuel,
      value: totalBookings > 0 ? Math.round((count / totalBookings) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);

  return {
    totalBookings,
    totalRevenue: revenueResult._sum.totalAmount ?? 0,
    activeFleetCount,
    totalFleetCount,
    recentBookings,
    revenueData,
    fleetHealthData,
  };
}
