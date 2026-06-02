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
        <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
                    Your Progress
                </h1>
                <p className="text-stone-500">Last 7 days of habit tracking</p>
            </div>

            <HabitHistoryGrid habits={habits} logs={logs} />
        </div>
    )
}