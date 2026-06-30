"use client";

import { BackButton } from "@/components/BackButton";
import LottieHandler from "@/components/LottieHandler";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="element-center flex-col min-h-screen px-4">
      <div className="w-full max-w-xs">
        <LottieHandler type="error" message={error.message} />

        <div className="flex items-center justify-around mt-7">
          <Button
            onClick={reset}
            className="px-8 py-6 bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-full"
          >
            Try Again
          </Button>

          <BackButton title="Return Home" href="/" variant="default" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
