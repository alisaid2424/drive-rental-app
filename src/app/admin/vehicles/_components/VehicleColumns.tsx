import { Column } from "@/components/AdminTable";
import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import { deleteVehicle } from "@/server/actions/vehicle";
import { VehicleWithBookings } from "@/types/vehicle";
import { CheckCircle2, Clock3, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const vehicleColumns: Column<VehicleWithBookings>[] = [
  {
    header: "No",
    headerClassName: "text-center w-12",
    cellClassName: "text-center font-bold text-slate-600 text-xs",
    cell: (_, index) => index,
  },
  {
    header: "Image",
    headerClassName: "px-8",
    cellClassName: "px-8",
    cell: (car) => (
      <div className="w-24 h-14 rounded-xl overflow-hidden border border-border relative">
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    ),
  },
  {
    header: "Car Model",
    cell: (car, index) => (
      <div>
        <div className="font-semibold text-foreground">{car.name}</div>
        <div className="text-xs text-muted-foreground">VIN: PX7720-{index}</div>
      </div>
    ),
  },
  {
    header: "Category",
    cellClassName: "text-sm text-muted-foreground font-medium",
    cell: (car) => car.type,
  },
  {
    header: "Price / Day",
    headerClassName: "px-3 text-center",
    cellClassName: "px-3 text-center font-semibold text-foreground",
    cell: (car) => `$${car.pricePerDay}`,
  },
  {
    header: "Status",
    headerClassName: "text-center px-8",
    cellClassName: "text-center px-8",
    cell: (car) => {
      const isBooked = car.bookings.length > 0;
      return isBooked ? (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
          <Clock3 className="w-3 h-3" /> On Rental
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" /> Available
        </span>
      );
    },
  },
  {
    header: "Actions",
    headerClassName: "text-center px-8",
    cellClassName: "text-center px-8",
    cell: (car, _, totalCurrentItems) => (
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

        <DeleteButton
          id={car.id}
          onDelete={deleteVehicle}
          disabled={car.bookings.length > 0}
          title="Delete Vehicle?"
          description="Are you sure you want to delete this vehicle?"
          currentItemsCount={totalCurrentItems}
        />
      </div>
    ),
  },
];
