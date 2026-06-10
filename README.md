# Habit Tracker

A full-stack habit tracking app built with Next.js and React 19. Track daily habits, visualize your progress over time, and maintain streaks to build consistent routines.

## Features

- **Authentication** — Secure sign-up and login with hashed passwords via NextAuth v5
- **Habit Management** — Create, edit, and delete personal habits
- **Daily Check-ins** — Mark habits complete each day with optimistic UI updates
- **7-Day History** — Visual grid showing your completion status for the past week
- **Streak Counter** — Tracks consecutive days of completion per habit

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Database | PostgreSQL (Neon serverless) |
| ORM | Prisma |
| Auth | NextAuth v5 (credentials) |
| Validation | Zod |

## Concepts Practiced

This project was built to explore modern React and Next.js patterns:

- **React Server Components** — data fetching at the component level without useEffect
- **Server Actions** — form mutations without dedicated API routes
- **`useOptimistic`** — instant UI feedback before the server responds
- **Suspense** — streaming loading states with skeleton UI
- **Middleware** — route protection applied globally before rendering

## Getting Started

**Prerequisites:** Node.js 18+, a PostgreSQL database (e.g. [Neon](https://neon.tech))

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Fill in DATABASE_URL and AUTH_SECRET

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
app/
├── actions/       # Server actions (auth, habits, logs)
├── dashboard/     # Today's habit checklist
├── habits/        # Habit management (list, create, edit)
├── history/       # 7-day progress view
├── login/
└── register/

components/
├── auth/          # Login and register forms
├── habits/        # Habit list, check-in UI
├── history/       # Progress grid with streak logic
└── ui/            # shadcn primitives

lib/
├── prisma.ts      # Prisma client
├── session.ts     # Auth guard utility
└── streak.ts      # Streak calculation
```

## License

MIT
