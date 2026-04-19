"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import EditProfileModal from "./EditProfileModal";
import { SquareArrowRightExit } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const nameParts = userName?.split(" ") ?? [];
  const initials =
    nameParts.length >= 2
      ? (nameParts[0]?.[0] ?? "") + (nameParts[nameParts.length - 1]?.[0] ?? "")
      : (nameParts[0]?.[0] ?? "");

  return (
    <header className="bg-background flex items-center justify-between py-4 px-6 shadow-sm">
      <Link
        href="/"
        className="font-rubik font-bold text-2xl text-accent hover:text-accent-hover transition-all tracking-tight"
      >
        TaskFlow
      </Link>
      <div className="flex items-center gap-4">
        <span className="font-inter font-base text-sm tracking-tight">
          {userName}
        </span>
        <Separator orientation="vertical" className="h-8" />
        <span className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="bg-accent-light hover:bg-accent hover:text-white px-2 py-1.5 rounded-full text-center text-accent transition-all cursor-pointer">
                {initials}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="font-inter font-base text-sm text-primary flex justify-center items-center focus:bg-accent-light focus:text-primary py-2 cursor-pointer"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-between gap-2 font-inter font-light text-xs focus:bg-accent-light focus:text-primary"
              >
                Logout
                <SquareArrowRightExit className="scale-90 text-primary-secondar transition-all" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        {modalOpen && (
          <EditProfileModal isOpen={modalOpen} onOpenChange={setModalOpen} />
        )}
      </div>
    </header>
  );
}
