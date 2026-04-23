"use client";

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
import { format } from "date-fns"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Field } from "~/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Spinner } from "../ui/spinner";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  task
}: EditTaskModalProps & { task: {
    id: string;
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: Date | undefined;
  } }) {
  const router = useRouter();
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [form, setForm] = useState({
    name: task.name,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
  });

  const { mutate: updateTask, isPending } = api.task.update.useMutation({
    onSuccess: () => {
      router.refresh();
      onClose();
    },
  });

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-sm flex flex-col gap-6 bg-background rounded-sm shadow-xl py-5 border-0 border-b-5 border-accent">
        <DialogHeader>
          <DialogTitle className="font-rubik font-semibold text-lg text-primary">
            Edit Task
          </DialogTitle>
          <DialogDescription className="font-inter font-medium text-xs text-primary-secondary">
            Update your task details.
          </DialogDescription>
        </DialogHeader>

        <section className="w-full">
          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1">
              <label className="font-rubik font-medium text-xs tracking-wider text-accent">
                TITLE
              </label>
              <input
                type="text"
                placeholder="What need to be done?"
                className="font-inter bg-primary-secondary/10 text-sm text-primary-secondary px-2 py-3 rounded-xs focus:outline-none focus:text-primary focus:ring-1 focus:ring-accent"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-rubik font-medium text-xs tracking-wider text-accent">
                DESCRIPTION
              </label>
              <input
                type="text"
                placeholder="Add a description..."
                className="font-inter bg-primary-secondary/10 text-sm text-primary-secondary px-2 py-3 rounded-xs focus:outline-none focus:text-primary focus:ring-1 focus:ring-accent"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-rubik font-medium text-xs tracking-wider text-accent">
                PRIORITY
              </label>
              <div className="flex gap-2">
                {(["low", "medium", "high"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {setPriority(p); setForm({...form, priority: p})}}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xs border text-sm font-inter font-medium transition-all cursor-pointer ${
                      priority === p
                        ? "bg-accent border-accent text-white"
                        : "bg-transparent border-primary-secondary/30 text-primary-secondary hover:border-accent/50"
                    }`}
                  >
                    <span className={`size-2 rounded-full ${
                      priority === p
                        ? "bg-white"
                        : p === "low" ? "bg-priority-low" : p === "medium" ? "bg-priority-medium" : "bg-priority-high"
                    }`} />
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-rubik font-medium text-xs tracking-wider text-accent">
                DUE DATE
              </label>
              <Field className="w-full rounded-xs">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker-simple"
                      className="hover:bg-primary-secondary/20 py-5 rounded-xs bg-primary-secondary/10"
                    >
                      {form.dueDate ? format(form.dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" style={{ width: "var(--radix-popover-trigger-width)" }} align="center">
                    <Calendar
                      mode="single"
                      selected={form.dueDate}
                      onSelect={(date) => setForm({ ...form, dueDate: date ?? new Date() })}
                      defaultMonth={form.dueDate}
                      className="w-full [--cell-size:--spacing(6)] md:[--cell-size:--spacing(8)]"
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            </div>

            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={onClose}
                className="font-inter font-medium text-sm text-accent border border-primary-secondary/30 rounded-sm px-10 py-3 underline underline-offset-5 decoration-transparent hover:decoration-accent hover:underline-offset-2 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full font-inter font-medium text-sm text-white bg-accent rounded-sm px-10 py-3 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:bg-accent-hover transition-all cursor-pointer"
              onClick={() => updateTask({ id: task.id, name: form.name, description: form.description, priority: form.priority, dueDate: form.dueDate })}
              >
                {isPending ? (<span className="flex items-center gap-2"><Spinner/>Updating...</span>) : "Update Task"}
              </button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
