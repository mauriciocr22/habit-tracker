'use client';
import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    return (
        <div>
            <form action={formAction}>
                <input type="text" placeholder="nome" name="name" />
                <input type="email" placeholder="email" name="email" />
                <input type="password" placeholder="senha" name="password" />
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
                    {isPending ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>
    )
}