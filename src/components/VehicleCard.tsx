import { Fuel, Gauge, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Vehicle } from "@prisma/client";

const VehicleCard = ({ car }: { car: Vehicle }) => {
  return (
    <Link
      href={`/cars/${car.id}`}
      key={car.id}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-1.5 transition-all duration-500"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          alt={car.name}
          src={car.images[0]}
          fill
          priority
          loading="eager"
        />
        <div className="absolute top-4 left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wide text-slate-600 shadow-sm">
          {car.type || "Premium"}
        </div>
        <button className="absolute top-4 right-3 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 transition-all active:scale-90 cursor-pointer">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold mb-0.5 group-hover:text-rose-600 transition-colors uppercase tracking-tight leading-tight italic line-clamp-1">
              {car.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {car.brand}
            </p>
          </div>
          <div className="text-right">
            <span className="text-primary font-black text-xl italic tracking-tighter leading-none">
              ${car.pricePerDay}
            </span>
            <span className="text-[10px] font-black text-slate-300 block uppercase tracking-[0.2em] mt-0.5">
              /day
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-8">
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors">
            <Users className="w-5 h-5 text-rose-400 mb-1" />
            <span className="text-[10px] font-black text-slate-500 uppercase">
              {car.seats} Seats
            </span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors">
            <Gauge className="w-5 h-5 text-rose-400 mb-1" />
            <span className="text-[10px] font-black text-slate-500 uppercase">
              Auto
            </span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors">
            <Fuel className="w-5 h-5 text-rose-400 mb-1" />
            <span className="text-[10px] font-black text-slate-500 uppercase">
              {car.fuel}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-2 border-rose-300 text-primary hover:bg-rose-500 hover:text-white transition-all duration-300 text-xs uppercase"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
};

export default VehicleCard;
