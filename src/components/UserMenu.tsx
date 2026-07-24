"use client";

import { useRouter } from "next/navigation";
import { TicketPlus, Heart } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Pages } from "@/constants/enums";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function UserMenu() {
  const router = useRouter();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <div className="size-9 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="size-9 flex items-center justify-center shrink-0">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: "!size-9",
            userButtonTrigger:
              "!size-9 active:scale-95 transition-all outline-none",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Action
            label="My Booking"
            labelIcon={<TicketPlus className="w-4 h-4 text-gray-600" />}
            onClick={() => router.push(Pages.MYBOOKINGS)}
          />

          <UserButton.Action
            label="My Favorite"
            labelIcon={<Heart className="w-4 h-4 text-gray-600" />}
            onClick={() => router.push(Pages.FAVORITE)}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
