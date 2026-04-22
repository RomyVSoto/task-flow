import { ArrowLeft } from "lucide-react";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import BoardClient from "./BoardClient";

export default async function BoardPage({ params }: { params: { id: string } }) {
  const board = await api.board.getById({ id: params.id });
  const tasks = await api.task.getByBoard({ boardId: params.id });
  
  if(!board) {
    return <div className="flex gap-2">
      Board not found
      <Button><ArrowLeft /> Back</Button>
    </div>;
  }
  
  return (
    <BoardClient board={board} tasks={tasks} />
  );
}
