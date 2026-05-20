import HabitsCheckList from "@/components/habits/habits-check-list";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

export default async function DashboardPage() {
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
    });


    return (
        <div>
            <HabitsCheckList habits={habits} todayLogs={todayLogs} />
        </div>
    )
}