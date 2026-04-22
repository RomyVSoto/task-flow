'use client'

import React, { useState } from "react";
import CreateTaskModal from "~/components/modals/CreateTaskModal";
import { Calendar, EllipsisVertical, GripVertical, Plus } from "lucide-react";
import type { RouterOutputs } from "~/trpc/react";

type Props = {
  board: NonNullable<RouterOutputs["board"]["getById"]>;
  tasks: RouterOutputs["task"]["getByBoard"];
};

export default function BoardClient({ board, tasks }: Props) {
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  return (
    <div className="p-10 flex justify-center gap-14">
      {board.columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.columnId === column.id);

        return (
          <section key={column.id} className="w-full max-w-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="flex gap-2 items-center font-inter font-semibold text-md text-primary">
                {column.name}
                <p className="bg-accent-light font-inter font-normal text-sm px-2 rounded-md">
                  {columnTasks.length}
                </p>
              </span>
              <Plus
                className="text-primary-secondary hover:text-accent hover:scale-110 cursor-pointer"
                onClick={() => setActiveColumnId(column.id)}
              />
            </div>
            <CreateTaskModal
              isOpen={activeColumnId === column.id}
              onClose={() => setActiveColumnId(null)}
              boardId={board.id}
              columnId={column.id}
            />
            <div className="bg-column min-h-80 rounded-md">
              <div className="p-3 flex flex-col gap-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-card flex flex-col gap-6 p-4 rounded-md"
                  >
                    <div className="space-y-2">
                      <span className="flex justify-between items-center text-primary-secondary">
                        <GripVertical className="w-5 h-5 hover:text-accent cursor-move" />
                        <EllipsisVertical className="w-5 h-5 hover:text-accent" />
                      </span>
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
                      <span className={`font-inter font-semibold ${task.priority === "high" ? "bg-priority-high/10" : task.priority === "medium" ? "bg-priority-medium/10" : "bg-priority-low/10"} text-[10px] ${task.priority === "high" ? "text-priority-high" : task.priority === "medium" ? "text-priority-medium" : "text-priority-low"} px-2 rounded-xs`}>
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
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
