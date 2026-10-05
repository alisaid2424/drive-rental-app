import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";

export async function GET(req: Request) {
  const auth = req.headers.get("Authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const cutoffDate = new Date();
  cutoffDate.setHours(cutoffDate.getHours() - 24);

  const unpaidBookings = await prisma.booking.findMany({
    where: {
      paymentStatus: "Unpaid",
      createdAt: {
        lt: cutoffDate,
      },
    },
    select: {
      id: true,
      vehicleId: true,
    },
  });

  if (unpaidBookings.length === 0) {
    return NextResponse.json({
      status: 200,
      message: "No unpaid bookings found to delete",
    });
  }

  await prisma.booking.deleteMany({
    where: {
      id: {
        in: unpaidBookings.map((b) => b.id),
      },
    },
  });

  const vehicleIds = Array.from(
    new Set(unpaidBookings.map((b) => b.vehicleId)),
  );
  for (const vehicleId of vehicleIds) {
    revalidatePath(`/cars/${vehicleId}`);
  }

  revalidatePath(Pages.MYBOOKINGS);
  revalidatePath(Routes.ADMIN);
  revalidatePath(Routes.LISTBOOKINGS);
  revalidatePath(Routes.LISTVEHICLES);

  return NextResponse.json({
    status: 200,
    message: `Deleted ${unpaidBookings.length} unpaid bookings`,
  });
}
