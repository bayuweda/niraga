export default function ProdukLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <div className="hidden lg:block w-56 bg-white border-r border-gray-200 p-4 space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-2xl w-36 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="w-full aspect-square bg-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
