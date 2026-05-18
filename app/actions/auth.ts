'use server';
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const schema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

export async function registerUser(prevState: unknown, data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const validatedData = schema.safeParse({ name, email, password });
    if (!validatedData.success) {
        return { errors: validatedData.error.flatten() };
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
        return { errors: { email: ["Email já registrado"] } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    redirect("/login");
}

export async function loginUser(prevState: unknown, data: FormData) {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard"
        });
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { errors: { email: ["Credenciais inválidas"] } };
    }
}