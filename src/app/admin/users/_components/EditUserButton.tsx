"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateUserForm from "./UpdateUserForm";
import { User } from "@prisma/client";

interface EditUserButtonProps {
  user: User;
}

export function EditUserButton({ user }: EditUserButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="w-9 h-9 rounded-full border-slate-200 hover:bg-green-50 hover:border-green-200"
        >
          <Pencil className="size-4 text-green-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] sm:max-w-2xl p-7 rounded-md max-h-5/6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription className="max-w-sm mb-5">
            Make changes to the user profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <UpdateUserForm user={user} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
