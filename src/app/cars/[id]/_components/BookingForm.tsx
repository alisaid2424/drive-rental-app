"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ShieldCheck, KeyRound, Sparkles, LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { CarBookingSchema, CarBookingSchemaType } from "@/zod-schemas/booking";
import { calculateBookingSummary } from "@/lib/calculateBookingSummary";

type Props = {
  pricePerDay: number;
};

const BookingForm = ({ pricePerDay }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CarBookingSchemaType>({
    resolver: zodResolver(CarBookingSchema),
    defaultValues: {
      pickupLocation: "",
      pickupDateTime: "",
      returnLocation: "",
      returnDateTime: "",
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

  const { rentalDays, serviceFee, total } = calculateBookingSummary({
    pickupDateTime,
    returnDateTime,
    pricePerDay,
  });

  const onSubmit = (data: CarBookingSchemaType) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">
              Price Per Day
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              ${pricePerDay}
            </h2>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1">
              <Sparkles className="h-4 w-4 text-emerald-500" />

              <span className="text-xs font-semibold text-emerald-600">
                Best Value
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">Insurance Included</p>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-5 space-y-4">
          {/* Pickup */}
          <InputWithLabel<CarBookingSchemaType>
            fieldTitle="Pick-up Location"
            nameInSchema="pickupLocation"
            type="text"
            placeholder="e.g., Beverly Hills Boutique"
            className="rounded-2xl mt-1.5"
            showLocationIcon
          />

          <InputWithLabel<CarBookingSchemaType>
            fieldTitle="Pick-up Date & Time"
            nameInSchema="pickupDateTime"
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            className="rounded-2xl mt-1.5"
          />

          {/* Return */}
          <InputWithLabel<CarBookingSchemaType>
            fieldTitle="Return Location"
            nameInSchema="returnLocation"
            type="text"
            placeholder="e.g., Beverly Hills Boutique"
            className="rounded-2xl mt-1.5"
            showLocationIcon
          />

          <InputWithLabel<CarBookingSchemaType>
            fieldTitle="Return Date & Time"
            nameInSchema="returnDateTime"
            type="datetime-local"
            className="rounded-2xl mt-1.5"
          />
        </div>

        {/* Pricing */}
        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{rentalDays} Days Rental</span>

              <span className="font-semibold text-slate-900">
                ${pricePerDay * rentalDays}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service Fee</span>

              <span className="font-semibold text-slate-900">
                ${serviceFee}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-slate-900">Total</span>

                <span className="text-2xl font-extrabold text-slate-900">
                  ${total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button disabled={isPending} type="submit" className="mt-5 w-full py-6">
          {isPending ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <KeyRound className="h-5 w-5" />
              Book Now
            </>
          )}
        </Button>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />

          <p className="text-xs text-slate-500">
            Free cancellation up to 48 hours before pickup
          </p>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
