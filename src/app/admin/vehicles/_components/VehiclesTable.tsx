import { Pencil, CheckCircle2, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/constants/enums";
import DeleteVehicleButton from "./DeleteVehicleButton";
import PaginationAdmin from "../../_components/PaginationAdmin";
import { VehicleWithBookings } from "@/types/vehicle";

type VehiclesTableProps = {
  vehicles: VehicleWithBookings[];
  showPagenation?: boolean;
  totalCount?: number;
  totalPages?: number;
};

const VehiclesTable = ({
  vehicles,
  showPagenation = true,
  totalCount,
  totalPages,
}: VehiclesTableProps) => {
  return (
    <div className="bg-white/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/60 shadow-xl shadow-rose-500/5">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="bg-accent text-black">
              <th className="px-8 py-5 text-sm font-semibold text-slate-600">
                Image
              </th>

              <th className="px-8 py-5 text-sm font-semibold text-slate-600">
                Car Model
              </th>

              <th className="px-8 py-5 text-sm font-semibold text-slate-600">
                Category
              </th>

              <th className="px-8 py-5 text-sm font-semibold text-slate-600">
                Price / Day
              </th>

              <th className="px-8 py-5 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-8 py-5 text-sm font-semibold text-center text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border/50">
            {vehicles.map((car, index) => (
              <tr key={index} className="hover:bg-accent/50 transition-colors">
                {/* Image */}
                <td className="px-8 py-4">
                  <div className="w-24 h-14 rounded-xl overflow-hidden border border-border">
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      width={200}
                      height={200}
                      loading="eager"
                      priority
                    />
                  </div>
                </td>

                {/* Car */}
                <td className="px-8 py-4">
                  <div className="font-semibold text-foreground">
                    {car.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    VIN: PX7720-{index}
                  </div>
                </td>

                {/* Category */}
                <td className="px-8 py-4 text-sm text-muted-foreground font-medium">
                  {car.type}
                </td>

                {/* Price */}
                <td className="px-8 py-4 font-semibold text-foreground">
                  ${car.pricePerDay}
                </td>

                {/* Status */}
                <td className="px-8 py-4">
                  {car.bookings.length > 0 ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                      <Clock3 className="w-3 h-3" />
                      On Rental
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Available
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`${Routes.LISTVEHICLES}/${car.id}/edit`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-9 h-9 rounded-full border-slate-200 hover:bg-green-50 hover:border-green-200"
                      >
                        <Pencil className="size-4 text-green-500" />
                      </Button>
                    </Link>

                    <DeleteVehicleButton
                      VehicleId={car.id}
                      isBooked={car.bookings.length > 0}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagenation && (
        <PaginationAdmin
          totalPages={totalPages}
          totalCount={totalCount}
          currentCount={vehicles.length}
          itemName="Vehicles"
        />
      )}
    </div>
  );
};

export default VehiclesTable;
