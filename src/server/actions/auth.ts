'use server'

import * as z from "zod";
import { db } from "~/server/db";
import { hash, compare } from "bcryptjs";
import { redirect } from "next/navigation";


export async function register(data: {fullName: string, email: string, password: string, confirmPassword: string}){
    const validateSchema = z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email."),
        password: z.string().min(6, "Password must be greater than 6 characters"),
        confirmPassword: z.string().min(1, "Confirm password is required.")
    }).safeParse(data);

    if(!validateSchema.success){
        return {error: validateSchema.error.issues[0]?.message ?? "Invalid data."}
    }

    const comparePassword = validateSchema.data.password === validateSchema.data.confirmPassword;
    if(!comparePassword){
        return {error: "Passwords do not match."}
    }

    const existingUser = await db.user.findUnique({
        where: {
            email: data.email
        }
    })

    if(existingUser){
        return {error: "User already exists."}
    }

    const hashedPassword = await hash(data.password, 12);

    const user = await db.user.create({
        data: {
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
            image: null
        }
    })

    redirect("/")
}