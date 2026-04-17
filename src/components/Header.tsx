"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";
import EditProfileModal from "./EditProfileModal";
import { SquareArrowRightExit } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name;
  const initials = (userName?.[0] || "") + (userName?.split(" ").pop()?.[0] || "");
  
  const handleLogOut = async () => {
    await signOut()   
  };
  
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
          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className="bg-accent-light hover:bg-accent hover:text-white px-2 py-1.5 rounded-full text-center text-accent transition-all cursor-pointer"
          >
            {initials}
          </button>
          <button onClick={handleLogOut} className="cursor-pointer">
            <SquareArrowRightExit className="scale-80 text-primary-secondary hover:text-accent transition-all"/>
          </button>
        </span>
        {modalOpen && (
          <EditProfileModal isOpen={modalOpen} onOpenChange={setModalOpen} />
        )}
      </div>
    </header>
  );
}
