"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import {
  profileFormSchema,
  TProfileFormSchema,
} from "@/zod-schemas/settings/accountSettingsSchema";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { User } from "@prisma/client";
import { updateProfile } from "@/server/actions/user";
import { toast } from "sonner";
import { useEffect } from "react";

type Props = {
  user: User | null;
};

const ProfileForm = ({ user }: Props) => {
  const form = useForm<TProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
      phone: user?.phone ?? "",
      timezone:
        user?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    const event = new CustomEvent("form-submitting-state", {
      detail: { loading: isSubmitting },
    });

    dispatchEvent(event);
  }, [isSubmitting]);

  const onSubmit = async (data: TProfileFormSchema) => {
    const result = await updateProfile(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

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

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <InputWithLabel<TProfileFormSchema>
              fieldTitle="Full Name"
              nameInSchema="fullName"
              autoComplete="off"
              className="mt-1.5 px-4 py-5 rounded-xl"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <InputWithLabel<TProfileFormSchema>
              fieldTitle="Email Address"
              nameInSchema="email"
              type="email"
              autoComplete="off"
              className="mt-1.5 px-4 py-5 rounded-xl"
              readOnly
            />
          </div>

          <div className="col-span-2">
            <TextAreaWithLabel<TProfileFormSchema>
              fieldTitle="Bio / Professional Summary"
              nameInSchema="bio"
              rows={4}
              className="mt-1.5 min-h-25 p-4 resize-none rounded-xl"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <InputWithLabel<TProfileFormSchema>
              fieldTitle="Phone Number"
              nameInSchema="phone"
              type="tel"
              autoComplete="off"
              className="mt-1.5 px-4 py-5 rounded-xl"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <InputWithLabel<TProfileFormSchema>
              fieldTitle="Timezone"
              nameInSchema="timezone"
              readOnly
              className="mt-1.5 px-4 py-5 rounded-xl"
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
