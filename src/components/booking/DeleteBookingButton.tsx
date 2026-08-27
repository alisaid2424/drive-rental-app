"use client";

import { useTransition } from "react";
import { deleteBooking } from "@/server/actions/booking";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { confirmDelete } from "@/lib/swal";
import { cn } from "@/lib/utils";

interface DeleteBookingButtonProps {
  bookingId: string;
}

const DeleteBookingButton = ({ bookingId }: DeleteBookingButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const confirmed = await confirmDelete(
      "Delete Booking?",
      "Are you sure you want to delete this booking?",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteBooking(bookingId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      variant="secondary"
      disabled={isPending}
      size="icon"
      onClick={handleDelete}
      className={cn(
        "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 hover:border-rose-500 transition-colors disabled:opacity-50",
      )}
      title="Delete Booking"
    >
      <Trash2 className="size-4" />
    </Button>
  );
};

export default DeleteBookingButton;
