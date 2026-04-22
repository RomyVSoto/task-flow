import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const boardRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.board.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        columns: {
          include: {
            _count: {
              select: {
                tasks: true,
              },
            },
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.board.findUnique({
        where: { id: input.id, userId: ctx.session.user.id },
        include: {
          columns: { orderBy: { order: "asc" } },
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.board.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          columns: {
            create: [
              { name: "To Do", order: 0 },
              { name: "In Progress", order: 1 },
              { name: "Done", order: 2 },
            ],
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.board.delete({ where: { id: input.id } });
    }),
});
