"use client";

import { useState, ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoadMoreContainerProps {
  children: ReactNode[];
  step?: number;
  className?: string;
  buttonClassName?: string;
}

export default function LoadMoreContainer({
  children,
  step = 3,
  className = "",
  buttonClassName,
}: LoadMoreContainerProps) {
  const [visibleCount, setVisibleCount] = useState(step);

  const displayedChildren = children.slice(0, visibleCount);
  const hasMore = visibleCount < children.length;

  return (
    <>
      <div className={className}>{displayedChildren}</div>

      {hasMore && (
        <div className="flex justify-center mt-20 w-full">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => prev + step)}
            className={cn(
              "border-2 border-primary py-5 text-primary hover:bg-primary hover:text-white transition-colors min-w-40   font-bold uppercase ",
              buttonClassName,
            )}
          >
            Show More
          </Button>
        </div>
      )}
    </>
  );
}
