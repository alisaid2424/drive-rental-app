"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-600" />,
        info: <InfoIcon className="size-4 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-600" />,
        error: <OctagonXIcon className="size-4 text-red-600" />,
        loading: (
          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-full flex items-center gap-3 p-4 rounded-[var(--radius)] border text-sm shadow-md",
          title: "font-medium",
          description: "text-xs opacity-90",

          success: "bg-green-100 text-green-600 border-green-200",
          error: "bg-red-100 text-red-600 border-red-200",
          info: "bg-blue-100 text-blue-600 border-blue-200",
          warning: "bg-amber-100 text-amber-800 border-amber-200",

          default:
            "bg-[var(--popover)] text-[var(--popover-foreground)] border-[var(--border)]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
