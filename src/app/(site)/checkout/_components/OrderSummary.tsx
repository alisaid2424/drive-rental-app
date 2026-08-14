import Image from "next/image";
import { Verified } from "lucide-react";
import ConfirmBookingButton from "./ConfirmBookingButton";

export function OrderSummary() {
  return (
    <aside className="w-full lg:w-105">
      <div className="bg-white/60 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-2xl shadow-rose-500/5 border border-white/60 flex flex-col">
        <div className="mb-8 rounded-[1.5rem] overflow-hidden h-62 relative shadow-md">
          <Image
            alt="Luxury Sports Car"
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnVWl3wRSFKoMLIMpEepx2DfAW1UocDc-94puVhslCj_Q-sDENFztwLzMHtvjLDhiAn3pVzcLyu_UWUHexMG5mCxZB1UNYfh5fzvhu60Fgq11HnBVv-Iuv3iAgSOvY45n4SiiIglKWvJxwd_mPWPdyYlf_SqKrNCaiGUmbS0uaLRpvlRMCp8qc2JFyCbWbEqcmFYdZV2SCGbRHwvjifdKQEGFts8P67peR8l1lxm6g2hSR81T70dU_9d44C13d63oaCTrqgpQfwWc"
            fill
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent" />
          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="font-black text-2xl tracking-tight">
              Porsche 911 Carrera
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1.5">
              Silver Mist • 2024 Model
            </p>
          </div>
        </div>

        <div className="space-y-5 mb-8 pe-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 tracking-widest">
              Daily Rental Rate
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              $299.00
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 tracking-widest">
              Duration (4 Days)
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              $1,196
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 tracking-widest">
              Concierge Fee
            </span>
            <span className="text-sm font-extrabold text-slate-900">$45</span>
          </div>
          <div className="h-px bg-slate-100 w-full my-3"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-black text-slate-700 uppercase tracking-[0.2em]">
              Total
            </span>
            <span className="text-2xl font-black text-primary tracking-tighter">
              $1,241
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
}
