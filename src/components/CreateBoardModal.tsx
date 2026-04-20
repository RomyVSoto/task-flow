'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBoardModal({
  isOpen,
  onClose,
}: CreateBoardModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
  })

const utils = api.useUtils();
const { mutate: createBoard, isPending } = api.board.create.useMutation({
  onSuccess: () => {
    utils.board.getAll.invalidate();
    router.refresh();
    onClose()
  }
})

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm flex flex-col gap-6 bg-background rounded-sm shadow-xl py-5 border-0 border-b-5 border-accent">
        <DialogHeader>
          <DialogTitle className="font-rubik font-semibold text-lg text-primary">
            New Board
          </DialogTitle>
          <DialogDescription className="font-inter font-medium text-xs text-primary-secondary">
            Give your board a name to get started.
          </DialogDescription>
        </DialogHeader>

        <section className="w-full">
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label className="font-rubik font-medium text-xs tracking-widest text-accent">
                BOARD NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Marketing Q2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="font-inter bg-accent-light text-sm text-primary-secondary px-2 py-3 rounded-md focus:outline-none focus:text-primary focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={onClose}
                className="font-inter font-medium text-sm text-accent border border-primary-secondary/30 rounded-md px-10 py-3 underline underline-offset-5 decoration-transparent hover:decoration-accent hover:underline-offset-2 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full font-inter font-medium text-sm text-white bg-accent rounded-md px-10 py-3 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:bg-accent-hover transition-all cursor-pointer"
                onClick={() => createBoard({name: form.name})}
              >
                Create Board
              </button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
