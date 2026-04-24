"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Spinner } from "../ui/spinner";

interface EditProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileModal({
  isOpen,
  onOpenChange,
}: EditProfileModalProps) {
  const { data: session, update } = useSession();
  const userName = session?.user?.name;
  const [name, setName] = useState(userName ?? "");

  const nameParts = userName?.split(" ") ?? [];
  const initials =
    nameParts.length >= 2
      ? (nameParts[0]?.[0] ?? "") + (nameParts[nameParts.length - 1]?.[0] ?? "")
      : (nameParts[0]?.[0] ?? "");

  const { mutate: updateProfile, isPending } = api.user.update.useMutation({
    onSuccess: async () => {
      await update({ name });
      onOpenChange(false);
    },
  });
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="font-rubik font-medium text-2xl text-primary">
            Edit profile
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center">
              <span className="font-rubik font-semibold text-2xl text-accent">
                {initials}
              </span>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() => updateProfile({ fullName: name })}
              className="bg-accent text-white hover:bg-accent-hover py-6 cursor-pointer"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Saving...
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
