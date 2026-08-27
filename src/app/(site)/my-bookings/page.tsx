import Link from "next/link";
import LottieHandler from "@/components/LottieHandler";
import { BookingActions } from "@/components/booking/BookingActions";
import Image from "next/image";
import { CalendarDays, MapPin, Settings, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/Heading";
import { auth } from "@clerk/nextjs/server";
import { getUserBookings } from "@/server/db/user";
import { formatBookingDateTime } from "@/lib/formatBookingDateTime";
import { BookingWithUserVehicle } from "@/types/booking";

const MyBookingsPage = async () => {
  const { userId: clerkUserId } = await auth();
  const bookings = clerkUserId ? await getUserBookings(clerkUserId) : [];

  return (
    <section className="container-custom py-28">
      {bookings.length ? (
        <div className="max-w-5xl">
          <div className="mb-4 flex flex-col items-center md:items-start">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Booking Management
            </span>

            <Heading
              title="My Bookings"
              subtitle=" View, manage, and track all your luxury vehicle reservations in one
          place."
              align="left"
            />
          </div>

          <div className="flex flex-col gap-5">
            {bookings.map((booking: BookingWithUserVehicle) => {
              const isPaid = booking.paymentStatus === "Paid";

              return (
                <div
                  key={booking.id}
                  className="group flex flex-col md:flex-row justify-between bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-4 shadow-xl shadow-rose-500/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Vehicle Image */}
                    <div className="relative md:w-60 h-40 rounded-[2rem] overflow-hidden shrink-0 border border-white/40 shadow-sm">
                      <Image
                        src={booking.vehicle.images[0]}
                        alt={booking.vehicle.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="eager"
                        priority
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white rounded-full ${
                            isPaid
                              ? "bg-emerald-500 hover:bg-emerald-500"
                              : "bg-primary hover:bg-primary"
                          }`}
                        >
                          {isPaid ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                    </div>

                    {/* Vehicle & Trip Info */}
                    <div className="flex flex-col justify-center py-2">
                      <div className="mb-4">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-1">
                          {booking.vehicle.name}
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">
                            <Settings className="w-4 h-4 text-rose-500" />
                            {booking.vehicle.transmission}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-rose-500" />
                            {booking.vehicle.seats} Seats
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mt-auto">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 w-fit px-3 py-1.5 rounded-full border border-slate-100">
                          <CalendarDays className="w-4 h-4 text-rose-500" />
                          {formatBookingDateTime(booking.pickupDate)}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">
                          <MapPin className="w-4 h-4 text-rose-500" />
                          {booking.pickupLocation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount & Actions */}
                  <div className="flex flex-col md:items-end justify-between p-4 md:text-right">
                    <div className="mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                        Total Amount
                      </p>
                      <p className="text-3xl font-black text-slate-900">
                        ${booking.totalAmount}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <BookingActions booking={booking} isPaid={isPaid} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto text-center my-10 py-20 bg-white/60 backdrop-blur-3xl rounded-lg sm:rounded-4xl border-2 border-dashed border-rose-200 flex flex-col items-center">
          <div className="mb-6 w-36 h-36 flex items-center justify-center">
            <LottieHandler type="empty" />
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase">
            No Bookings Yet
          </h3>
          <p className="text-slate-400 text-sm mt-2 mb-8">
            Start your first elite journey today.
          </p>
          <Link
            href="/browse"
            className="bg-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-500/20 hover:scale-105 transition-all"
          >
            Browse Fleet
          </Link>
        </div>
      )}
    </section>
  );
};

export default MyBookingsPage;
