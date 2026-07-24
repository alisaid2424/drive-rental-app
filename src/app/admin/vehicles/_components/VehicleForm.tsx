"use client";

import { useForm, Path, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Info,
  Settings2,
  Image as ImageIcon,
  CreditCard,
  LoaderCircle,
  ArrowRightCircle,
} from "lucide-react";

import { Heading } from "@/components/Heading";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { toast } from "sonner";
import { Routes } from "@/constants/enums";
import {
  CreateVehicleSchema,
  UpdateVehicleSchema,
} from "@/zod-schemas/car/vehicle";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import ImageUploadSlot from "./ImageUploadSlot";
import Link from "next/link";
import { Vehicle } from "@prisma/client";
import { vehicleAction } from "@/server/actions/vehicle";

const VehicleForm = ({ vehicle }: { vehicle?: Vehicle }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isUpdate = Boolean(vehicle);
  const schema = isUpdate ? UpdateVehicleSchema : CreateVehicleSchema;
  type SchemaType = z.infer<typeof schema>;

  const fuelTypes = [
    { id: "Petrol", name: "Petrol" },
    { id: "Hybrid", name: "Hybrid" },
    { id: "Electric", name: "Electric" },
  ];

  const defaultValues: Partial<SchemaType> = {
    id: vehicle?.id,
    brand: vehicle?.brand ?? "",
    name: vehicle?.name ?? "",
    type: vehicle?.type ?? "",
    pricePerDay: vehicle?.pricePerDay ?? 0,
    description: vehicle?.description ?? "",
    seats: vehicle?.seats ?? 2,
    transmission: vehicle?.transmission ?? "",
    fuel: vehicle?.fuel ?? "Petrol",
    power: vehicle?.power ?? "",
    topSpeed: vehicle?.topSpeed ?? "",
    features: vehicle?.features ? vehicle.features.join(", ") : "",
    images: vehicle
      ? [...vehicle.images, null, null, null].slice(0, 3)
      : [null, null, null],
  };

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues,
  });

  const {
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
  } = form;

  const images = useWatch({
    control: form.control,
    name: "images",
  }) as (File | string | null)[];

  const submitForm = (data: SchemaType) => {
    startTransition(async () => {
      try {
        const res = await vehicleAction(data, isUpdate ? "update" : "create");
        if (res.status === 200 || res.status === 201) {
          toast.success(res.message);

          router.push(`${Routes.LISTVEHICLES}?pageNumber=1`);
          scrollTo(0, 0);
        } else if (res.status === 400 && res.error) {
          Object.entries(res.error).forEach(([field, message]) => {
            setError(field as keyof SchemaType, {
              type: "server",
              message: message as string,
            });
          });
          toast.error("Please fix the highlighted fields.");
        } else {
          toast.error(res.message);
        }
      } catch {
        toast.error("Unexpected error occurred");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-8 pb-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-5 lg:pt-0">
          <Heading
            title={isUpdate ? "Edit Vehicle" : "Add New Vehicle"}
            subtitle="Expand your luxury fleet with the world's most prestigious automobiles."
            align="left"
          />

          <Link
            href={`${Routes.LISTVEHICLES}?pageNumber=1`}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 transition-all text-white text-xs md:text-sm sm:text-base rounded-full w-fit py-2 px-3 ms-auto"
          >
            Back to Vehicles <ArrowRightCircle size={24} />
          </Link>
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 gap-6">
            {/* Left Column: Form Details */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Vehicle Identification */}
              <section className="glass-panel p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">Vehicle Identification</h3>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <InputWithLabel<SchemaType>
                    fieldTitle="Vehicle Brand"
                    nameInSchema="brand"
                    placeholder="e.g. Lamborghini"
                    className="mt-1.5"
                  />
                  <InputWithLabel<SchemaType>
                    fieldTitle="Full Car Name"
                    nameInSchema="name"
                    placeholder="e.g. Lamborghini Revuelto"
                    className="mt-1.5"
                  />
                  <InputWithLabel<SchemaType>
                    fieldTitle="Vehicle Category / Type"
                    nameInSchema="type"
                    placeholder="e.g. V12 Hybrid Hypercar"
                    className="mt-1.5"
                  />
                  <SelectWithLabel<SchemaType>
                    fieldTitle="Fuel / Energy Type"
                    nameInSchema="fuel"
                    data={fuelTypes}
                    className="mt-1.5"
                  />
                </div>
              </section>

              {/* Technical Specifications */}
              <section className="glass-panel space-y-5 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">
                    Technical Specifications (Specs)
                  </h3>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                  <InputWithLabel<SchemaType>
                    fieldTitle="Seats"
                    nameInSchema="seats"
                    type="number"
                    placeholder="2"
                    className="mt-1.5"
                  />
                  <InputWithLabel<SchemaType>
                    fieldTitle="Transmission"
                    nameInSchema="transmission"
                    placeholder="e.g. 8-Speed DCT"
                    className="mt-1.5"
                  />
                  <InputWithLabel<SchemaType>
                    fieldTitle="Power Output"
                    nameInSchema="power"
                    placeholder="e.g. 1015 CV / 584 hp"
                    className="mt-1.5"
                  />
                  <InputWithLabel<SchemaType>
                    fieldTitle="Top Speed"
                    nameInSchema="topSpeed"
                    placeholder="e.g. 350+ km/h"
                    className="mt-1.5"
                  />
                </div>

                <InputWithLabel<SchemaType>
                  fieldTitle="Features (Separate with commas)"
                  nameInSchema="features"
                  placeholder="e.g. Carbon Fiber Monocoque, Bespoke Audio, DRS System"
                  className="mt-1.5"
                />

                <TextAreaWithLabel<SchemaType>
                  fieldTitle="Description"
                  nameInSchema="description"
                  placeholder="Describe the driving experience..."
                  rows={4}
                  className="mt-1.5"
                />
              </section>
            </div>

            {/* Right Column: Media & Pricing */}
            <div className="lg:col-span-2 xl:col-span-1 flex flex-col gap-8">
              {/* Media Assets */}
              <section className="glass-panel p-6 lg:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">Media Assets (3 Images)</h3>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  {images.map((img, index) => (
                    <ImageUploadSlot
                      key={index}
                      img={img}
                      index={index}
                      onChange={(file) =>
                        setValue(`images.${index}` as Path<SchemaType>, file)
                      }
                    />
                  ))}
                </div>

                {errors.images && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.images.message}
                  </p>
                )}
              </section>

              {/* Rental Rate */}
              <section className="glass-panel p-6 lg:p-8">
                <InputWithLabel<SchemaType>
                  fieldTitle={
                    <div className="flex items-center gap-2 text-slate-800">
                      <CreditCard className="w-5 h-5 text-rose-500" />
                      <span className="font-semibold text-base">
                        Price Per Day
                      </span>
                    </div>
                  }
                  nameInSchema="pricePerDay"
                  type="number"
                  placeholder="0.00"
                  showCurrency
                  className="mt-2"
                />
              </section>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-5 max-w-sm w-full ml-auto pe-5">
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.back()}
              className="basis-1/2 px-10 py-6 rounded-full"
            >
              Cancel
            </Button>

            <Button
              disabled={isPending}
              type="submit"
              className="basis-1/2 rounded-full py-6"
            >
              {isPending ? (
                <>
                  Saving Fleet...
                  <LoaderCircle className="ml-2 animate-spin" size={18} />
                </>
              ) : isUpdate ? (
                "Update Vehicle"
              ) : (
                "Save Vehicle"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default VehicleForm;
