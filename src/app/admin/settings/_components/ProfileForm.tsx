"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { useDispatchFormStatus } from "@/hooks/useFormStatus";
import { UserInputFields } from "../../_components/UserInputFields";
import { UpdateUserSchema, UpdateUserType } from "@/zod-schemas/user";
import { updateUserInDBAndClerk } from "@/server/actions/user";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

type Props = {
  user: User | null;
};

const ProfileForm = ({ user }: Props) => {
  const router = useRouter();
  const { user: clerkUser } = useUser();

  const getFormValues = (u: User | null): UpdateUserType => ({
    fullName: u?.name ?? "",
    email: u?.email ?? "",
    bio: u?.bio ?? "",
    role: u?.role ?? "USER",
    phone: u?.phone ?? "",
    timezone: u?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const form = useForm<UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: getFormValues(user),
  });

  useEffect(() => {
    if (user) {
      if (user) {
        form.reset(getFormValues(user));
      }
    }
  }, [user, form]);

  const clerkLastUpdated = clerkUser?.updatedAt?.getTime();
  const initialClerkTime = useRef(clerkLastUpdated);

  useEffect(() => {
    if (clerkLastUpdated && clerkLastUpdated !== initialClerkTime.current) {
      initialClerkTime.current = clerkLastUpdated;
      router.refresh();
    }
  }, [clerkLastUpdated, router]);

  const { isSubmitting } = form.formState;

  useDispatchFormStatus("form-profile-submitting", isSubmitting);

  const onSubmit = async (data: UpdateUserType) => {
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
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        id="profile-form"
        className="col-span-12 lg:col-span-8 settings-card"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-gray-300 shadow-md relative">
              <Image
                alt="Profile Avatar"
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                src={
                  user?.image ??
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuB99jYeepIeZjL5FJnHy5KC2vdZGs0z5-gJlWWBN4--lbjB_HP7X4PhpNXWs1n0TAZLzUZ9ZRqPcpGwxYJIVyu60qpU_i00w9ahIdwIrKrMJJuhQn14ZK-X1X_gj-u5Jvw7zguoGDXCORkKNzyM6-lds2x4JdAlQQcrfm5k8REqu_f7SfOnlYyqkqHC2jDAttPKO7gf4rRhRtyrn1bzVmwuAGMHA_adSCMJdYnB3SSOP52JVpMPF3DJAngm_g8H6LToMzYYDn-mLdw"
                }
                width={200}
                height={200}
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white" size={22} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              Profile Information
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Update your personal identity and public fleet profile.
            </p>
          </div>
        </div>

        <UserInputFields />
      </form>
    </Form>
  );
};

export default ProfileForm;
