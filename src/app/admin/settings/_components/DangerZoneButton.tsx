"use client";

import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import { confirmDelete } from "@/lib/swal";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DangerZoneButton = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = async () => {
    if (!isLoaded || !user) return;

    const confirmed = await confirmDelete(
      "Delete User?",
      "Are you sure you want to delete your account? This cannot be undone.",
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await user.delete();

        router.replace(Routes.ROOT);
        router.refresh();
        toast.success("Account deactivated successfully.");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        );
      }
    });
  };

  return (
    <Button
      variant="destructive"
      disabled={isPending || !isLoaded}
      onClick={handleDeleteUser}
      className="hover:bg-rose-500 hover:text-white transition-all duration-300"
    >
      {isPending ? (
        <>
          Deleting...
          <LoaderCircle className="ml-2 animate-spin" size={18} />
        </>
      ) : (
        "Deactivate Account"
      )}
    </Button>
  );
};

export default DangerZoneButton;
