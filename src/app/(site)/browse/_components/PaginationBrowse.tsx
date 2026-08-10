import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

const PaginationBrowse = ({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    params.set("pageNumber", page.toString());

    return `?${params.toString()}`;
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <Link
        href={isFirst ? "#" : createPageURL(currentPage - 1)}
        className={cn(
          "p-2.5 rounded-xl border border-slate-200 transition-colors",
          isFirst
            ? "cursor-not-allowed opacity-40 bg-slate-50"
            : "hover:bg-rose-50",
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Pages */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={cn(
              "w-10 h-10 font-medium text-sm flex items-center justify-center rounded-xl border transition-all",
              currentPage === page
                ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20"
                : "border-slate-200 text-slate-600 hover:bg-rose-50",
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next */}
      <Link
        href={isLast ? "#" : createPageURL(currentPage + 1)}
        className={cn(
          "p-2.5 rounded-xl border border-slate-200 transition-colors",
          isLast
            ? "cursor-not-allowed opacity-40 bg-slate-50"
            : "hover:bg-rose-50",
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
};

export default PaginationBrowse;
