"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Car, MapPin } from "lucide-react";

type Props<S> = {
  fieldTitle: React.ReactNode;
  nameInSchema: keyof S & string;
  className?: string;
  showCurrency?: boolean;
  showLocationIcon?: boolean;
  showCarIcon?: boolean;
  showCreditcardIcon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  showCurrency,
  showLocationIcon,
  showCarIcon,
  showCreditcardIcon,
  ...props
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <div className="relative w-full group">
              {showCurrency && props.type === "number" && (
                <>
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    $
                  </span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                    / day
                  </span>
                </>
              )}

              {showLocationIcon && (
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 size-4.5 text-primary pointer-events-none" />
              )}

              {showCreditcardIcon && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-6 bg-slate-900 rounded flex items-center justify-center shadow-sm pointer-events-none">
                  <span className="text-[7px] text-white font-black italic">
                    VISA
                  </span>
                </div>
              )}

              {showCarIcon && (
                <Car className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-primary pointer-events-none group-hover:rotate-6 transition-all" />
              )}

              {props.type === "date" ||
                (props.type === "datetime-local" && (
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-primary pointer-events-none" />
                ))}

              <Input
                id={nameInSchema}
                className={cn(
                  showCurrency && props.type === "number" && "ps-8",
                  props.type === "date" ||
                    (props.type === "datetime-local" && "pe-10"),
                  showLocationIcon && "pe-10",
                  showCarIcon && "pe-10",
                  className,
                )}
                {...props}
                value={field.value ?? ""}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  const value =
                    props.type === "number" && inputValue !== ""
                      ? Number(inputValue)
                      : inputValue;

                  field.onChange(value);
                }}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
