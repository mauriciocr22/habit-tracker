'use client'
import { useActionState } from "react"

type ActionState = {
    errors?: Record<string, unknown>
} | null

type HabitFormProps = {
    habit?: { id: string; name: string }
    action: (prevState: unknown, data: FormData) => Promise<ActionState>
}

export default function HabitForm({ action, habit }: HabitFormProps) {
    const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, null)

    return (
        <form action={formAction}>
            <input type="text" name="name" placeholder="Nome do hábito" defaultValue={habit?.name} />

            {state?.errors && (
                <div>
                    {Object.values(state.errors).flat().map((error, index) => (
                        <p key={index} className="text-red-500">
                            {String(error)}
                        </p>
                    ))}
                </div>
            )}

            <button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
            </button>
        </form>
    )
}