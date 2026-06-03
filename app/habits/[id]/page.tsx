import { updateHabit } from "@/app/actions/habits"
import HabitForm from "@/components/habits/habit-form"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function UpdateHabitPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const habit = await prisma.habit.findUnique({ where: { id } });

    if (!habit) {
        redirect("/habits")
    }

    const updateHabitWithId = updateHabit.bind(null, habit.id)

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in-up">
            <Link
                href="/habits"
                className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 mb-8 transition-colors"
            >
                <ArrowLeft className="size-4" />
                Back to Habits
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">
                    Edit Habit
                </h1>
                <p className="text-stone-500">
                    Update your habit details
                </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                <HabitForm action={updateHabitWithId} habit={habit} />
            </div>
        </div>
    )
}