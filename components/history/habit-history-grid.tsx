import { calculateStreak } from "@/lib/streak";
import { Flame } from "lucide-react";

type HabitHistoryGridProps = {
    habits: {
        id: string;
        name: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[],
    logs: {
        id: string;
        createdAt: Date;
        habitId: string;
        date: Date;
    }[]
}

export default async function HabitHistoryGrid({ habits, logs }: HabitHistoryGridProps) {
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - (6 - i));
        return date;
    })

    if (habits.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-stone-500 text-lg mb-4">No habits to track yet</p>
                <p className="text-stone-400 text-sm">Create your first habit to see your progress</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-[auto_1fr] gap-3 text-xs text-stone-500 font-medium mb-4">
                <div></div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {days.map((day, i) => (
                        <div key={i} className="uppercase tracking-wide">
                            {day.toLocaleDateString('en-US', { weekday: 'short' })[0]}
                        </div>
                    ))}
                </div>
            </div>

            {habits.map((habit, index) => {
                const habitLogs = logs.filter(log => log.habitId === habit.id);
                const streak = calculateStreak(habitLogs);
                return (
                    <div
                        key={habit.id}
                        className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-sm transition-all animate-fade-in-up"
                        style={{ animationDelay: `${index * 75}ms` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-stone-900">{habit.name}</h3>
                            {streak > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full">
                                    <Flame className="size-4" fill="currentColor" />
                                    <span className="text-sm font-semibold">{streak} day{streak !== 1 ? 's' : ''}</span>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {days.map((day) => {
                                const isCompleted = logs.some(
                                    log => log.habitId === habit.id &&
                                        log.date.toDateString() === day.toDateString()
                                )
                                const isToday = day.toDateString() === new Date().toDateString();
                                return (
                                    <div
                                        key={day.toISOString()}
                                        className="relative aspect-square"
                                    >
                                        <div
                                            className={`absolute inset-0 rounded-lg transition-all ${
                                                isCompleted
                                                    ? 'bg-primary scale-100'
                                                    : 'bg-stone-100 scale-95'
                                            } ${isToday && !isCompleted ? 'ring-2 ring-primary/30' : ''}`}
                                        />
                                        {isCompleted && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="size-2 rounded-full bg-white/80" />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}