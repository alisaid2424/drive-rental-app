"use client";

import { Button } from "@/components/ui/button";
import { confirmDelete } from "@/lib/swal";
import { deleteUserInDBAndClerk } from "@/server/actions/user";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteUserButtonProps {
  isAdmin: boolean;
  userId: string;
  onSuccess?: () => void;
}
const DeleteUserButton = ({
  isAdmin,
  userId,
  onSuccess,
}: DeleteUserButtonProps) => {
  const handleDelete = async () => {
    try {
      const confirmed = await confirmDelete(
        "Delete User?",
        "Are you sure you want to delete this user?",
      );

      if (!confirmed) return;

      const res = await deleteUserInDBAndClerk(userId);

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
      onClick={handleDelete}
      size="sm"
      variant="outline"
      disabled={isAdmin}
      className="w-9 h-9 rounded-full border-slate-200 hover:bg-rose-50 hover:border-rose-200"
    >
      <Trash2 className="size-4 text-rose-500" />
    </Button>
  );
};

export default DeleteUserButton;
