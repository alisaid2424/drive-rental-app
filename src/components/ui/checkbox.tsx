"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // base
        "peer grid size-4.5 shrink-0 place-content-center rounded-[5px] border transition-colors",

        // colors
        "border-input bg-background text-primary",

        // states
        "hover:border-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        "data-[state=checked]:border-primary",
        "data-[state=checked]:bg-primary",
        "data-[state=checked]:text-primary-foreground",

        // disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
