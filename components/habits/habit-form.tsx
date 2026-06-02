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
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-stone-900">
                    Habit Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g., Morning meditation"
                    defaultValue={habit?.name}
                    required
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
            </div>

            {state?.errors && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-1">
                    {Object.values(state.errors).flat().map((error, index) => (
                        <p key={index} className="text-sm text-red-800">
                            {String(error)}
                        </p>
                    ))}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isPending ? "Saving..." : habit ? "Update Habit" : "Create Habit"}
            </button>
        </form>
    )
}