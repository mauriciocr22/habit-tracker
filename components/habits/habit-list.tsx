import { deleteHabit } from "@/app/actions/habits";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export default async function HabitList() {
    const userId = await requireAuth();

    const habits = await prisma.habit.findMany({
        where: { userId }
    });

    return (
        <div>
            {habits.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-stone-500 text-lg mb-4">No habits yet</p>
                    <p className="text-stone-400 text-sm">Create your first habit to get started</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {habits.map((habit, index) => {
                        const deleteHabitWithId = deleteHabit.bind(null, habit.id);
                        return (
                            <div
                                key={habit.id}
                                className="flex items-center justify-between p-5 bg-white border border-stone-200 rounded-xl hover:shadow-sm transition-all animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <span className="text-base font-medium text-stone-900">
                                    {habit.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/habits/${habit.id}`}
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                                    >
                                        <Pencil className="size-4" />
                                        Edit
                                    </Link>
                                    <form action={deleteHabitWithId}>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 className="size-4" />
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}