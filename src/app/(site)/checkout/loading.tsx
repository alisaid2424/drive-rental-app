import { ShieldCheck } from "lucide-react";

const CheckoutLoading = () => {
  return (
    <section className="container-custom pt-28 pb-20 flex flex-col lg:flex-row gap-8 animate-pulse">
      {/* Left Column: Checkout Form Skeleton */}
      <div className="grow max-w-4xl space-y-8">
        {/* Section 1: Driver Details Skeleton */}
        <div className="bg-slate-100/50 p-10 rounded-[2.5rem] border border-slate-200/60">
          <header className="mb-5 space-y-2">
            <div className="w-48 h-7 bg-slate-200 rounded-md" />
            <div className="w-64 h-3.5 bg-slate-200/80 rounded" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-24 h-3 bg-slate-200 rounded" />
                <div className="h-12 bg-slate-200 rounded-xl mt-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Payment Method Skeleton */}
        <div className="bg-slate-100/50 p-10 rounded-[2.5rem] border border-slate-200/60">
          <header className="mb-5 space-y-2">
            <div className="w-40 h-7 bg-slate-200-md rounded" />
            <div className="w-72 h-3.5 bg-slate-200/80 rounded" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cardholder Name */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <div className="w-28 h-3 bg-slate-200 rounded" />
              <div className="h-12 bg-slate-200 rounded-xl mt-1.5" />
            </div>

            {/* Card Number */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <div className="w-24 h-3 bg-slate-200 rounded" />
              <div className="h-12 bg-slate-200 rounded-xl mt-1.5" />
            </div>

            {/* Expiration Date */}
            <div className="space-y-2">
              <div className="w-24 h-3 bg-slate-200 rounded" />
              <div className="h-12 bg-slate-200 rounded-xl mt-1.5" />
            </div>

            {/* CVV */}
            <div className="space-y-2">
              <div className="w-16 h-3 bg-slate-200 rounded" />
              <div className="h-12 bg-slate-200 rounded-xl mt-1.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary Skeleton */}
      <aside className="w-full lg:w-105">
        <div className="bg-slate-100/50 p-10 rounded-[2.5rem] border border-slate-200/60 flex flex-col">
          {/* Car Image Preview Skeleton */}
          <div className="mb-8 rounded-[1.5rem] h-52 relative bg-slate-200 overflow-hidden flex items-end p-5">
            <div className="space-y-2 z-10">
              <div className="w-44 h-6 bg-slate-300 rounded" />
              <div className="w-32 h-3 bg-slate-300/80 rounded" />
            </div>
          </div>

          {/* Pricing Breakdown Skeleton */}
          <div className="space-y-4 mb-8 pe-2">
            <div className="flex justify-between items-center">
              <div className="w-24 h-3 bg-slate-200 rounded" />
              <div className="w-14 h-4 bg-slate-200 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-28 h-3 bg-slate-200 rounded" />
              <div className="w-12 h-4 bg-slate-200 rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="w-20 h-3 bg-slate-200 rounded" />
              <div className="w-10 h-4 bg-slate-200 rounded" />
            </div>

            <div className="h-px bg-slate-200 w-full my-3" />

            <div className="flex justify-between items-center">
              <div className="w-12 h-4 bg-slate-200 rounded" />
              <div className="w-20 h-7 bg-slate-300 rounded" />
            </div>
          </div>

          {/* Trust Badge Skeleton */}
          <div className="bg-slate-200/40 px-6 py-4 rounded-xl mb-8 flex items-start gap-4 border border-slate-200/40">
            <ShieldCheck className="h-5 w-5 text-slate-200 shrink-0" />
            <div className="space-y-1.5 w-full">
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-full h-14 rounded-xl bg-slate-200" />

          {/* Terms text Skeleton */}
          <div className="space-y-1.5 mt-8 px-4 flex flex-col items-center">
            <div className="w-full h-2.5 bg-slate-200/80 rounded" />
            <div className="w-3/4 h-2.5 bg-slate-200/80 rounded" />
          </div>
        </div>
      </aside>
    </section>
  );
};

export default CheckoutLoading;
