import { BookingActions } from "@/components/booking/BookingActions";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { allbookings } from "@/constants/data";
import { DollarSign, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";

const TableBookings = () => {
  return (
    <section className="bg-white/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/60 shadow-xl shadow-rose-500/5">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Head */}
          <thead>
            <tr className="bg-accent text-black">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Customer
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Vehicle
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Revenue
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border/50">
            {allbookings.map((booking: any) => {
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
                        {booking?.customerName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "MC"}
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900 capitalize">
                          {booking?.customerName || "Ali Samy"}
                        </p>

                        <p className="text-[10px] font-bold text-slate-400">
                          {booking?.customer?.email || "aliasy@gmail.com"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 shadow-sm border border-white">
                        <Image
                          alt={booking.car.name}
                          src={booking.car.image}
                          className="w-full h-full object-cover"
                          width={200}
                          height={200}
                          loading="eager"
                          priority
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {booking.car.name}
                      </span>
                    </div>
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-5 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />$
                      {booking.totalAmount.toLocaleString()}
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-6 py-4 bg-background/40">
        <span className="text-sm text-muted-foreground">
          Showing 1 to {allbookings.length} of {allbookings.length} Bookings
        </span>

        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default TableBookings;
