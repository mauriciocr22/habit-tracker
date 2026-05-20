import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function toggleHabitLog(habitId: string) {
    await requireAuth();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const habitLogExists = await prisma.habitLog.findFirst({
        where: {
            habitId,
            date: today
        }
    });

    if (habitLogExists) {
        await prisma.habitLog.delete({
            where: {
                id: habitLogExists.id
            }
        })
    } else {
        await prisma.habitLog.create({
            data: {
                habitId,
                date: today
            }
        })
    }

    revalidatePath("/dashboard");
}