import HabitForm from "@/components/habits/habit-form"
import { createHabit } from "@/app/actions/habits"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HabitsPage() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in-up">
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-8 transition-colors"
            >
                <ArrowLeft className="size-4" />
                Back to Dashboard
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
                    Create New Habit
                </h1>
                <p className="text-stone-500">
                    Start tracking a new daily habit
                </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <HabitForm action={createHabit} />
            </div>
        </div>
    )
}