import Link from "next/link";
import { auth } from "@/auth";
import { LogOut, Calendar, CheckSquare } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default async function Nav() {
  const session = await auth();

  return (
    <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="text-xl font-semibold tracking-tight text-stone-900 transition-colors group-hover:text-primary">
            Habit Tracker
          </h1>
        </Link>

        {session && (
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              <CheckSquare className="size-4" />
              <span>Today</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Calendar className="size-4" />
              <span>History</span>
            </Link>
            <form action={logoutUser}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
              >
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        )}

        {!session && (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
