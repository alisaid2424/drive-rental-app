import LottieHandler from "@/components/LottieHandler";
import { ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";
import FillterCars from "./_components/FillterCars";
import { Heading } from "@/components/Heading";
import VehicleCard from "@/components/VehicleCard";
import { getVehicles } from "@/server/db/vehicle";

const BrowsePage = async () => {
  const allVehicles = await getVehicles();
  return (
    <main className="container-custom py-24 flex flex-col sm:flex-row gap-3">
      {/* Sidebar Filter Area */}
      <FillterCars />

      {/* Main Listing Grid */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <Heading
            title="Premium Fleet"
            subtitle={`${allVehicles.length} exclusive vehicles found for your search`}
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

        {allVehicles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allVehicles.map((car, index) => (
              <VehicleCard key={index} car={car} />
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xs mx-auto py-5 mb-7">
            <LottieHandler type="empty" message="No Cars Available" />
          </div>
        )}

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-rose-500 text-white font-black text-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-rose-50 transition-colors font-bold text-sm text-slate-600">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-rose-50 transition-colors font-bold text-sm text-slate-600">
            3
          </button>
          <span className="px-2 text-slate-300 text-sm font-bold">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-rose-50 transition-colors font-bold text-sm text-slate-600">
            8
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default BrowsePage;
