import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    update: protectedProcedure
    .input(z.object({fullName: z.string().min(1, "fullName is Required")}))
    .mutation(async ({ ctx, input }) => {
        return ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: { fullName: input.fullName}
        })
    })
})