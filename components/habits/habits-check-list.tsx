'use client'
import { toggleHabitLog } from "@/app/actions/logs";
import { startTransition, useOptimistic } from "react";

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

    return (
        <div>
            {
                habits.map(habit => {
                    const isMarked = optimisticLogs.includes(habit.id);
                    return (
                        <div key={habit.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isMarked}
                                    onChange={async () => {
                                        startTransition(async () => {
                                            updateOptimistic(habit.id)
                                            await toggleHabitLog(habit.id)
                                        })
                                    }}
                                />
                                {habit.name}
                            </label>
                        </div>
                    );
                })
            }
        </div>
    )
}