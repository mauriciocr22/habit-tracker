'use client';
import { useActionState } from "react";
import { loginUser } from "@/app/actions/auth";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginUser, null);

    return (
        <div>
            <form action={formAction}>
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
                    {isPending ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    )
}