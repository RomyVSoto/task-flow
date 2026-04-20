import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const boardRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.board.findMany({where: {userId: ctx.session.user.id}});
  }),

  create: protectedProcedure
  .input(z.object({name: z.string()}))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.board.create({
      data: { name: input.name, userId: ctx.session.user.id, columns:{
        create: [
          {name: "To Do", order: 0},
          {name: "In Progress", order: 1},
          {name: "Done", order: 2}
        ]
      } },
    });
  }),
});