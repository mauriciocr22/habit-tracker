import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import HabitsCheckList from "./habits-check-list";

export default async function HabitsCheckListWrapper() {
    const userId = await requireAuth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const habits = await prisma.habit.findMany({
        where: {
            userId
        }
    });

    const todayLogs = await prisma.habitLog.findMany({
        where: {
            date: today,
            habitId: {
                in: habits.map(habit => habit.id)
            }
        }
    })

    return (
        <div>
            <HabitsCheckList habits={habits} todayLogs={todayLogs} />
        </div>
    )
}