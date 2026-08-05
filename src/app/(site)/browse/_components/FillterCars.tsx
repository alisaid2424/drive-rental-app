"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { CarFront } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const FillterCars = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [openFillters, setOpenFillters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [availableNow, setAvailableNow] = useState(true);

  const carTypes = ["Luxury", "SUV", "Sedan", "Convertible"];
  const brands = ["Porsche", "Tesla", "Mercedes-Benz"];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const toggleSelection = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSelectedSortOption("");
    setAvailableNow(false);

    router.push(pathname);
  };

  return (
    <aside className="w-full sm:w-60 lg:w-68.75 shrink-0 sm:sticky sm:top-20 self-start sm:max-h-[calc(100vh-80px)] sm:overflow-y-auto pb-14">
      <div className="bg-white/40 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl shadow-rose-500/5">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-6 ${
            openFillters ? "border-b border-slate-200 pb-4" : ""
          }`}
        >
          <h3 className="font-bold text-xl text-[#271718]">Filters</h3>

          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFillters((prev) => !prev)}
              className="sm:hidden text-primary font-semibold"
            >
              {openFillters ? "HIDE" : "SHOW"}
            </span>

            <span
              onClick={resetFilters}
              className="hidden sm:block text-primary font-semibold uppercase tracking-widest"
            >
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`${
            openFillters ? "h-auto" : "h-0 sm:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          {/* Price Range */}
          <div className="mb-8">
            <label className="block mb-4 uppercase text-slate-400 tracking-widest text-[10px] font-black">
              Price Range (Daily)
            </label>

            <div className="relative h-2 bg-slate-100 rounded-full mb-4">
              <div className="absolute h-full w-2/3 left-0 bg-rose-500 rounded-full" />
              <div className="absolute w-5 h-5 bg-white border-2 border-rose-500 rounded-full -top-1.5 left-0 shadow-md cursor-pointer" />
              <div className="absolute w-5 h-5 bg-white border-2 border-rose-500 rounded-full -top-1.5 left-[66%] shadow-md cursor-pointer" />
            </div>

            <div className="flex justify-between text-sm font-bold text-slate-500">
              <span>$50</span>
              <span>$1,200+</span>
            </div>
          </div>

          {/* Car Type */}
          <div className="mb-8">
            <label className="block mb-4 uppercase text-slate-400 tracking-widest text-[10px] font-black">
              Car Type
            </label>

            <div className="space-y-3">
              {carTypes.map((type) => (
                <CheckboxWithLabel
                  key={type}
                  fieldTitle={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() =>
                    toggleSelection(type, setSelectedTypes)
                  }
                />
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <label className="block mb-4 uppercase text-slate-400 tracking-widest text-[10px] font-black">
              Sort By
            </label>

            <RadioGroup
              value={selectedSortOption}
              onValueChange={setSelectedSortOption}
              className="flex flex-col gap-4"
            >
              {sortOptions.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`sort-car-${idx}`} />

                  <Label
                    htmlFor={`sort-car-${idx}`}
                    className="cursor-pointer text-sm text-slate-700"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Availability */}
          <div className="mb-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">
                Available Now
              </span>

              <Switch
                checked={availableNow}
                onCheckedChange={(checked) => setAvailableNow(checked)}
              />
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="block mb-4 uppercase text-slate-400 tracking-widest text-[10px] font-black">
              Preferred Brands
            </label>

            <div className="space-y-3">
              {brands.map((brand) => (
                <CheckboxWithLabel
                  key={brand}
                  fieldTitle={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() =>
                    toggleSelection(brand, setSelectedBrands)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Card */}
      <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden mt-6">
        <div className="relative z-10">
          <h4 className="text-lg font-bold mb-2">Summer Drive Special</h4>

          <p className="text-xs text-rose-100 mb-6 leading-relaxed">
            Enjoy 15% off on all luxury SUVs this month.
          </p>

          <Button className="bg-white text-rose-600 font-bold text-sm hover:bg-rose-50 transition-colors uppercase tracking-wider">
            Claim Offer
          </Button>
        </div>

        <div className="absolute -right-4 -bottom-4 opacity-10">
          <CarFront className="w-32 h-32" />
        </div>
      </div>
    </aside>
  );
};

export default FillterCars;
