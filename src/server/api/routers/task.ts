import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Inspiration } from "next/font/google";

export const taskRouter = createTRPCRouter({
  getByBoard: protectedProcedure
  .input(z.object({ boardId: z.string() }))
  .query(async ({ ctx, input }) => {
    return ctx.db.task.findMany({
      where: { boardId: input.boardId },
      orderBy: { order: "asc" }
    })
  }),

  create: protectedProcedure
  .input(z.object({
    name: z.string(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    dueDate: z.date().optional(),
    columnId: z.string(), // ID de la columna, no el nombre
    boardId: z.string(),  // ID del board
  }))
  .mutation(async ({ ctx, input }) => {
    const lastTask = await ctx.db.task.findFirst({
      where: { columnId: input.columnId },
      orderBy: { order: "desc" }
    })
    return ctx.db.task.create({
      data: {
        name: input.name,
        description: input.description,
        priority: input.priority,
        dueDate: input.dueDate,
        order: (lastTask?.order ?? -1) + 1,
        boardId: input.boardId,
        columnId: input.columnId,
        createdBy: ctx.session.user.id,
      }
    })
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        dueDate: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          priority: input.priority,
          dueDate: input.dueDate,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.delete({ where: { id: input.id } });
    }),

    updateOrder: protectedProcedure
    .input(z.object({id: z.string(), order: z.number(), columnId: z.string()}))
    .mutation(async ({ctx, input}) => {
        return ctx.db.task.update({
            where: {id: input.id},
            data: { order: input.order, columnId: input.columnId}
        })
    })
});
