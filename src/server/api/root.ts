import { createTRPCRouter, createCallerFactory } from "./trpc";
import { boardRouter } from "./routers/board";
import { taskRouter } from "./routers/task";

export const appRouter = createTRPCRouter({
  board: boardRouter,
  task: taskRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);