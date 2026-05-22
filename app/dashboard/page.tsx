import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import HabitsCheckListWrapper from "@/components/habits/habits-check-list-wrapper";
import { Suspense } from "react";

export default async function DashboardPage() {
    return (
        <div>
            <Suspense fallback={<DashboardSkeleton />}>
                <HabitsCheckListWrapper />
            </Suspense>
        </div>
    )
}