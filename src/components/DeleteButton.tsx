"use client";

import { useTransition, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { confirmDelete } from "@/lib/swal";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
  title?: string;
  description?: string;
  disabled?: boolean;
  currentItemsCount?: number;
  className?: string;
  iconClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  children?: ReactNode;
}

export const DeleteButton = ({
  id,
  onDelete,
  title = "Delete Item?",
  description = "Are you sure you want to delete this item?",
  disabled = false,
  currentItemsCount,
  className,
  iconClassName,
  variant = "outline",
  size = "sm",
  children,
}: DeleteButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentPage = Number(searchParams.get("pageNumber")) || 1;

  const handleDelete = async () => {
    try {
      const confirmed = await confirmDelete(title, description);
      if (!confirmed) return;

      startTransition(async () => {
        const res = await onDelete(id);

        if (res.success) {
          toast.success(res.message);

          const isLastItemOnPage = currentItemsCount === 1;
          if (isLastItemOnPage && currentPage > 1) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("pageNumber", (currentPage - 1).toString());
            router.push(`?${params.toString()}`);
          } else {
            startTransition(() => {
              router.refresh();
            });
          }
        } else {
          toast.error(res.message);
        }
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || isPending}
      onClick={handleDelete}
      title={title}
      className={cn(
        "w-9 h-9 rounded-full border-slate-200 hover:bg-rose-50 hover:border-rose-200 disabled:opacity-50",
        className,
      )}
    >
      {children || (
        <Trash2 className={cn("size-4 text-rose-500", iconClassName)} />
      )}
    </Button>
  );
};
