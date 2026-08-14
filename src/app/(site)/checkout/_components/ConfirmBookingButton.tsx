"use client";

import { Button } from "@/components/ui/button";
import { useFormStatusListener } from "@/hooks/useFormStatus";
import { CreditCard, LoaderCircle } from "lucide-react";

const ConfirmBookingButton = () => {
  const isSubmitting = useFormStatusListener("form-checkout-submitting");

  return (
    <Button
      type="submit"
      form="confirm-booking-form"
      disabled={isSubmitting}
      className="py-6"
    >
      {isSubmitting ? (
        <>
          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 size-4" />
          Confirm Booking
        </>
      )}
    </Button>
  );
};

export default ConfirmBookingButton;
