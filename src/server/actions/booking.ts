"use server";

import { auth } from "@clerk/nextjs/server";
import {
  CarBookingSchema,
  CarBookingSchemaType,
  modifyBookingSchema,
  TModifyBookingSchema,
} from "@/zod-schemas/booking";
import { calculateBookingSummary } from "@/lib/calculateBookingSummary";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Pages, Routes } from "@/constants/enums";

type CheckVehicleAvailabilityProps = {
  vehicleId: string;
  pickupDateTime: string;
  returnDateTime: string;
};

// check Vehicle Availability
export const checkVehicleAvailability = async ({
  vehicleId,
  pickupDateTime,
  returnDateTime,
}: CheckVehicleAvailabilityProps) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        vehicleId,
        status: { not: "CANCELLED" },
        pickupDate: {
          lte: new Date(returnDateTime),
        },
        dropoffDate: {
          gte: new Date(pickupDateTime),
        },
      },
    });

    const isAvailable = bookings.length === 0;

    return {
      success: true,
      isAvailable,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
};

//create new Booking
export async function createBooking(
  vehicleId: string,
  data: CarBookingSchemaType,
) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { success: false, message: "Unauthorized user" };
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return { success: false, message: "User not found in database" };
    }

    const validated = CarBookingSchema.parse(data);

    const { pickupLocation, pickupDateTime, returnLocation, returnDateTime } =
      validated;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Check availability
      const existingBooking = await tx.booking.findFirst({
        where: {
          vehicleId,
          status: {
            not: "CANCELLED",
          },
          pickupDate: {
            lte: new Date(returnDateTime),
          },
          dropoffDate: {
            gte: new Date(pickupDateTime),
          },
        },
      });

      if (existingBooking) {
        return {
          success: false,
          message: "The vehicle is no longer available for the selected dates.",
        };
      }

      // 2. Get vehicle
      const vehicle = await tx.vehicle.findUnique({
        where: { id: vehicleId },
      });

      if (!vehicle) {
        return {
          success: false,
          message: "Vehicle not found",
        };
      }

      // 3. Calculate total
      const { total } = calculateBookingSummary({
        pickupDateTime,
        returnDateTime,
        pricePerDay: vehicle.pricePerDay,
      });

      const pDate = new Date(pickupDateTime);
      const rDate = new Date(returnDateTime);

      // 4. Create booking
      const booking = await tx.booking.create({
        data: {
          userId: user.id,
          vehicleId: vehicle.id,
          pickupLocation,
          pickupDate: pDate,
          dropoffLocation: returnLocation,
          dropoffDate: rDate,
          totalAmount: total,
          status: "PENDING",
          paymentStatus: "Unpaid",
        },
      });

      return {
        success: true,
        message: "Reservation created successfully.",
        data: booking,
      };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath(`/cars/${vehicleId}`);
    revalidatePath(Routes.ADMIN);
    revalidatePath(Pages.MYBOOKINGS);

    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

//update Booking
export async function updateBooking(
  bookingId: string,
  data: TModifyBookingSchema,
) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { success: false, message: "Unauthorized user" };
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return { success: false, message: "User not found in database" };
    }

    const validated = modifyBookingSchema.parse(data);
    const { pickupLocation, pickupDateTime, returnLocation, returnDateTime } =
      validated;

    const result = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: { vehicle: true },
      });

      if (!booking) {
        return { success: false, message: "Booking not found" };
      }

      if (booking.status !== "PENDING") {
        return {
          success: false,
          message: "Only pending bookings can be updated.",
        };
      }

      const isAdmin = user.role === "ADMIN";
      const isOwner = booking.userId === user.id;

      if (!isAdmin && !isOwner) {
        return {
          success: false,
          message: "Unauthorized to update this booking",
        };
      }

      const conflict = await tx.booking.findFirst({
        where: {
          vehicleId: booking.vehicleId,
          id: { not: bookingId },
          status: { not: "CANCELLED" },
          pickupDate: { lte: new Date(returnDateTime) },
          dropoffDate: { gte: new Date(pickupDateTime) },
        },
      });

      if (conflict) {
        return {
          success: false,
          message: "The vehicle is not available for the newly selected dates.",
        };
      }

      const { total } = calculateBookingSummary({
        pickupDateTime,
        returnDateTime,
        pricePerDay: booking.vehicle.pricePerDay,
      });

      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          pickupLocation,
          pickupDate: new Date(pickupDateTime),
          dropoffLocation: returnLocation,
          dropoffDate: new Date(returnDateTime),
          totalAmount: total,
        },
      });

      return {
        success: true,
        message: "Booking updated successfully.",
        data: updatedBooking,
      };
    });

    if (!result.success) return result;

    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(`/cars/${result.data?.vehicleId}`);
    revalidatePath(Pages.CHECKOUT);
    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.LISTBOOKINGS);
    revalidatePath(Routes.LISTVEHICLES);

    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

// update Booking Payment
export async function updateBookingPayment(bookingId: string) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return { success: false, message: "Unauthorized user" };
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      return { success: false, message: "User not found in database" };
    }

    const updatedBooking = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: "Paid",
          status: "COMPLETED",
        },
        include: { user: true, vehicle: true },
      });

      await tx.vehicle.update({
        where: { id: booking.vehicleId },
        data: { status: "ON_RENTAL" },
      });

      return booking;
    });

    revalidatePath(`/cars/${updatedBooking.vehicleId}`);
    revalidatePath(Pages.CHECKOUT);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.LISTBOOKINGS);
    revalidatePath(Routes.LISTVEHICLES);

    return {
      success: true,
      message: "Payment status updated successfully",
      data: updatedBooking,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

//delete Booking
export async function deleteBooking(bookingId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      return { success: false, message: "Unauthorized. Please log in." };
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, message: "Booking not found." };
    }

    const isAdmin = user.role === "ADMIN";
    const isOwner = booking.userId === user.id;

    if (!isAdmin && !isOwner) {
      return {
        success: false,
        message:
          "Forbidden. You do not have permission to delete this booking.",
      };
    }

    if (!isAdmin && isOwner && booking.paymentStatus === "Paid") {
      return {
        success: false,
        message: "Cannot delete a confirmed booking. Please contact support.",
      };
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    revalidatePath(Routes.ADMIN);
    revalidatePath(Routes.LISTBOOKINGS);
    revalidatePath(Pages.MYBOOKINGS);
    revalidatePath(`/cars/${booking.vehicleId}`);

    return { success: true, message: "Booking deleted successfully." };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
}
