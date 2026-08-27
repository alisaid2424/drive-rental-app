"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookingWithUserVehicle } from "@/types/booking";
import { Pages } from "@/constants/enums";

interface BookingConfirmDialogProps {
  booking: BookingWithUserVehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingConfirmDialog({
  booking,
  isOpen,
  onClose,
}: BookingConfirmDialogProps) {
  const router = useRouter();
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[90%] sm:max-w-md md:max-w-xl bg-white border-none rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-7">
          <div className="flex justify-between items-start mb-8">
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 capitalize">
                Finalize Payment
              </DialogTitle>
              <p className="text-[8px] sm:text-[10px] font-black text-slate-400 tracking-[0.2em] mt-2">
                Secure your premium reservation
              </p>
            </div>
            <Button
              size="icon-lg"
              onClick={onClose}
              className="group bg-slate-50 hover:bg-slate-100 hover:text-rose-500 rounded-xl transition-all text-slate-400"
            >
              <X className="size-5 group-hover:rotate-180 transition duration-300" />
            </Button>
          </div>

          <div className="space-y-8">
            <div className="p-4 sm:p-5 bg-slate-50 rounded-md sm:rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  Reservation Amount
                </p>
                <p className="text-lg sm:text-3xl font-black text-slate-900">
                  ${booking.totalAmount}.00
                </p>
              </div>
              <div className="group hover:cursor-pointer size-12 sm:size-14 rounded-lg bg-white shadow-sm flex items-center justify-center text-rose-500">
                <CreditCard size={25} className="group-hover:scale-105" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-md sm:rounded-2xl border border-emerald-100 text-emerald-600">
                <ShieldCheck size={20} />
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Encrypted & Secure Payment Processing
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 px-2">
                  <span>Vehicle: {booking.vehicle.name}</span>
                  <span className="text-slate-900">
                    ${booking.vehicle.pricePerDay} / Day
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 px-2">
                  <span>Service Fees</span>
                  <span className="text-slate-900">
                    ${booking.vehicle.pricePerDay * 0.05} / Day
                  </span>
                </div>
              </div>

              <Button
                onClick={() => {
                  toast.success(
                    "Payment processed successfully! Your booking is now confirmed.",
                  );
                  router.push(`${Pages.CHECKOUT}?bookingId=${booking.id}`);
                  onClose();
                }}
                className="w-full h-14 bg-primary text-white rounded-md sm:rounded-2xl font-black "
              >
                <CheckCircle2 className="size-5 mr-2" /> Confirm & Pay Now
              </Button>

              <p className="text-center text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                By clicking, you agree to our{" "}
                <span className="text-rose-500 cursor-pointer hover:underline">
                  Terms of Service
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
