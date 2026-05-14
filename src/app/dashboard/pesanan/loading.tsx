export default function PesananLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <div className="hidden lg:block w-56 bg-white border-r border-gray-200 p-4 space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
        <div className="h-8 bg-gray-200 rounded w-36 mb-6 animate-pulse" />
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-2 bg-gray-200 rounded w-48 animate-pulse" />
              </div>
              <div className="text-right space-y-1">
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse ml-auto" />
                <div className="h-4 bg-gray-200 rounded w-14 animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
