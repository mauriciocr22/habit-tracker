'use server';
import { z } from "zod";
import { requireAuth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
    name: z.string().min(2, "O nome do hábito deve ter pelo menos 2 caracteres")
})

export async function createHabit(prevState: unknown, data: FormData) {
    const name = data.get("name") as string;
    const userId = await requireAuth();

    const validatedData = schema.safeParse({ name });
    if (!validatedData.success) {
        return { errors: validatedData.error.flatten() };
    }

    await prisma.habit.create({
        data: {
            name,
            userId
        }
    });

    revalidatePath("/habits");
    redirect("/habits");
}

export async function updateHabit(id: string, prevState: unknown, data: FormData) {
    const name = data.get("name") as string;
    const userId = await requireAuth();

    const validatedData = schema.safeParse({ name });
    if (!validatedData.success) {
        return { errors: validatedData.error.flatten() };
    }

    await prisma.habit.updateMany({
        where: { id, userId },
        data: { name }
    });

    revalidatePath("/habits");
    redirect("/habits");
}

export async function deleteHabit(id: string, prevState: unknown) {
    const userId = await requireAuth();

    await prisma.habit.deleteMany({
        where: { id, userId }
    });
    revalidatePath("/habits");
    redirect("/habits");
}