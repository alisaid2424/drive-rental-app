import { ComponentType } from "react";
import { cn } from "@/lib/utils";

interface StripeCardInputProps {
  label: string;
  error?: string;
  isFocused: boolean;
  icon: ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export const StripeCardInput = ({
  label,
  error,
  isFocused,
  icon: Icon,
  children,
}: StripeCardInputProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-slate-900">{label}</label>
      <div
        className={cn(
          "relative mt-1.5 flex items-center rounded-xl border bg-transparent px-4 py-3 shadow-sm transition-colors md:text-sm hover:border-primary",
          isFocused
            ? "outline-none ring-2 ring-primary/30 border-primary"
            : "border-input",
          error && "border-red-500",
        )}
      >
        <div className="grow">{children}</div>
        <Icon className="size-4 text-slate-400 ml-2 shrink-0" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
