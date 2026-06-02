import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import HabitsCheckListWrapper from "@/components/habits/habits-check-list-wrapper";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in-up">
            <div className="mb-8">
                <div className="flex items-end justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
                            Today
                        </h1>
                        <p className="text-stone-500 mt-1">{today}</p>
                    </div>
                    <Link
                        href="/habits/new"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all"
                    >
                        <Plus className="size-4" />
                        New Habit
                    </Link>
                </div>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <HabitsCheckListWrapper />
            </Suspense>
        </div>
    )
}