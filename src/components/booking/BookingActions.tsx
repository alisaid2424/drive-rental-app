"use client";

import { useState } from "react";
import { BookingDetailsDialog } from "./BookingDetailsDialog";
import { BookingModifyDialog } from "./BookingModifyDialog";
import { BookingConfirmDialog } from "./BookingConfirmDialog";
import { Info, Edit3, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { BookingWithUserVehicle } from "@/types/booking";
import { DeleteButton } from "../DeleteButton";
import { deleteBooking } from "@/server/actions/booking";

interface BookingActionsProps {
  booking: BookingWithUserVehicle;
  isPaid: boolean;
  currentItemsCount?: number;
}

export function BookingActions({
  booking,
  isPaid = false,
  currentItemsCount,
}: BookingActionsProps) {
  const [activeDialog, setActiveDialog] = useState<
    "details" | "modify" | "confirm" | null
  >(null);

  return (
    <div className="flex flex-wrap items-center md:justify-end gap-3">
      {isPaid ? (
        <>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setActiveDialog("details")}
            className="text-sky-600 hover:bg-sky-50 hover:text-sky-700"
            title="Details Booking"
          >
            <Info className="size-5" />
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="bg-emerald-50 text-emerald-600 border border-emerald-200
            hover:bg-emerald-100 hover:border-emerald-500"
            onClick={() => setActiveDialog("confirm")}
            title="Confirm Booking"
          >
            <CreditCard className="size-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => setActiveDialog("modify")}
            className="bg-amber-50 text-amber-600 border border-amber-200
            hover:bg-amber-100 hover:border-amber-500"
            title="Edit Booking"
          >
            <Edit3 className="size-4" />
          </Button>

          <DeleteButton
            id={booking.id}
            onDelete={deleteBooking}
            title="Delete Booking?"
            description="Are you sure you want to delete this booking?"
            currentItemsCount={currentItemsCount}
            variant="secondary"
            size="icon"
            className="w-10 h-10 rounded-md bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 hover:border-rose-500 transition-colors"
          />
        </div>
      )}

      {/* Dialogs */}
      <BookingDetailsDialog
        booking={booking}
        isOpen={activeDialog === "details"}
        onClose={() => setActiveDialog(null)}
      />
      <BookingModifyDialog
        booking={booking}
        isOpen={activeDialog === "modify"}
        onClose={() => setActiveDialog(null)}
      />
      <BookingConfirmDialog
        booking={booking}
        isOpen={activeDialog === "confirm"}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
}
