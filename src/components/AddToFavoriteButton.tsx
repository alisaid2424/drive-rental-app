"use client";

import { Button } from "@/components/ui/button";
import { updateFavoriteUser } from "@/server/actions/user";
import { useClerk, useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const AddToFavoriteButton = ({
  vehicleId,
  isFavorite,
}: {
  vehicleId: string;
  isFavorite: boolean;
}) => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleAddToFavoriteButton = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!user) {
        openSignIn();
        return;
      }

      const res = await updateFavoriteUser(vehicleId, user.id);

      if (res.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unexpected error occurred",
      );
    }
  };

  return (
    <Button
      size="icon"
      onClick={handleAddToFavoriteButton}
      data-hover-icon
      className="
    absolute top-4 right-3 bg-white/30 backdrop-blur-md size-10 element-center p-3 rounded-full border-0 active:scale-95 
    hover:bg-primary transition
  "
    >
      <Heart
        className={`
      size-5
      ${isFavorite ? "fill-primary stroke-primary" : "stroke-white"}
      [button[data-hover-icon]:hover_&]:stroke-white
      [button[data-hover-icon]:hover_&]:fill-white transition
    `}
      />
    </Button>
  );
};

export default AddToFavoriteButton;
