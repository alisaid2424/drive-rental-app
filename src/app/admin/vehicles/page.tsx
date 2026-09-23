import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import { Plus } from "lucide-react";
import { Routes, VEHICLES_PER_PAGE } from "@/constants/enums";
import SearchInput from "../_components/SearchInput";
import { getVehiclesForAdmin } from "@/server/db/vehicle";
import { vehicleColumns } from "./_components/VehicleColumns";
import { AdminTable } from "@/components/AdminTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Fleet Control",
  description:
    "Manage and monitor your premium automobile catalog, maintenance status, and fleet performance.",
  robots: { index: false, follow: false },
};

interface VehiclesPageProps {
  searchParams: Promise<{
    searchText?: string;
    pageNumber?: string;
  }>;
}

const VehiclesListPage = async ({ searchParams }: VehiclesPageProps) => {
  const { searchText = "", pageNumber = "1" } = await searchParams;

  const data = await getVehiclesForAdmin({
    searchText,
    pageNumber: Number(pageNumber),
  });

  return (
    <div className="space-y-8 mb-7">
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

      <SearchInput
        key={searchText}
        placeholder="Search by name vehicle or Type or brand..."
      />

      <AdminTable
        data={data.vehicles}
        columns={vehicleColumns}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        currentPage={Number(pageNumber)}
        itemsPerPage={VEHICLES_PER_PAGE}
        tableType="Vehicles"
      />
    </div>
  );
};

export default VehiclesListPage;
