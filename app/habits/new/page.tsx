import HabitForm from "@/components/habits/habit-form"
import { createHabit } from "@/app/actions/habits"

export default function HabitsPage() {
    return (
        <HabitForm action={createHabit} />
    )
}