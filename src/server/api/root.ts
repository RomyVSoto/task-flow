import { createTRPCRouter, createCallerFactory } from "./trpc";
import { boardRouter } from "./routers/board";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  board: boardRouter,
  task: taskRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);