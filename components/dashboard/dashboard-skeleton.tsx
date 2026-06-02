export default function DashboardSkeleton() {
    return (
        <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="p-5 bg-white border border-stone-200 rounded-xl animate-pulse"
                >
                    <div className="flex items-center gap-4">
                        <div className="size-6 bg-stone-200 rounded-md" />
                        <div className="flex-1 h-5 bg-stone-200 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    )
}