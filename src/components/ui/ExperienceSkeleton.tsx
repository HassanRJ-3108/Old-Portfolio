import { Skeleton } from "@/components/ui/skeleton"

export default function ExperienceSkeleton() {
  return (
    <div className='flex justify-center items-center my-14 md:my-15'>
      <div className='flex flex-col lg:flex-row lg:justify-between max-w-7xl p-5 gap-5 lg:gap-10 w-full'>
        <div className='w-full lg:w-1/2'>
          <Skeleton className="h-16 w-3/4 bg-gray-800/50" />
        </div>
        <div className='w-full flex flex-col lg:w-1/2'>
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="mb-10">
              <div className='md:flex justify-between items-center'>
                <Skeleton className="h-6 w-1/2 bg-gray-800/50 mb-2 md:mb-0" />
                <Skeleton className="h-4 w-1/3 bg-gray-800/50" />
              </div>
              <Skeleton className="h-4 w-1/4 bg-gray-800/50 mt-1 md:mt-2" />
              <Skeleton className="h-20 w-full bg-gray-800/50 mt-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}