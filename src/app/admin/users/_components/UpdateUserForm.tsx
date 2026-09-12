"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UpdateUserSchema, UpdateUserType } from "@/zod-schemas/user";
import { User } from "@prisma/client";
import { UserInputFields } from "../../_components/UserInputFields";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { updateUserInDBAndClerk } from "@/server/actions/user";

interface UpdateUserFormProps {
  user: User;
  onSuccess?: () => void;
}

const UpdateUserForm = ({ user, onSuccess }: UpdateUserFormProps) => {
  const router = useRouter();
  const { user: clerkUser } = useUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateUserType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
      role: user?.role ?? "USER",
      phone: user?.phone ?? "",
      timezone:
        user?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const submitForm = async (data: UpdateUserType) => {
    startTransition(async () => {
      try {
        if (!user?.clerkUserId) {
          toast.error("User not found");
          return;
        }

        const result = await updateUserInDBAndClerk({
          targetUserId: user?.clerkUserId,
          data,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        await clerkUser?.reload();
        router.refresh();
        toast.success(result.message);
        onSuccess?.();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className=" w-full">
        <UserInputFields />

        <Button
          type="submit"
          title="Save"
          disabled={isPending}
          className="h-11 my-5 w-full"
        >
          {isPending ? (
            <>
              Updating...
              <LoaderCircle className="animate-spin ml-2" />
            </>
          ) : (
            "Update User"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
