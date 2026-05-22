import HabitHistoryGrid from "@/components/history/habit-history-grid";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";

export default async function HistoryPage() {
    const userId = await requireAuth();
    const habits = await prisma.habit.findMany({
        where: {
            userId,
        }
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const logs = await prisma.habitLog.findMany({
        where: {
            habitId: {
                in: habits.map(habit => habit.id),
            },
            date: {
                gte: sevenDaysAgo,
            }
        }
    })

    return (
        <div>
            <HabitHistoryGrid habits={habits} logs={logs} />
        </div>
    )
}