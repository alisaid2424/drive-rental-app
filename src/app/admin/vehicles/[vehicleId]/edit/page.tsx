import { notFound } from "next/navigation";
import VehicleForm from "../../_components/VehicleForm";
import { carsall } from "@/constants/data";

interface EditVehiclePageProps {
  params: Promise<{ vehicleId: string }>;
}

const EditVehiclePage = async ({ params }: EditVehiclePageProps) => {
  const { vehicleId } = await params;

  const vehicle = carsall.find((car) => car.id === vehicleId);

  if (!vehicle) {
    notFound();
  }

  return <VehicleForm key={vehicle.id} vehicle={vehicle} />;
};

export default EditVehiclePage;
