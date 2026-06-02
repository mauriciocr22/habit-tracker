import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center px-6">
      <div className="max-w-2xl text-center animate-fade-in-up">
        <h1 className="text-5xl font-semibold tracking-tight text-stone-900 mb-6">
          Track your habits, build consistency
        </h1>
        <p className="text-lg text-stone-600 mb-10 leading-relaxed">
          A simple tool to help you stay accountable to your daily habits.
          Track progress, build streaks, and develop lasting routines.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-stone-300 text-stone-700 font-medium rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
