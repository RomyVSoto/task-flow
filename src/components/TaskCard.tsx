import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, EllipsisVertical, GripVertical } from "lucide-react";
import type { RouterOutputs } from "~/trpc/react";

type Task = RouterOutputs["task"]["getByBoard"][number];

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="bg-card w-full flex flex-col gap-6 p-4 rounded-md">
        <div className="space-y-2">
          <span className="flex justify-between items-center text-primary-secondary">
            <GripVertical className="w-5 h-5 hover:text-accent cursor-move" {...listeners} />
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
          <span className={`font-inter font-semibold text-[10px] px-2 rounded-xs ${
            task.priority === "high" ? "bg-priority-high/10 text-priority-high" :
            task.priority === "medium" ? "bg-priority-medium/10 text-priority-medium" :
            "bg-priority-low/10 text-priority-low"
          }`}>
            {task.priority.toUpperCase()}
          </span>
          <span className="flex gap-1 items-center font-inter font-medium text-xs text-primary-secondary">
            <Calendar className="w-4 h-4" />
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
          </span>
        </div>
      </div>
    </div>
  );
}