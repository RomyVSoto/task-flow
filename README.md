# TaskFlow

A full-stack Kanban board for organizing tasks across projects. Create boards, add tasks with priorities and due dates, and drag them between columns seamlessly.

## Features

- Authentication with NextAuth — register, login, JWT sessions
- Protected routes with Next.js middleware
- Create and manage multiple Kanban boards
- Tasks with title, description, priority and due date
- Drag and drop between columns powered by dnd-kit
- Edit profile with real-time session update
- Skeleton loaders and loading states
- Responsive design

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **API:** tRPC — end-to-end typesafe API
- **Auth:** NextAuth.js with Credentials provider
- **Styling:** TailwindCSS + Shadcn UI
- **Drag and Drop:** dnd-kit
- **Validation:** Zod

## Getting Started

1. Clone the repository
```bash
   git clone https://github.com/RomyVSoto/task-flow.git
   cd task-flow
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file

```
DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Push the schema to your database
```bash
   npx prisma db push
```

5. Run the development server
```bash
   npm run dev
```
