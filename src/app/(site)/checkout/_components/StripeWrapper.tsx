"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY!);

export const StripeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        locale: "en",
        appearance: {
          theme: "stripe",
        },
      }}
    >
      {children}
    </Elements>
  );
};
