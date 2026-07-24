import { notFound } from "next/navigation";
import VehicleForm from "../../_components/VehicleForm";
import { getVehicle } from "@/server/db/vehicle";

interface EditVehiclePageProps {
  params: Promise<{ vehicleId: string }>;
}

const EditVehiclePage = async ({ params }: EditVehiclePageProps) => {
  const { vehicleId } = await params;

  const vehicle = await getVehicle(vehicleId);

  if (!vehicle) {
    notFound();
  }

  return <VehicleForm key={vehicle.id} vehicle={vehicle} />;
};

export default EditVehiclePage;
