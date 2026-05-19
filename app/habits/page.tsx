import HabitList from "@/components/habits/habit-list"
import Link from "next/link"

export default async function HabitsPage() {
    return (
        <div>
            <Link href="/habits/new">Novo hábito</Link>
            <HabitList />
        </div>
    )
}