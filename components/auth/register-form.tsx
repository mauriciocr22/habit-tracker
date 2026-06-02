'use client';
import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    return (
        <div className="min-h-[calc(100vh-76px)] flex items-center justify-center px-6 py-12 animate-fade-in-up">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-3">
                        Start your journey
                    </h1>
                    <p className="text-stone-600">
                        Create an account to begin tracking your habits
                    </p>
                </div>

                <form action={formAction} className="space-y-6 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-stone-900">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-stone-900">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-stone-900">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="••••••••"
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
                        {isPending ? "Creating account..." : "Sign Up"}
                    </button>

                    <p className="text-center text-sm text-stone-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}