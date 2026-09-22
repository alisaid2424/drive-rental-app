import { Column } from "@/components/AdminTable";
import { BookingActions } from "@/components/booking/BookingActions";
import { BookingWithUserVehicle } from "@/types/booking";
import { CheckCircle2, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

export const bookingColumns: Column<BookingWithUserVehicle>[] = [
  {
    header: "Customer",
    cell: (booking) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-100 text-primary flex items-center justify-center font-black text-xs border border-white shadow-sm">
          {booking?.user.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("") || "MC"}
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 capitalize">
            {booking?.user.name}
          </p>
          <p className="text-[10px] font-bold text-slate-400">
            {booking?.user.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Vehicle",
    cell: (booking) => (
      <div className="flex items-center gap-3">
        <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 shadow-sm border border-white relative">
          <Image
            alt={booking.vehicle.name}
            src={booking.vehicle.images[0]}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-xs font-bold text-slate-800">
          {booking.vehicle.brand}
        </span>
      </div>
    ),
  },
  {
    header: "Revenue",
    cell: (booking) => (
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <DollarSign className="w-4 h-4 text-emerald-500" />
        {booking.totalAmount}
      </div>
    ),
  },
  {
    header: "Status",
    headerClassName: "text-center px-3",
    cellClassName: "text-center px-3",
    cell: (booking) => {
      const isPaid = booking.paymentStatus === "Paid";
      return (
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
            isPaid
              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
              : "bg-amber-50 text-amber-600 border-amber-200"
          }`}
        >
          {isPaid ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          {isPaid ? "Confirmed" : "Pending"}
        </span>
      );
    },
  },
  {
    header: "Actions",
    headerClassName: "text-right px-8",
    cellClassName: "text-center px-8",
    cell: (booking, _, totalCurrentItems) => (
      <BookingActions
        booking={booking}
        isPaid={booking.paymentStatus === "Paid"}
        currentItemsCount={totalCurrentItems}
      />
    ),
  },
];
