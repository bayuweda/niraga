export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <div className="hidden lg:block w-56 bg-white border-r border-gray-200 p-4 space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-40 mb-7 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border border-gray-200 rounded-3xl p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-28 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="h-5 bg-gray-200 rounded w-32 mb-5 animate-pulse" />
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 p-3.5 mb-2.5">
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-2 bg-gray-200 rounded w-40 animate-pulse" />
                </div>
                <div className="text-right space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse ml-auto" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="h-5 bg-gray-200 rounded w-20 mb-5 animate-pulse" />
            <div className="h-20 bg-gray-200 rounded-2xl mb-4 animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-xl mb-4 animate-pulse" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map(i => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-1">
                  <div className="h-6 bg-gray-200 rounded w-8 animate-pulse mx-auto" />
                  <div className="h-2 bg-gray-200 rounded w-16 animate-pulse mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
