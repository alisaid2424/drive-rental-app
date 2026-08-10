import LottieHandler from "@/components/LottieHandler";
import { LayoutGrid, List } from "lucide-react";
import FillterCars from "./_components/FillterCars";
import { Heading } from "@/components/Heading";
import VehicleCard from "@/components/VehicleCard";
import { getVehiclesFilters } from "@/server/db/vehicle";
import PaginationBrowse from "./_components/PaginationBrowse";

type SearchParams = {
  type?: string;
  brand?: string;
  sort?: string;
  available?: string;
  minPrice?: string;
  maxPrice?: string;
  carQuery?: string;
  rentalDate?: string;
  pageNumber: string;
};

const BrowsePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  const page = Number(params.pageNumber) || 1;

  const { vehicles, totalPages } = await getVehiclesFilters(
    {
      carQuery: params.carQuery,
      rentalDate: params.rentalDate,
      types: params.type?.split(","),
      brands: params.brand?.split(","),
      sort: params.sort,
      availableNow: params.available === "true",
      minPrice: Number(params.minPrice) || undefined,
      maxPrice: Number(params.maxPrice) || undefined,
    },
    page,
  );

  return (
    <main className="container-custom py-24 flex flex-col sm:flex-row gap-5">
      {/* Sidebar Filter Area */}
      <FillterCars />

      {/* Main Listing Grid */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <Heading
            title="Premium Fleet"
            subtitle={`${vehicles.length} exclusive vehicles found for your search`}
            align="left"
          />

          <div className="hidden md:flex items-center gap-4">
            <div className="flex border border-slate-200 rounded-full overflow-hidden">
              <button className="p-2.5 bg-rose-50 text-rose-500">
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-slate-300 cursor-pointer hover:text-rose-400 transition-colors">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {vehicles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {vehicles.map((car, index) => (
              <VehicleCard key={index} car={car} />
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xs mx-auto py-5 mb-7">
            <LottieHandler type="empty" message="No Cars Available" />
          </div>
        )}

        <PaginationBrowse
          currentPage={page}
          totalPages={totalPages}
          searchParams={params}
        />
      </section>
    </main>
  );
};

export default BrowsePage;
