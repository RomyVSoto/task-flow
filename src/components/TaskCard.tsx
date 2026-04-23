"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Calendar, EllipsisVertical, GripVertical } from "lucide-react";
import type { RouterOutputs } from "~/trpc/react";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

import EditTaskModal from "./modals/EditTaskModal";
type Task = RouterOutputs["task"]["getByBoard"][number];

export default function TaskCard({ task }: { task: Task }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const router = useRouter();

  const { mutate: deleteTask } = api.task.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="bg-card w-full flex flex-col gap-6 p-4 rounded-md">
        <div className="space-y-2">
          <span className="flex justify-between items-center text-primary-secondary">
            <GripVertical
              className="w-5 h-5 hover:text-accent cursor-move"
              {...listeners}
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="hover:text-accent transition-colors cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card rounded-lg border">
                <DropdownMenuItem
                  onClick={() => setIsEditModalOpen(true)}
                  className="rounded-lg font-inter font-base text-sm text-primary-secondary flex justify-center items-center focus:bg-accent-light focus:text-primary py-2 px-5 cursor-pointer"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-card text-primary hover:bg-accent-light border-0 shadow-none px-6">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-primary text-lg">
                        Are you sure you want to delete task "
                        <span className="font-bold underline decoration-accent">
                          {task.name}
                        </span>
                        "?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-primary text-xs">
                        This action cannot be undone. This will permanently
                        delete your task from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="hover:bg-accent-hover hover:text-white transition-all">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteTask({ id: task.id })}
                        className="bg-accent text-white hover:bg-accent-hover transition-all"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            task={{
              id: task.id,
              name: task.name,
              description: task.description ?? "",
              priority: task.priority as "low" | "medium" | "high",
              dueDate: task.dueDate ?? undefined,
            }}
          />
          <div className="flex flex-col">
            <span className="font-rubik font-medium text-lg text-primary">
              {task.name}
            </span>
            <span className="font-inter font-normal text-xs text-primary-secondary">
              {task.description}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span
            className={`font-inter font-semibold text-[10px] px-2 rounded-xs ${
              task.priority === "high"
                ? "bg-priority-high/10 text-priority-high"
                : task.priority === "medium"
                  ? "bg-priority-medium/10 text-priority-medium"
                  : "bg-priority-low/10 text-priority-low"
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
          <span className="flex gap-1 items-center font-inter font-medium text-xs text-primary-secondary">
            <Calendar className="w-4 h-4" />
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No date"}
          </span>
        </div>
      </div>
    </div>
  );
}
