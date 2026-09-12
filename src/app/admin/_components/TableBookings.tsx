import { BookingActions } from "@/components/booking/BookingActions";
import { BookingWithUserVehicle } from "@/types/booking";
import { DollarSign, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import PaginationAdmin from "./PaginationAdmin";

type TableBookingsProps = {
  bookings: BookingWithUserVehicle[];
  showPagenation?: boolean;
  totalCount?: number;
  totalPages?: number;
};

const TableBookings = ({
  bookings,
  showPagenation = true,
  totalCount,
  totalPages,
}: TableBookingsProps) => {
  return (
    <section className="bg-white/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/60 shadow-xl shadow-rose-500/5">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Head */}
          <thead>
            <tr className="bg-accent text-black">
              <th className="text-start px-6 py-4 text-sm font-semibold text-slate-600">
                Customer
              </th>
              <th className="text-start px-6 py-4 text-sm font-semibold text-slate-600">
                Vehicle
              </th>
              <th className="text-start px-6 py-4 text-sm font-semibold text-slate-600">
                Revenue
              </th>
              <th className="text-start px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>
              <th className="text-end px-6 py-4 text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border/50">
            {bookings.map((booking: BookingWithUserVehicle) => {
              const isPaid = booking.paymentStatus === "Paid";

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-accent/30 transition-colors"
                >
                  {/* Customer */}
                  <td className="px-6 py-5">
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
                  </td>

                  {/* Vehicle */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 shadow-sm border border-white">
                        <Image
                          alt={booking.vehicle.name}
                          src={booking.vehicle.images[0]}
                          className="w-full h-full object-cover"
                          width={200}
                          height={200}
                          loading="eager"
                          priority
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {booking.vehicle.brand}
                      </span>
                    </div>
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-5 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      {booking.totalAmount}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                        booking.paymentStatus === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {booking.paymentStatus === "Paid" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}

                      {booking.paymentStatus === "Paid"
                        ? "Confirmed"
                        : "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-6 text-center">
                    <BookingActions booking={booking} isPaid={isPaid} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showPagenation && (
        <PaginationAdmin
          totalPages={totalPages}
          totalCount={totalCount}
          currentCount={bookings.length}
          itemName="Bookings"
        />
      )}
    </section>
  );
};

export default TableBookings;
