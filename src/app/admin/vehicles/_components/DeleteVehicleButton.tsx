"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { confirmDelete } from "@/lib/swal";
import { Trash2 } from "lucide-react";
import { deleteVehicle } from "@/server/actions/vehicle";

interface Props {
  VehicleId: string;
  onSuccess?: () => void;
  isBooked: boolean;
}

const DeleteVehicleButton = ({ VehicleId, onSuccess, isBooked }: Props) => {
  const handleDelete = async () => {
    try {
      const confirmed = await confirmDelete(
        "Delete Vehicle?",
        "Are you sure you want to delete this vehicle?",
      );

      if (!confirmed) return;

      const res = await deleteVehicle(VehicleId);

      if (res.success) {
        toast.success(res.message);

        onSuccess?.();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="w-9 h-9 rounded-full border-slate-200 hover:bg-rose-50 hover:border-rose-200"
      onClick={handleDelete}
      disabled={isBooked}
    >
      <Trash2 className="size-4 text-rose-500" />
    </Button>
  );
};

export default DeleteVehicleButton;
