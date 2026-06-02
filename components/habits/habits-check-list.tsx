'use client'
import { toggleHabitLog } from "@/app/actions/logs";
import { startTransition, useOptimistic } from "react";
import { Check } from "lucide-react";

type HabitsCheckListProps = {
    habits: {
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        updatedAt: Date;
    }[],
    todayLogs: {
        id: string;
        habitId: string;
        date: Date;
        createdAt: Date;
    }[]
}

export default function HabitsCheckList({ habits, todayLogs }: HabitsCheckListProps) {
    const [optimisticLogs, updateOptimistic] = useOptimistic(
        todayLogs.map(log => log.habitId),
        (state, habitId: string) =>
            state.includes(habitId)
                ? state.filter(id => id !== habitId)
                : [...state, habitId]
    )

    if (habits.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-stone-500 text-lg mb-4">No habits yet</p>
                <p className="text-stone-400 text-sm">Create your first habit to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {
                habits.map((habit, index) => {
                    const isMarked = optimisticLogs.includes(habit.id);
                    return (
                        <label
                            key={habit.id}
                            className="group flex items-start gap-4 p-5 bg-white border border-stone-200 rounded-xl hover:border-stone-300 cursor-pointer transition-all hover:shadow-sm animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={isMarked}
                                    onChange={async () => {
                                        startTransition(async () => {
                                            updateOptimistic(habit.id)
                                            await toggleHabitLog(habit.id)
                                        })
                                    }}
                                    className="peer sr-only"
                                />
                                <div className="size-6 rounded-md border-2 border-stone-300 peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center">
                                    <Check
                                        className={`size-4 text-white transition-all ${
                                            isMarked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                        }`}
                                        strokeWidth={3}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <span className={`text-base font-medium transition-colors ${
                                    isMarked ? 'text-stone-500 line-through' : 'text-stone-900'
                                }`}>
                                    {habit.name}
                                </span>
                            </div>
                        </label>
                    );
                })
            }
        </div>
    )
}