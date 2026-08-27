import Image from "next/image";
import { Verified } from "lucide-react";
import ConfirmBookingButton from "./ConfirmBookingButton";
import { getBooking } from "@/server/db/booking";
import { calculateBookingSummary } from "@/lib/calculateBookingSummary";

const CheckoutSummary = async ({ bookingId }: { bookingId: string }) => {
  const booking = await getBooking(bookingId);

  const { rentalDays, serviceFee, total } = calculateBookingSummary({
    pickupDateTime: booking.pickupDate?.toISOString(),
    returnDateTime: booking.dropoffDate?.toISOString(),
    pricePerDay: booking.vehicle.pricePerDay,
  });

  return (
    <aside className="w-full lg:w-105">
      <div className="bg-white/60 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-2xl shadow-rose-500/5 border border-white/60 flex flex-col">
        <div className="mb-8 rounded-[1.5rem] overflow-hidden h-62 relative shadow-md">
          <Image
            alt={booking.vehicle.name}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            src={booking.vehicle.images[0]}
            fill
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent" />
          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="font-black text-2xl tracking-tight">
              {booking.vehicle.name}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1.5">
              {booking.vehicle.type} • {booking.vehicle.transmission}
            </p>
          </div>
        </div>

        <div className="space-y-5 mb-8 pe-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 tracking-widest">
              Daily Rental Rate
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              ${booking.vehicle.pricePerDay}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 tracking-widest">
              Duration ({rentalDays} {rentalDays === 1 ? "Day" : "Days"})
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              ${booking.vehicle.pricePerDay * rentalDays}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 tracking-widest">
              Concierge Fee
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              ${serviceFee}
            </span>
          </div>
          <div className="h-px bg-slate-100 w-full my-3" />
          <div className="flex justify-between items-center">
            <span className="text-base font-black text-slate-700 uppercase tracking-[0.2em]">
              Total
            </span>
            <span className="text-2xl font-black text-primary tracking-tighter">
              ${total}
            </span>
          </div>
        </div>

        <div className="bg-primary/5 px-6 py-3 rounded-xl mb-8 flex items-start gap-4 border border-rose-100/50">
          <Verified className="h-5 w-5 text-primary shrink-0" />
          <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
            Best price guaranteed for{" "}
            <span className="font-black text-slate-900 uppercase">
              Member Tier
            </span>
            . Free cancellation up to 24h.
          </p>
        </div>

        <ConfirmBookingButton />

        <p className="text-center text-[10px] font-medium text-slate-400 mt-8 px-4">
          By clicking Confirm Booking, you agree to LuxeDrive&apos;s Terms of
          Service and Rental Agreement.
        </p>
      </div>
    </aside>
  );
};

export default CheckoutSummary;
