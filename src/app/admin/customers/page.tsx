import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import TableOrders from "./_components/TableOrders";

export default async function CustomersPage() {
  return (
    <div className="space-y-12 pb-10">
      {/* Page Header */}
      <Heading
        title="Customer Orders"
        subtitle="Review and manage recent rental requests, customer profiles, and lifetime spending analytics."
        align="left"
      />

      {/* Search Bar Section */}
      <section className="w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/60 backdrop-blur-3xl border border-white/60 shadow-lg shadow-rose-500/5">
            <div className="flex items-center flex-1 gap-3 px-4">
              <div className="element-center size-9 shrink-0 rounded-full bg-rose-500/10">
                <Search className="size-5 text-rose-500" />
              </div>

              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-transparent text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none"
              />
            </div>

            <Button className="rounded-xl px-5 h-11 gap-2 font-bold">
              <SlidersHorizontal className="size-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Orders Table */}
      <TableOrders />
    </div>
  );
}
