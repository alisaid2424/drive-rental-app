"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("searchText") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmedSearch = search.trim();
      const currentSearch = searchParams.get("searchText") ?? "";

      if (trimmedSearch === currentSearch) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      params.set("pageNumber", "1");

      if (trimmedSearch) {
        params.set("searchText", trimmedSearch);
      } else {
        params.delete("searchText");
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 600);

    return () => clearTimeout(timeout);
  }, [search, pathname, router, searchParams]);

  return (
    <section>
      <div className="max-w-2xl">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/60 p-2 shadow-lg shadow-rose-500/5 backdrop-blur-3xl"
        >
          <div className="flex flex-1 items-center gap-3 px-4">
            <div className="element-center size-9 shrink-0 rounded-full bg-primary/10">
              <Search className="size-4 text-primary" />
            </div>

            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <Button
            type="button"
            className="h-11 gap-2 rounded-xl px-5 font-bold"
          >
            {isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <SlidersHorizontal className="size-4" />
                Filters
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SearchInput;
