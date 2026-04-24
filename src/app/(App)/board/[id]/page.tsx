import { ArrowLeft } from "lucide-react";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import BoardClient from "./BoardClient";

export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const board = await api.board.getById({ id })
  const tasks = await api.task.getByBoard({ boardId: id })

  if (!board) {
    return <div className="flex gap-2">
      Board not found
      <Button><ArrowLeft /> Back</Button>
    </div>
  }

  return <BoardClient board={board} tasks={tasks} />
}
