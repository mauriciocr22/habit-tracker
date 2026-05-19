import { updateHabit } from "@/app/actions/habits"
import HabitForm from "@/components/habits/habit-form"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function UpdateHabitPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const habit = await prisma.habit.findUnique({ where: { id } });

    if (!habit) {
        redirect("/habits")
    }

    const updateHabitWithId = updateHabit.bind(null, habit.id)

    return (
        <HabitForm action={updateHabitWithId} habit={habit} />
    )
}