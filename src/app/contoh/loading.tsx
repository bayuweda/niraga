import NavbarSkeleton from '@/components/ui/NavbarSkeleton'

export default function ContohLoading() {
  return (
    <main className="min-h-screen bg-cream pt-16">
      <NavbarSkeleton />
      <div className="container-app py-10 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-72 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="w-full aspect-square bg-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
