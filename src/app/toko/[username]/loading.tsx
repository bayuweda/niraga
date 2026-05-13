export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-store mx-auto pb-14">
        {/* Store Header Skeleton */}
        <div className="bg-white border-b border-gray-200 mb-5">
          <div className="h-20 bg-gradient-to-r from-green-600 to-green-500 relative" />
          <div className="px-6 pt-3 pb-6 text-center">
            <div className="flex justify-center">
              <div className="w-[76px] h-[76px] bg-gray-200 rounded-[20px] -mt-10 animate-pulse" />
            </div>
            <div className="mt-3 mb-1.5">
              <div className="h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
            </div>
            <div className="max-w-[280px] mx-auto mb-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
            </div>
            <div className="flex gap-1.5 justify-center flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Products Skeleton */}
        <div className="px-4 mb-6">
          <div className="h-3 bg-gray-200 rounded w-32 mb-3 animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="w-full aspect-square bg-gray-200 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="h-8 bg-gray-200 mx-3 mb-3 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
