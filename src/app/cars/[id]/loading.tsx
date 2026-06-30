import { Gauge, Fuel, Cog, Zap } from "lucide-react";

const CarDetailsLoading = () => {
  return (
    <section className="pt-28 animate-pulse">
      <div className="container-custom">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Elite Class Badge */}
            <div className="w-20 h-6 rounded-full bg-slate-200" />
            {/* Rating */}
            <div className="w-28 h-5 rounded-md bg-slate-200" />
          </div>

          {/* Car Name */}
          <div className="w-full max-w-md h-10 rounded-md bg-slate-200" />

          {/* Car Description */}
          <div className="space-y-2 max-w-2xl">
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Gallery Section Skeleton */}
        <div className="pt-4">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 h-100">
            {/* Main Image */}
            <div className="col-span-3 md:col-span-2 md:row-span-2 h-75 md:h-full rounded-3xl bg-slate-200" />

            {/* Thumbnails */}
            <div className="h-22.5 md:h-50 rounded-3xl bg-slate-200" />
            <div className="h-22.5 md:h-50 rounded-3xl bg-slate-200" />
            <div className="h-22.5 md:h-50 rounded-3xl bg-slate-200 md:col-span-2" />
          </div>
        </div>

        {/* Product Content */}
        <div className="py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Premium Features */}
              <div className="space-y-8">
                <div className="w-56 h-8 rounded bg-slate-200" />

                <div className="grid md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-4"
                    >
                      <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
                      <div className="w-full h-4 bg-slate-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                <div className="w-40 h-7 rounded bg-slate-200 mb-2" />

                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-1"
                  >
                    <div className="w-24 h-4 bg-slate-200 rounded" />
                    <div className="w-16 h-4 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>

              {/* Specs Bento Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[Fuel, Zap, Cog, Gauge].map((Icon, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                  >
                    <Icon className="w-6 h-6 text-slate-200 mb-3" />
                    <div className="w-12 h-3 rounded bg-slate-200 mb-2" />
                    <div className="w-20 h-5 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg h-fit space-y-8">
              {/* Header inside Card */}
              <div className="flex items-end justify-between flex-wrap gap-3">
                <div>
                  <div className="w-24 h-3 bg-slate-200 rounded uppercase" />
                  <div className="w-20 h-9 bg-slate-200 rounded mt-2" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="w-24 h-6 rounded-full bg-slate-200" />
                  <div className="w-28 h-3 bg-slate-200 rounded" />
                </div>
              </div>

              {/* Availability (Inputs) */}
              <div className="space-y-4">
                <div className="w-36 h-4 bg-slate-200 rounded" />
                <div className="space-y-4">
                  <div className="h-12 rounded-2xl bg-slate-200 w-full" />
                  <div className="h-12 rounded-2xl bg-slate-200 w-full" />
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex justify-between">
                  <div className="w-24 h-4 bg-slate-200 rounded" />
                  <div className="w-12 h-4 bg-slate-200 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="w-16 h-4 bg-slate-200 rounded" />
                  <div className="w-10 h-4 bg-slate-200 rounded" />
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div className="w-12 h-6 bg-slate-200 rounded" />
                  <div className="w-20 h-8 bg-slate-200 rounded" />
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full h-14 rounded-xl bg-slate-200" />

              {/* Footer Trust badge */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-200" />
                <div className="w-56 h-3 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cars Section */}
      <div className="bg-slate-50/50 py-20 border-t border-slate-100">
        <div className="container-custom space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="w-56 h-8 rounded bg-slate-200" />
              <div className="w-80 h-4 rounded bg-slate-200" />
            </div>
            <div className="w-28 h-5 rounded bg-slate-200" />
          </div>

          {/* Related Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
              >
                <div className="h-60 bg-slate-200 w-full" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsLoading;
