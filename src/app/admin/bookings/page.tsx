import { Heading } from "@/components/Heading";
import TableBookings from "../_components/TableBookings";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BookingsPage() {
  return (
    <div className="space-y-12 pb-10">
      {/* Page Header */}
      <Heading
        title="Booking Reservations"
        subtitle="Manage and track all vehicle reservations across your fleet, including real-time availability and logistic timelines."
        align="left"
      />

      {/* Search Bar Section */}
      <section>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/60 backdrop-blur-3xl border border-white/60 shadow-lg shadow-rose-500/5">
            <div className="flex items-center flex-1 gap-3 px-4">
              <div className="size-9 shrink-0 rounded-full bg-primary/10 element-center">
                <Search className="size-4 text-primary" />
              </div>

              <input
                type="text"
                placeholder="Search by customer name or vehicle..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>

            <Button className="rounded-xl px-5 h-11 gap-2 font-bold">
              <SlidersHorizontal className="size-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      <TableBookings />
    </div>
  );
}
