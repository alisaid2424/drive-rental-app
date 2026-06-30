"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { LoaderCircle, Search } from "lucide-react";
import {
  searchCarRentalSchema,
  TSearchCarRentalSchema,
} from "@/zod-schemas/car/searchCarRental";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { useTransition } from "react";

const FormSearchCarRental = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TSearchCarRentalSchema>({
    resolver: zodResolver(searchCarRentalSchema),

    defaultValues: {
      carQuery: "",
      rentalDate: "",
    },
  });

  const onSubmit = (data: TSearchCarRentalSchema) => {
    startTransition(async () => {
      console.log(data);
    });
  };

  return (
    <div className="glass-card mt-5 md:mt-12 w-full max-w-5xl rounded-[32px] p-2 shadow-2xl shadow-black/10 md:rounded-[40px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex flex-col gap-4 rounded-[24px] bg-white p-6 md:flex-row md:gap-6 md:rounded-[32px] md:p-8 ${
            Object.keys(form.formState.errors).length > 0
              ? "items-center"
              : "items-end"
          }`}
        >
          <div
            className={`flex-1 w-full text-start ${
              Object.keys(form.formState.errors).length > 0 && "self-start"
            }`}
          >
            <InputWithLabel<TSearchCarRentalSchema>
              fieldTitle="SEARCH CAR OR BRAND"
              nameInSchema="carQuery"
              placeholder="Lamborghini, Porsche, SF90..."
              className="h-12 mt-1 text-sm text-primary rounded-xl font-medium caret-primary placeholder:text-primary"
              showCarIcon
            />
          </div>

          <div className="flex-1 w-full text-start">
            <InputWithLabel<TSearchCarRentalSchema>
              fieldTitle="RENTAL DATE"
              nameInSchema="rentalDate"
              type="datetime-local"
              className="h-12 mt-1 text-sm text-primary font-medium rounded-xl"
            />
          </div>

          <div className="w-full md:w-auto max-md:mt-3">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-xl text-sm px-10 py-6 shadow-lg w-full"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Search...
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  FIND A CAR
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormSearchCarRental;
