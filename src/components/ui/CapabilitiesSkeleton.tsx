import { Skeleton } from "@/components/ui/skeleton"

export default function CapabilitiesSkeleton() {
  return (
    <div className='flex justify-center items-center my-14 md:my-15'>
      <div className='flex flex-col lg:flex-row lg:justify-between max-w-7xl p-5 gap-5 lg:gap-10 w-full'>
        <div className='w-full lg:w-1/2'>
          <Skeleton className="h-16 w-3/4 bg-gray-800/50" />
        </div>
        <div className='w-full flex flex-col lg:w-1/2'>
          <Skeleton className="h-24 w-full bg-gray-800/50 mt-3" />
          <div className='mt-10 flex flex-wrap gap-5'>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <Skeleton
                key={index}
                className='h-12 w-32 rounded-full bg-gray-800/50'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}