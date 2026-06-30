import { carsall } from "@/constants/data";
import { Pages } from "@/constants/enums";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gauge, Fuel, Cog, Zap } from "lucide-react";
import CarImagesView from "./_components/CarImagesView";
import VehicleCard from "@/components/VehicleCard";
import BookingForm from "./_components/BookingForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const CarDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const car = carsall.find((c) => c.id === id);

  if (!car) {
    notFound();
  }

  const specs = [
    {
      title: "Fuel",
      value: car.specs.fuel,
      icon: Fuel,
    },
    {
      title: "Power",
      value: car.specs.power,
      icon: Zap,
    },
    {
      title: "Transmission",
      value: car.specs.transmission,
      icon: Cog,
    },
    {
      title: "Top Speed",
      value: car.specs.topSpeed,
      icon: Gauge,
    },
  ];

  return (
    <section className="pt-28">
      <div className="container-custom">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-[9px] font-black tracking-widest uppercase">
              Elite Class
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-sm font-bold">
              <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
              4.9 (128 Reviews)
            </span>
          </div>
          <h2 className="text-3xl mb-2 font-black tracking-tight text-slate-900 uppercase leading-none">
            {car.name}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-medium">
            {car.description}
          </p>
        </div>

        {/* Gallery Section */}
        <CarImagesView images={car.images} carName={car.name} />

        {/* Product Content */}
        <div className="py-14 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Specs & Features */}
            <div className="lg:col-span-2 space-y-10">
              {/* Features List */}
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Premium Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {car.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 bg-white rounded-xl p-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500" />

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info - Simple List */}
              <div className="bg-white rounded-2xl p-6 shadow space-y-3">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
                  Vehicle Details
                </h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li>
                    <span className="font-semibold">Seats:</span>{" "}
                    {car.specs.seats}
                  </li>
                  <li>
                    <span className="font-semibold">Transmission:</span>{" "}
                    {car.specs.transmission}
                  </li>
                  <li>
                    <span className="font-semibold">Fuel Type:</span>{" "}
                    {car.specs.fuel}
                  </li>
                  <li>
                    <span className="font-semibold">Power:</span>{" "}
                    {car.specs.power}
                  </li>
                  <li>
                    <span className="font-semibold">Top Speed:</span>{" "}
                    {car.specs.topSpeed}
                  </li>
                  <li>
                    <span className="font-semibold">Bookings:</span>{" "}
                    {car.bookings}
                  </li>
                  <li>
                    <span className="font-semibold">Revenue:</span>{" "}
                    {car.revenue}
                  </li>
                  <li>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={
                        car.status === "Available"
                          ? "text-green-500"
                          : "text-rose-500"
                      }
                    >
                      {car.status}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Specs Bento Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="bg-white rounded-2xl p-5 shadow"
                    >
                      <Icon className="w-6 h-6 text-rose-500 mb-3" />

                      <p className="text-xs text-gray-500">{item.title}</p>

                      <p className="font-bold">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Booking Form - Perfect Pixel Match */}
            <BookingForm pricePerDay={car.pricePerDay} />
          </div>
        </div>
      </div>

      {/* Related Cars Section */}
      <div className="bg-slate-50/50 py-14 border-t border-slate-100">
        <div className="container-custom space-y-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                Related Experiences
              </h2>
              <p className="text-slate-400 mt-1 text-sm font-medium">
                Explore other vehicles from our premium collection
              </p>
            </div>

            <Link
              href={Pages.BROWSE}
              className="group flex items-center gap-2 font-bold text-primary"
            >
              View Full Fleet
              <ArrowRight className="group-hover:translate-x-1 w-4 h-4 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsall.slice(0, 3).map((car: any, index: number) => (
              <VehicleCard key={index} car={car} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;
