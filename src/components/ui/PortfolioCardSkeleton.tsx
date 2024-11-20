import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioCardSkeleton() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-11">
        <div className="w-full lg:w-1/2 bg-[#1A1A1A] rounded-2xl py-32 px-16">
          <div className="w-full h-full flex justify-center items-center">
            <Skeleton className="w-full h-full bg-gray-800/50" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
          <div className="flex flex-col items-start w-full">
            <Skeleton className="h-10 w-3/4 bg-gray-800/50 mb-6" />
            <Skeleton className="h-24 w-full bg-gray-800/50 mb-6" />
            <Skeleton className="h-6 w-1/3 bg-gray-800/50 mt-6 mb-4" />
            <Skeleton className="h-px w-full bg-white/20 my-4" />
            <div className="flex justify-between w-full">
              <Skeleton className="h-4 w-1/4 bg-gray-800/50" />
              <Skeleton className="h-4 w-1/4 bg-gray-800/50" />
            </div>
            <Skeleton className="h-px w-full bg-white/20 my-4" />
            <div className="flex justify-between w-full">
              <Skeleton className="h-4 w-1/4 bg-gray-800/50" />
              <Skeleton className="h-4 w-1/3 bg-gray-800/50" />
            </div>
            <Skeleton className="h-px w-full bg-white/20 my-4" />
          </div>
          <div className="flex gap-5 mt-10">
            <Skeleton className="h-6 w-24 bg-gray-800/50" />
            <Skeleton className="h-6 w-32 bg-gray-800/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
