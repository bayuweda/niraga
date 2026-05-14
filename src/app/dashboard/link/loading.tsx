export default function LinkLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      <div className="hidden lg:block w-56 bg-white border-r border-gray-200 p-4 space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
      <main className="flex-1 px-4 py-5 sm:p-6 lg:p-10 min-w-0">
        <div className="h-8 bg-gray-200 rounded w-24 mb-6 animate-pulse" />
        <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-5">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="flex items-center gap-2.5 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="flex-1 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 bg-gray-200 rounded-lg w-16 animate-pulse" />
          </div>
          <div className="h-20 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </main>
    </div>
  )
}
