import { Skeleton } from "~/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 px-20 py-10">
      <section className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-card flex flex-col gap-6 p-5 rounded-lg border-l-4 border-accent/30"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </section>
    </div>
  )
}