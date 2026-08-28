import Link from "next/link";
import { Pages } from "@/constants/enums";
import { ArrowRight } from "lucide-react";
import LottieHandler from "./LottieHandler";
import VehicleCard from "./VehicleCard";
import { getTopRentedVehicles } from "@/server/db/vehicle";
import LoadMoreContainer from "./LoadMoreList";

const FeaturedFleets = async () => {
  const topVehicles = await getTopRentedVehicles(8);

  return (
    <section className="container-custom py-16">
      <div className="mb-20 flex w-full flex-col items-start justify-between gap-6 md:flex-row">
        <div>
          <h2 className="font-extrabold text-lg mb-3 text-foreground">
            The Featured Fleet
          </h2>

          <p className="max-w-md text-sm text-slate-500">
            Hand-picked selections for your premium experience. Explore our
            exclusive collection of high-performance vehicles.
          </p>
        </div>

        <Link
          href={Pages.BROWSE}
          className="group flex items-center gap-2 font-bold text-primary"
        >
          View Entire Fleet
          <ArrowRight className="group-hover:translate-x-1 w-4 h-4 transition" />
        </Link>
      </div>

      {topVehicles.length ? (
        <LoadMoreContainer
          step={4}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10"
        >
          {topVehicles.map((car, index) => (
            <VehicleCard key={index} car={car} />
          ))}
        </LoadMoreContainer>
      ) : (
        <div className="w-full max-w-xs mx-auto py-5 mb-7">
          <LottieHandler type="empty" message="No Cars Available" />
        </div>
      )}
    </section>
  );
};

export default FeaturedFleets;
