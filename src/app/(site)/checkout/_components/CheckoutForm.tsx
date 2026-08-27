"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { checkoutSchema, TCheckoutSchema } from "@/zod-schemas/checkout";
import { User } from "@prisma/client";
import { useDispatchFormStatus } from "@/hooks/useFormStatus";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Calendar, CreditCard, Lock } from "lucide-react";
import { StripeWrapper } from "./StripeWrapper";
import { toast } from "sonner";
import { DOMAIN } from "@/constants/enums";
import { updateBookingPayment } from "@/server/actions/booking";
import { useState } from "react";
import { StripeElementChangeEvent } from "@stripe/stripe-js";
import { StripeCardInput } from "./StripeCardInput";
import { useRouter } from "next/navigation";
import { BookingWithUserVehicle } from "@/types/booking";

interface CheckoutFormProps {
  user: User;
  amount: number;
  bookingId: string;
}

const CheckoutFormContent = ({
  user,
  amount,
  bookingId,
}: CheckoutFormProps) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cardErrors, setCardErrors] = useState<{
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
  }>({});

  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const [focusedCard, setFocusedCard] = useState<
    "cardNumber" | "cardExpiry" | "cardCvc" | null
  >(null);

  const form = useForm<TCheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user.name ?? "",
      email: user.email ?? "",
      phone: "",
      licenseId: "",
      cardholderName: user.name ?? "",
    },
  });

  const { isSubmitting } = form.formState;

  useDispatchFormStatus("form-checkout-submitting", isSubmitting);

  const onSubmit = async (data: TCheckoutSchema) => {
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) return;

    // Check Stripe fields manually
    if (
      !cardComplete.cardNumber ||
      !cardComplete.cardExpiry ||
      !cardComplete.cardCvc
    ) {
      setCardErrors((prev) => ({
        cardNumber: !cardComplete.cardNumber
          ? prev.cardNumber || "Your card number is incomplete."
          : "",
        cardExpiry: !cardComplete.cardExpiry
          ? prev.cardExpiry || "Your card's expiration date is incomplete."
          : "",
        cardCvc: !cardComplete.cardCvc
          ? prev.cardCvc || "Your card's security code is incomplete."
          : "",
      }));

      return;
    }

    try {
      // Validate form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setCardErrors((prev) => ({
          cardNumber: prev.cardNumber || "Your card number is incomplete.",
          cardExpiry:
            prev.cardExpiry || "Your card's expiration date is incomplete.",
          cardCvc: prev.cardCvc || "Your card's security code is incomplete.",
        }));
        return;
      }

      // Create payment intent
      const res = await fetch(`${DOMAIN}/api/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const responseData = await res.json();

      if (!res.ok || !responseData.clientSecret) {
        toast.error(responseData.error || "Failed to create payment intent.");
        return;
      }

      const result = await stripe.confirmCardPayment(
        responseData.clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: data.cardholderName,
              email: data.email,
              phone: data.phone,
            },
          },
        },
      );

      if (result.error) {
        toast.error(
          result.error.message ||
            "Payment failed. Please check your card info.",
        );
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const bookingResult = await updateBookingPayment(bookingId);

        if (bookingResult.success && bookingResult.data) {
          await sendEmail(bookingResult.data);

          toast.success("Payment successful! Booking confirmed.");
          router.replace("/payment-confirm");
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }
  };

  const sendEmail = async (booking: BookingWithUserVehicle) => {
    try {
      const res = await fetch(`${DOMAIN}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: booking.user.email,
          fullName: booking.user.name,
          bookingId: booking.id,
          vehicleName: `${booking.vehicle.brand} ${booking.vehicle.name}`,
          pickupLocation: booking.pickupLocation,
          dropoffLocation: booking.dropoffLocation,
          pickupDate: booking.pickupDate,
          dropoffDate: booking.dropoffDate,
          amount: booking.totalAmount,
        }),
      });

      if (!res.ok) {
        console.error("Failed to send email");
      }
    } catch (err) {
      console.error("Email send error:", err);
    }
  };

  const handleCardChange = (
    elementName: keyof typeof cardErrors,
    event: StripeElementChangeEvent,
  ) => {
    setCardErrors((prev) => ({
      ...prev,
      [elementName]: event.error?.message || "",
    }));

    setCardComplete((prev) => ({
      ...prev,
      [elementName]: event.complete,
    }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="confirm-booking-form"
        className="grow max-w-4xl"
      >
        <div className="space-y-8">
          <section className="bg-white/60 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-xl shadow-rose-500/5 border border-white/60">
            <header className="mb-5">
              <h2 className="text-2xl font-black text-slate-900 mb-2 capitalize tracking-tight leading-none">
                Driver Information
              </h2>
              <p className="text-slate-400 text-xs font-medium">
                Please provide the details of the primary driver.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWithLabel<TCheckoutSchema>
                fieldTitle="Full Name"
                nameInSchema="fullName"
                type="text"
                placeholder="Johnathan Sterling"
                className="rounded-xl mt-1.5 py-5"
                readOnly
              />

              <InputWithLabel<TCheckoutSchema>
                fieldTitle="Email Address"
                nameInSchema="email"
                type="email"
                placeholder="j.sterling@executive.com"
                className="rounded-xl mt-1.5 py-5"
                readOnly
              />

              <InputWithLabel<TCheckoutSchema>
                fieldTitle="Phone Number"
                nameInSchema="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="rounded-xl mt-1.5 py-5"
              />

              <InputWithLabel<TCheckoutSchema>
                fieldTitle="Driver License ID"
                nameInSchema="licenseId"
                type="text"
                placeholder="D123456789"
                className="rounded-xl mt-1.5 py-5"
              />
            </div>
          </section>

          <section className="bg-white/60 backdrop-blur-3xl p-10 rounded-[2.5rem] shadow-xl shadow-rose-500/5 border border-white/60">
            <header className="mb-5">
              <h2 className="text-2xl font-black text-slate-900 mb-2 capitalize tracking-tight leading-none">
                Payment Details
              </h2>
              <p className="text-slate-400 text-xs font-medium">
                Your transactions are secured with 256-bit encryption.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <InputWithLabel<TCheckoutSchema>
                  fieldTitle="Cardholder Name"
                  nameInSchema="cardholderName"
                  type="text"
                  placeholder="Johnathan Sterling"
                  className="rounded-xl mt-1.5 py-5"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <StripeCardInput
                  label="Card Number"
                  error={cardErrors.cardNumber}
                  isFocused={focusedCard === "cardNumber"}
                  icon={CreditCard}
                >
                  <CardNumberElement
                    onChange={(e) => handleCardChange("cardNumber", e)}
                    onFocus={() => setFocusedCard("cardNumber")}
                    onBlur={() => setFocusedCard(null)}
                  />
                </StripeCardInput>
              </div>

              <StripeCardInput
                label="Expiration Date"
                error={cardErrors.cardExpiry}
                isFocused={focusedCard === "cardExpiry"}
                icon={Calendar}
              >
                <CardExpiryElement
                  onChange={(e) => handleCardChange("cardExpiry", e)}
                  onFocus={() => setFocusedCard("cardExpiry")}
                  onBlur={() => setFocusedCard(null)}
                />
              </StripeCardInput>

              <StripeCardInput
                label="CVV Code"
                error={cardErrors.cardCvc}
                isFocused={focusedCard === "cardCvc"}
                icon={Lock}
              >
                <CardCvcElement
                  onChange={(e) => handleCardChange("cardCvc", e)}
                  onFocus={() => setFocusedCard("cardCvc")}
                  onBlur={() => setFocusedCard(null)}
                />
              </StripeCardInput>
            </div>
          </section>
        </div>
      </form>
    </Form>
  );
};

export default function CheckoutForm(props: CheckoutFormProps) {
  return (
    <StripeWrapper>
      <CheckoutFormContent {...props} />
    </StripeWrapper>
  );
}
