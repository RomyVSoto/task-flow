import { Calendar, EllipsisVertical, GripVertical } from "lucide-react";

export default function TaskCard() {
  
  return (
    <div className="bg-card flex flex-col gap-6 p-4 rounded-md">
      <div className="space-y-2">
        <span className="flex justify-between items-center text-primary-secondary">
          <GripVertical className="w-5 h-5 hover:text-accent cursor-move" />
          <EllipsisVertical className="w-5 h-5 hover:text-accent" />
        </span>
        <div className="flex flex-col">
          <span className="font-rubik font-medium text-lg text-primary">
            Task Title
          </span>
          <span className="font-inter font-normal text-xs text-primary-secondary">
            Task description
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="font-inter font-semibold bg-accent/10 text-xs text-accent px-2 rounded-xs">
          Priority
        </span>
        <span className="flex gap-1 items-center font-inter font-medium text-xs text-primary-secondary">
          <Calendar className="w-4 h-4" />
          Oct 24
        </span>
      </div>
    </div>
  );
}
