import { BackButton } from "@/components/BackButton";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
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
