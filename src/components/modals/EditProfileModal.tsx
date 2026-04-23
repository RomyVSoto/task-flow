import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { useSession } from "next-auth/react"

interface EditProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
}

export default function EditProfileModal({ isOpen, onOpenChange }: EditProfileModalProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const nameParts = userName?.split(" ") ?? [];
  const initials =
    nameParts.length >= 2
      ? (nameParts[0]?.[0] ?? "") + (nameParts[nameParts.length - 1]?.[0] ?? "")
      : (nameParts[0]?.[0] ?? "");
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="font-rubik font-medium text-2xl text-primary">Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center">
              <span className="font-rubik font-semibold text-2xl text-accent">{initials}</span>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={userName || ""} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="bg-accent text-white hover:bg-accent-hover py-6 cursor-pointer">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}