import { Skeleton } from "~/components/ui/skeleton"

export default function BoardLoading() {
  return (
    <div className="p-10 flex justify-center gap-14">
      {Array.from({ length: 3 }).map((_, i) => (
        <section key={i} className="w-full max-w-xs space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-8 rounded-md bg-accent-light" />
            </div>
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>

          <div className="bg-column min-h-80 rounded-md p-3 flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="bg-card flex flex-col gap-6 p-4 rounded-md">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 rounded-xs" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}