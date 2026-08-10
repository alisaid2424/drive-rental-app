"use client";

import { useRouter } from "next/navigation";
import { Routes } from "@/constants/enums";
import { BackButton } from "@/components/BackButton";
import { SignIn, useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  if (user) {
    router.replace(Routes.ROOT);
    return null;
  }

  return (
    <div className="element-center bg-transparent h-screen">
      <div className="relative">
        <SignIn />

        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
          <BackButton
            title="Go Back"
            variant="default"
            className="rounded-full px-6"
          />
        </div>
      </div>
    </div>
  );
}
