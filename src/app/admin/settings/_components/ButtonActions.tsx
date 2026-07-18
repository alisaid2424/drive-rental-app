"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const ButtonActions = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleloading = (e: CustomEvent) => setIsSubmitting(e.detail.loading);
    addEventListener("form-submitting-state", handleloading as EventListener);

    return () =>
      removeEventListener(
        "form-submitting-state",
        handleloading as EventListener,
      );
  }, []);

  return (
    <div className="flex gap-4 w-full md:max-w-xs shrink-0">
      <Button
        type="reset"
        form="profile-form"
        variant="outline"
        className="flex-1 text-primary! border-primary hover:bg-white"
        disabled={isSubmitting}
      >
        Discard
      </Button>

      <Button
        type="submit"
        form="profile-form"
        className="flex-1"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            Saving...
            <LoaderCircle className="ml-2 animate-spin" size={18} />
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
};

export default ButtonActions;
