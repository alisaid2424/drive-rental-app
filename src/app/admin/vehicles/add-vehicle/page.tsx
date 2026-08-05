import VehicleForm from "../_components/VehicleForm";

const AddVehicle = () => {
  const renderId = crypto.randomUUID();

  return <VehicleForm key={renderId} />;
};

export default AddVehicle;
