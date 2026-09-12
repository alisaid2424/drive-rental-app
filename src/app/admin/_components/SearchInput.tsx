"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("searchText") ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", "1");
    if (search) {
      params.set("searchText", search);
    } else {
      params.delete("searchText");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <section>
      <div className="max-w-2xl">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 p-2 rounded-2xl bg-white/60 backdrop-blur-3xl border border-white/60 shadow-lg shadow-rose-500/5"
        >
          <div className="flex items-center flex-1 gap-3 px-4">
            <div className="size-9 shrink-0 rounded-full bg-primary/10 element-center">
              <Search className="size-4 text-primary" />
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          <Button className="rounded-xl px-5 h-11 gap-2 font-bold">
            {isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Search...
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
