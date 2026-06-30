import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { Plus } from "lucide-react";
import { FleetStats } from "./_components/FleetStats";
import VehiclesTable from "./_components/VehiclesTable";
import { Routes } from "@/constants/enums";

export default async function VehiclesListPage() {
  return (
    <div className="space-y-8 mb-7">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <Heading
          title="Vehicle Fleet"
          subtitle="Manage and monitor your premium automobile catalog, including maintenance status and daily revenue."
          align="left"
        />

        <Link href={`${Routes.LISTVEHICLES}/add-vehicle `} className="shrink-0">
          <Button className="h-12 px-8 rounded-full text-sm">
            <Plus className="size-5" />
            Add New Car
          </Button>
        </Link>
      </div>

      {/* Dashboard Analytics */}
      <FleetStats />

      {/* Vehicles Table Section */}
      <VehiclesTable />
    </div>
  );
}
