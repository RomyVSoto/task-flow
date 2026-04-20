'use client'

import React from "react";
import { Button } from "~/components/ui/button";
import { Plus, EllipsisVertical, ClipboardList } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import type { RouterOutputs } from "~/trpc/react";
import CreateBoardModal from "~/components/CreateBoardModal";

type Props = {
  boards: RouterOutputs["board"]["getAll"]
}

export default function DashboardClient({ boards }: Props) {
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = React.useState(false);
  return(
    <div className="flex flex-col gap-10 px-20 py-10">
      <section className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-rubik font-bold text-3xl">My Boards</h1>
          <p className="font-inter font-normal text-md text-primary-secondary">
            Manage your projects and track team progress across all workstreams.
          </p>
        </div>
        <Button 
        onClick={() => setIsCreateBoardModalOpen(true)}
        className="font-inter font-medium bg-accent text-white hover:bg-accent-hover px-4 py-5 cursor-pointer self-end">
          <Plus />
          New board
        </Button>
        <CreateBoardModal 
          isOpen={isCreateBoardModalOpen}
          onClose={() => setIsCreateBoardModalOpen(false)}
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards?.map((board) => (
          <div key={board.id} className="bg-card flex flex-col gap-6 p-5 rounded-lg borber border-l-4 border-accent">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4">
              <h2 className="font-inter font-bold text-xl text-primary">
                {board.name}
              </h2>
              <EllipsisVertical />
            </div>
            <span className="font-inter font-medium text-sm text-primary-secondary flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-accent" />
              12 Tasks
            </span>
          </div>
          <Separator />
          <span className="font-inter font-normal text-sm text-primary-secondary">
            Created {board.createdAt.toLocaleDateString()}
          </span>
          </div>
        ))}
        <div 
        onClick={() => setIsCreateBoardModalOpen(true)}
        className="flex flex-col justify-center items-center gap-4 border border-dashed border-primary-secondary rounded-lg hover:border-solid hover:shadow-md transition-all cursor-pointer">
          <Plus className="w-10 h-10 p-2 bg-accent rounded-sm text-primary-secondary"/>
          <span className="font-inter font-medium text-sm text-primary-secondary">Create a New Board</span>
        </div>
      </section>
    </div>
  )
}