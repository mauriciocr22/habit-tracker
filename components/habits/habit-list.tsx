import { deleteHabit } from "@/app/actions/habits";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/session";
import Link from "next/link";

export default async function HabitList() {
    const userId = await requireAuth();

    const habits = await prisma.habit.findMany({
        where: { userId }
    });

    return (
        <div>
            {habits.length === 0 ? (
                <p>Você ainda não tem hábitos. Crie um para começar a acompanhar!</p>
            ) : (
                <ul>
                    {habits.map((habit) => {
                        const deleteHabitWithId = deleteHabit.bind(null, habit.id);
                        return (
                            <li key={habit.id}>
                                {habit.name} <Link href={`/habits/${habit.id}`}>Editar</Link> <form action={deleteHabitWithId}><button type="submit">Deletar</button></form>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}