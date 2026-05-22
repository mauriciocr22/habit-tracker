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



    return (
        <div>
            {
                habits.map(habit => (
                    <div key={habit.id}>
                        <span>{habit.name}</span>
                        <div className="flex gap-1"> {/* container dos quadradinhos */}
                            {days.map(day => {
                                const isCompleted = logs.some(
                                    log => log.habitId === habit.id &&
                                        log.date.toDateString() === day.toDateString()
                                )
                                return (
                                    <div key={day.toISOString()} className={`h-6 w-6 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                )
                            })}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}