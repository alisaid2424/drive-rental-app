"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TableType } from "@/components/AdminTable";

type PaginationAdminProps = {
  totalPages?: number;
  totalCount?: number;
  currentCount: number;
  tableType: TableType;
};

const PaginationAdmin = ({
  totalPages = 1,
  totalCount = 0,
  currentCount,
  tableType,
}: PaginationAdminProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("pageNumber");
  const currentPage = pageParam ? Number(pageParam) : 1;

  if (!totalPages || totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNumber", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-6 py-4 bg-background/40">
      <span className="text-sm text-muted-foreground">
        Showing {currentCount} of {totalCount || currentCount} {tableType}
      </span>

      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage <= 1}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pages.map((page) => {
            const isActive = Number(currentPage) === Number(page);

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={isActive}
                  className={
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-bold"
                      : ""
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(Math.min(currentPage + 1, totalPages))}
              aria-disabled={currentPage >= totalPages}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationAdmin;
