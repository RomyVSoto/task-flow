"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Plus, EllipsisVertical, ClipboardList } from "lucide-react";
import { Separator } from "~/components/ui/separator";

import type { RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/react";
import CreateBoardModal from "~/components/modals/CreateBoardModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

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
import { useRouter } from "next/navigation";
import { Spinner } from "~/components/ui/spinner";

type Props = {
  boards: RouterOutputs["board"]["getAll"];
};

export default function DashboardClient({ boards }: Props) {
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const router = useRouter();

  const utils = api.useUtils();
  const { mutate: deleteBoard, isPending } = api.board.delete.useMutation({
    onSuccess: () => {
      utils.board.getAll.invalidate();
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-10 px-20 py-10">
      <section className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-rubik font-bold text-3xl">My Boards</h1>
          <p className="font-inter font-normal text-md text-primary-secondary">
            Manage your projects and track team progress across all workstreams.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateBoardModalOpen(true)}
          className="font-inter font-medium bg-accent text-white hover:bg-accent-hover px-4 py-5 cursor-pointer self-end"
        >
          <Plus />
          New board
        </Button>
        <CreateBoardModal
          isOpen={isCreateBoardModalOpen}
          onClose={() => setIsCreateBoardModalOpen(false)}
        />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards?.map((board) => {
          const boardTaskCount = board.columns.reduce(
            (sum, col) => sum + col._count.tasks,
            0,
          );
          return (
            <div
              key={board.id}
              className="bg-card flex flex-col gap-6 p-5 rounded-lg borber border-l-4 border-accent hover:shadow-lg transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4">
                  <Link href={`/board/${board.id}`} passHref>
                    <h2 className="font-inter font-bold text-xl text-primary cursor-pointer">
                      {board.name}
                    </h2>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="hover:text-accent transition-colors cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card rounded-lg border">
                      <Link href={`/board/${board.id}`}>
                        <DropdownMenuItem className="rounded-lg font-inter font-base text-sm text-primary-secondary flex justify-center items-center focus:bg-accent-light focus:text-primary py-2 px-5 cursor-pointer">
                          Details
                        </DropdownMenuItem>
                      </Link>
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
                              Are you sure you want to delete board "
                              <span className="font-bold underline decoration-accent">
                                {board.name}
                              </span>
                              "?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-primary text-xs">
                              This action cannot be undone. This will
                              permanently delete your board from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:bg-accent-hover hover:text-white px-5 py-4 transition-all">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBoard({ id: board.id })}
                              className="bg-accent text-white hover:bg-accent-hover px-5 py-4 transition-all cursor-pointer"
                              disabled={isPending}
                            >
                              {isPending ? (
                                <span className="flex items-center gap-2">
                                  <Spinner /> Deleting...
                                </span>
                              ) : (
                                "Continue"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="font-inter font-medium text-sm text-primary-secondary flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-accent" />
                  {boardTaskCount} Tasks
                </span>
              </div>
              <Separator />
              <span className="font-inter font-normal text-sm text-primary-secondary">
                Created {board.createdAt.toLocaleDateString()}
              </span>
            </div>
          );
        })}
        <div
          onClick={() => setIsCreateBoardModalOpen(true)}
          className="flex flex-col justify-center items-center gap-4 p-10 border border-dashed border-primary-secondary rounded-lg hover:border-solid hover:scale-103 hover:shadow-md transition-all"
        >
          <Plus className="w-10 h-10 p-2 bg-accent rounded-sm text-white" />
          <span className="font-inter font-medium text-sm text-primary">
            Create a New Board
          </span>
        </div>
      </section>
    </div>
  );
}
