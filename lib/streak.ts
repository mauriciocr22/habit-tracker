export function calculateStreak(logs: { date: Date }[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;

    while (true) {
        const hasLog = logs.some(log => log.date.toDateString() === today.toDateString())
        if (!hasLog) break
        streak++;
        today.setDate(today.getDate() - 1);
    }

    return streak;
}