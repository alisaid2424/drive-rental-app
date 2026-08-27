"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle2, Users, Settings, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { Form } from "../ui/form";
import { InputWithLabel } from "../inputs/InputWithLabel";
import {
  modifyBookingSchema,
  TModifyBookingSchema,
} from "@/zod-schemas/booking";
import { calculateBookingSummary } from "@/lib/calculateBookingSummary";
import { formatToDatetimeLocal } from "@/lib/formatToDateTimeLocal";
import { updateBooking } from "@/server/actions/booking";
import { toast } from "sonner";
import { BookingWithUserVehicle } from "@/types/booking";

interface BookingModifyDialogProps {
  booking: BookingWithUserVehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModifyDialog({
  booking,
  isOpen,
  onClose,
}: BookingModifyDialogProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TModifyBookingSchema>({
    resolver: zodResolver(modifyBookingSchema),

    defaultValues: {
      pickupLocation: booking.pickupLocation,
      returnLocation: booking.dropoffLocation,
      pickupDateTime: formatToDatetimeLocal(booking.pickupDate),
      returnDateTime: formatToDatetimeLocal(booking.dropoffDate),
    },
  });

  const pickupDateTime = useWatch({
    control: form.control,
    name: "pickupDateTime",
  });
  const returnDateTime = useWatch({
    control: form.control,
    name: "returnDateTime",
  });

  const pricePerDay = booking.vehicle?.pricePerDay ?? 0;
  const { rentalDays, total } = calculateBookingSummary({
    pickupDateTime,
    returnDateTime,
    pricePerDay,
  });

  const onSubmit = (data: TModifyBookingSchema) => {
    startTransition(async () => {
      const res = await updateBooking(booking.id, data);

      if (res.success) {
        toast.success(res.message);
        onClose();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[90%] sm:max-w-xl md:max-w-2xl bg-white border-none rounded-[40px] shadow-2xl overflow-hidden p-0 max-h-[90vh]"
      >
        <div className="p-7 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-start mb-5">
            <div>
              <DialogTitle className="text-2xl font-black capitalize tracking-tighter text-slate-900">
                Modify Booking
              </DialogTitle>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                Adjust your high-performance itinerary
              </p>
            </div>

            <Button
              size="icon-lg"
              onClick={onClose}
              className="group bg-white shadow-sm text-slate-400 hover:text-rose-500 rounded-xl hover:bg-white transition-all"
            >
              <X className="size-5 group-hover:rotate-180 transition duration-400" />
            </Button>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="w-24 h-16 rounded-xl overflow-hidden shadow-sm bg-white">
                <Image
                  src={booking.vehicle.images[0]}
                  className="w-full h-full object-cover"
                  alt="Car"
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <h4 className="text-base sm:text-xl font-black uppercase text-slate-900">
                  {booking.vehicle.name}
                </h4>
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                  <span className="flex items-center gap-2">
                    <Users size={12} className="text-rose-500" />{" "}
                    {booking.vehicle.seats} Seats
                  </span>
                  <span className="flex items-center gap-2">
                    <Settings size={12} className="text-rose-500" />{" "}
                    {booking.vehicle.transmission}
                  </span>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel<TModifyBookingSchema>
                    fieldTitle="Pick-up Location"
                    nameInSchema="pickupLocation"
                    type="text"
                    placeholder="e.g., Beverly Hills Boutique"
                    className="h-12 rounded-xl mt-2"
                    showLocationIcon
                  />

                  <InputWithLabel<TModifyBookingSchema>
                    fieldTitle="Return Location"
                    nameInSchema="returnLocation"
                    type="text"
                    placeholder="e.g., Beverly Hills Boutique"
                    className="h-12 rounded-xl mt-2"
                    showLocationIcon
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWithLabel<TModifyBookingSchema>
                    fieldTitle="Pick-up Date & Time"
                    nameInSchema="pickupDateTime"
                    type="datetime-local"
                    min={formatToDatetimeLocal(booking.pickupDate)}
                    className="h-12 rounded-xl mt-2"
                  />

                  <InputWithLabel<TModifyBookingSchema>
                    fieldTitle="Return Date & Time"
                    nameInSchema="returnDateTime"
                    type="datetime-local"
                    className="h-12 rounded-xl mt-2"
                  />
                </div>

                {/* Pricing Bento Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Base Rate
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      ${pricePerDay}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Duration
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {rentalDays} {rentalDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-start md:pl-8 md:border-l border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Total cost
                    </span>
                    <div className="flex flex-col">
                      <span className="text-slate-300 line-through text-xs font-bold">
                        ${booking.totalAmount}
                      </span>

                      <span className="text-2xl sm:text-3xl font-black text-rose-500">
                        ${total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 py-5 sm:py-6"
                  >
                    Discard
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-5 sm:py-6 bg-slate-900 text-white"
                  >
                    {isPending ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        Confirm Adjustments
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
