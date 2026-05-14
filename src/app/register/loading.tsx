export default function RegisterLoading() {
  return (
    <div className="min-h-screen bg-cream pt-16 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-card-sm w-full max-w-[400px] space-y-5">
        <div className="text-center space-y-2">
          <div className="h-8 bg-gray-200 rounded w-36 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-56 mx-auto animate-pulse" />
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-11 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        ))}
        <div className="h-11 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}
