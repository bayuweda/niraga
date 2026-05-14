export default function NavbarSkeleton() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-[56px] h-16 flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-9 bg-gray-200 rounded-full w-20 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded-2xl w-28 animate-pulse" />
        </div>
      </div>
    </header>
  )
}
