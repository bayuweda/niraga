export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container-app flex items-center justify-between h-full">
        <div className="font-display italic font-bold text-green-700 text-xl">
          Nira<span className="text-green-600">ga</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="btn-outline text-sm py-2 px-5 hidden sm:inline-flex"
          >
            Masuk
          </a>
          <a
            href="#"
            className="btn-primary text-sm py-2 px-5"
          >
            Daftar Gratis
          </a>
        </div>
      </div>
    </nav>
  )
}
