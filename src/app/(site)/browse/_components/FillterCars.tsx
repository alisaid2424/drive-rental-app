"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { CarFront } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const MIN_PRICE = 650;
const MAX_PRICE = 1500;
const carTypes = ["Petrol", "Hybrid", "Electric"];
const brandOptions = [
  "Lamborghini",
  "Ferrari",
  "Porsche",
  "Land Rover",
  "Audi",
];

const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

const FillterCars = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [available, setAvailable] = useState(true);
  const [price, setPrice] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  const updateUrl = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("pageNumber", "1");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  // Toggle checkbox
  const toggleItem = (
    item: string,
    currentItems: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>,
    param: string,
  ) => {
    const newItems = currentItems.includes(item)
      ? currentItems.filter((value) => value !== item)
      : [...currentItems, item];

    setItems(newItems);

    updateUrl(param, newItems.length ? newItems.join(",") : undefined);
  };

  // Reset
  const resetFilters = () => {
    setTypes([]);
    setBrands([]);
    setSort("");
    setAvailable(true);
    setPrice([MIN_PRICE, MAX_PRICE]);

    const params = new URLSearchParams();

    if (searchParams.has("carQuery"))
      params.set("carQuery", searchParams.get("carQuery")!);
    if (searchParams.has("rentalDate"))
      params.set("rentalDate", searchParams.get("rentalDate")!);

    router.replace(params.toString() ? `${pathname}?${params}` : pathname);
  };

  return (
    <aside className="w-full sm:w-60 lg:w-68.75 shrink-0 sm:sticky sm:top-20 self-start sm:max-h-[calc(100vh-80px)] sm:overflow-y-auto pb-14">
      <div className="bg-white/40 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl shadow-rose-500/5">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-6 ${
            isOpen ? "border-b border-slate-200 pb-4" : ""
          }`}
        >
          <h3 className="font-bold text-xl text-[#271718]">Filters</h3>

          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setIsOpen((prev) => !prev)}
              className="sm:hidden text-primary font-semibold"
            >
              {isOpen ? "HIDE" : "SHOW"}
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
            isOpen ? "h-auto" : "h-0 sm:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          {/* Car Type */}
          <div className="mb-8">
            <label className="filter-title">Car Type</label>

            <div className="space-y-3">
              {carTypes.map((type) => (
                <CheckboxWithLabel
                  key={type}
                  fieldTitle={type}
                  checked={types.includes(type)}
                  onCheckedChange={() =>
                    toggleItem(type, types, setTypes, "type")
                  }
                />
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="filter-title">Price Range (Daily)</label>

              <span className="text-end text-xs font-bold text-rose-500">
                ${price[0]} - ${price[1]}
                {price[1] === MAX_PRICE && "+"}
              </span>
            </div>

            <Slider
              value={price}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={50}
              onValueChange={(value) => setPrice(value as [number, number])}
              onValueCommit={(value) => {
                updateUrl("minPrice", value[0].toString());

                updateUrl("maxPrice", value[1].toString());
              }}
            />

            <div className="flex justify-between mt-3 text-xs font-bold text-slate-400">
              <span>${MIN_PRICE}</span>
              <span>${MAX_PRICE}+</span>
            </div>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <label className="filter-title">Sort By</label>

            <RadioGroup
              value={sort}
              onValueChange={(value) => {
                setSort(value);
                updateUrl("sort", value);
              }}
              className="space-y-4"
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
                checked={available}
                onCheckedChange={(checked) => {
                  setAvailable(checked);
                  updateUrl("available", checked ? "true" : undefined);
                }}
              />
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="filter-title">Preferred Brands</label>

            <div className="space-y-3">
              {brandOptions.map((brand) => (
                <CheckboxWithLabel
                  key={brand}
                  fieldTitle={brand}
                  checked={brands.includes(brand)}
                  onCheckedChange={() =>
                    toggleItem(brand, brands, setBrands, "brand")
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
