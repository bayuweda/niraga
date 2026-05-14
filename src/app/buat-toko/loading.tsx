export default function BuatTokoLoading() {
  return (
    <div className="min-h-screen bg-cream pt-16">
      <div className="text-center pt-10 md:pt-16 pb-0 px-4">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
      </div>
      <div className="flex items-center justify-center gap-0 py-8 md:py-10 px-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-16 mt-1.5 animate-pulse" />
            </div>
            {i < 3 && <div className="h-0.5 w-[40px] md:w-20 bg-gray-200 mx-1 mb-5 animate-pulse" />}
          </div>
        ))}
      </div>
      <div className="max-w-[560px] mx-auto px-4 pb-[60px]">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-card-sm space-y-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
              <div className="h-11 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          ))}
          <div className="h-12 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
