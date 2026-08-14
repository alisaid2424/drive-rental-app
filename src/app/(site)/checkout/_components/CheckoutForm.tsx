"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { checkoutSchema, TCheckoutSchema } from "@/zod-schemas/checkout";
import { User } from "@prisma/client";
import { useDispatchFormStatus } from "@/hooks/useFormStatus";

const CheckoutForm = ({ user }: { user: User }) => {
  const form = useForm<TCheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user.name ?? "",
      email: user.email ?? "",
      phone: "",
      licenseId: "",
      cardholderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  const { isSubmitting } = form.formState;

  useDispatchFormStatus("form-checkout-submitting", isSubmitting);

  const onSubmit = async (data: TCheckoutSchema) => {
    console.log("Checkout booking confirmed:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="confirm-booking-form"
        className="grow max-w-4xl"
      >
        <div className="space-y-8">
          {/* Section 1: Driver Details */}
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

          {/* Section 2: Payment Method */}
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
                <InputWithLabel<TCheckoutSchema>
                  fieldTitle="Card Number"
                  nameInSchema="cardNumber"
                  type="text"
                  placeholder="4111 2222 3333 4421"
                  className="rounded-xl mt-1.5 pr-14 py-5"
                  showCreditcardIcon
                />
              </div>

              <InputWithLabel<TCheckoutSchema>
                fieldTitle="Expiration Date"
                nameInSchema="expirationDate"
                type="text"
                placeholder="MM/YY"
                className="rounded-xl mt-1.5 py-5"
              />

              <InputWithLabel<TCheckoutSchema>
                fieldTitle="CVV Code"
                nameInSchema="cvv"
                type="password"
                placeholder="•••"
                className="rounded-xl mt-1.5 py-5"
                maxLength={3}
              />
            </div>
          </section>
        </div>
      </form>
    </Form>
  );
};
export default CheckoutForm;
