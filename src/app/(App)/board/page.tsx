'use client'

import { Calendar, EllipsisVertical, GripVertical, Plus } from "lucide-react";
import { useState } from "react";
import CreateTaskModal from "~/components/modals/CreateTaskModal";

export default function Board() {
    const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  return (
    <div className="p-10 flex justify-center gap-14">
      <section className="w-full max-w-xs space-y-4">
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center font-inter font-semibold text-md text-primary">
            To Do{" "}
            <p className="bg-accent-light font-inter font-normal text-sm px-2 rounded-md">
              4
            </p>
          </span>
          <Plus 
          className="text-primary-secondary hover:text-accent hover:scale-110"
          onClick={() => setCreateTaskModalOpen(true)}/>
        </div>
        <CreateTaskModal
          isOpen={createTaskModalOpen}
          onClose={() => setCreateTaskModalOpen(false)}
        />
        <div className="bg-column min-h-80 rounded-md">
          <div className="p-3">
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
          </div>
        </div>
      </section>
      <section className="w-full max-w-xs space-y-4">
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center font-inter font-semibold text-md text-primary">
            In Progress{" "}
            <p className="bg-accent-light font-inter font-normal text-sm px-2 rounded-md">
              4
            </p>
          </span>
          <Plus onClick={() => setCreateTaskModalOpen(true)} />
        </div>
        <div className="bg-column min-h-80 rounded-md">
          <div className="p-3">
          </div>
        </div>
      </section>
      <section className="w-full max-w-xs space-y-4">
        <div className="flex justify-between items-center">
          <span className="flex gap-2 items-center font-inter font-semibold text-md text-primary">
            Done{" "}
            <p className="bg-accent-light font-inter font-normal text-sm px-2 rounded-md">
              4
            </p>
          </span>
          <Plus onClick={() => setCreateTaskModalOpen(true)} />
        </div>
        <div className="bg-column min-h-80 rounded-md">
          <div className="p-3">
          </div>
        </div>
      </section>
    </div>
  );
}
