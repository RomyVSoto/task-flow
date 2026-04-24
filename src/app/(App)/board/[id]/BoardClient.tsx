"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import CreateTaskModal from "~/components/modals/CreateTaskModal";
import TaskCard from "~/components/TaskCard";

import { Plus } from "lucide-react";
import type { RouterOutputs } from "~/trpc/react";
import {
  DndContext,
  DragOverlay,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { api } from "~/trpc/react";

type Props = {
  board: NonNullable<RouterOutputs["board"]["getById"]>;
  tasks: RouterOutputs["task"]["getByBoard"];
};

function DroppableColumn({
  column,
  tasks,
  onAddTask,
}: {
  column: { id: string; name: string };
  tasks: RouterOutputs["task"]["getByBoard"];
  onAddTask: () => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <section className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <span className="flex gap-2 items-center font-inter font-semibold text-md text-primary">
          {column.name}
          <p className={`font-inter font-normal text-xs px-2 rounded-sm ${column.name === "To Do" ? 'bg-priority-high' : column.name === "In Progress" ? 'bg-priority-medium' : column.name === "Done" ? 'bg-priority-low' : 'bg-accent-light'}`}>
            {tasks.length}
          </p>
        </span>
        <Plus
          className="text-primary-secondary hover:text-accent hover:scale-110 cursor-pointer"
          onClick={onAddTask}
        />
      </div>
      <div
        ref={setNodeRef}
        className={`bg-column min-h-80 rounded-md transition-colors ${isOver ? "ring-2 ring-accent" : ""}`}
      >
        <div className="p-3 flex flex-col gap-3">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} columnName={column.name} />
            ))}
          </SortableContext>
        </div>
      </div>
    </section>
  );
}

export default function BoardClient({ board, tasks: initialTasks }: Props) {
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<RouterOutputs["task"]["getByBoard"][number] | null>(null);
  const router = useRouter();

  const { mutate: updateOrder } = api.task.updateOrder.useMutation({
    onSuccess: () => router.refresh(),
  });

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null); 
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task,
      ),
    );

    updateOrder({ id: taskId, columnId: newColumnId, order: 0 });
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="p-10 flex justify-center gap-14">
        {board.columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.columnId === column.id,
          );

          return (
            <div key={column.id} className="w-1/4">
              <DroppableColumn
                column={column}
                tasks={columnTasks}
                onAddTask={() => setActiveColumnId(column.id)}
              />
              <CreateTaskModal
                isOpen={activeColumnId === column.id}
                onClose={() => setActiveColumnId(null)}
                boardId={board.id}
                columnId={column.id}
              />
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
