'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTempStore } from '@/lib/temp-store'
import ProductCard from '@/components/ui/ProductCard'
import { formatRupiah } from '@/lib/utils'

export default function BuatTokoPage() {
  const router = useRouter()
  const {
    storeName,
    whatsapp,
    products,
    addProduct,
    removeProduct,
    updateStoreName,
    updateWhatsapp,
  } = useTempStore()

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: '',
    imageUrl: '',
    imageBase64: '',
  })
  const fileInputRef = { current: null as any }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate: max 2MB, image only
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran maksimal 2MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setNewProduct((prev) => ({ ...prev, imageBase64: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setNewProduct((prev) => ({ ...prev, imageBase64: '', imageUrl: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const [showPreview, setShowPreview] = useState(false)

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return

    addProduct({
      ...newProduct,
      price: parseInt(newProduct.price),
      imageBase64: newProduct.imageBase64,
    })

    setNewProduct({ name: '', price: '', unit: '', imageUrl: '', imageBase64: '' })
  }

  const canPreview = storeName && products.length > 0

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* NAVBAR SIMPLE */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container-app flex items-center justify-between h-full">
          <div className="font-display italic font-bold text-green-700 text-xl">
            Nira<span className="text-green-600">ga</span>
          </div>
          {canPreview && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-outline text-sm py-2 px-5"
            >
              {showPreview ? 'Sembunyikan Preview' : 'Lihat Preview →'}
            </button>
          )}
        </div>
      </nav>

      <div className="container-app py-10">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-gray-900 text-3xl md:text-4xl mb-3">
              Buat Toko dalam 1 Menit
            </h1>
            <p className="text-gray-500">
              Input produk, dapat link, share ke pelanggan. Tanpa daftar dulu!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* LEFT: FORM */}
            <div className="space-y-6">
              {/* STORE INFO */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6">
                <div className="text-sm font-bold text-gray-900 mb-4">Info Toko</div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Nama Toko
                    </label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => updateStoreName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="Toko Saya"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Nomor WhatsApp (untuk order)
                    </label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => updateWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="6281234567890"
                    />
                  </div>
                </div>
              </div>

              {/* ADD PRODUCT */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6">
                <div className="text-sm font-bold text-gray-900 mb-4">Tambah Produk</div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="Siomay Frozen"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Harga (Rp)
                      </label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        placeholder="45000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Unit
                      </label>
                      <input
                        type="text"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                        placeholder="isi 20 pcs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Foto Produk
                    </label>
                    
                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {/* Upload Button / Preview */}
                    {newProduct.imageBase64 ? (
                      <div className="relative">
                        <img
                          src={newProduct.imageBase64}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-green-500 hover:text-green-600 transition-colors"
                      >
                        <span className="text-2xl">📷</span>
                        <span className="text-xs">Klik untuk upload gambar</span>
                        <span className="text-[10px]">Maks 2MB</span>
                      </button>
                    )}

                    {/* Optional URL fallback */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-xs text-gray-400">atau</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    <input
                      type="text"
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value, imageBase64: '' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      placeholder="URL gambar (opsional)"
                    />
                  </div>

                  <button
                    onClick={handleAddProduct}
                    disabled={!newProduct.name || !newProduct.price}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    + Tambah Produk
                  </button>
                </div>
              </div>

              {/* PRODUCT LIST */}
              {products.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-3xl p-6">
                  <div className="text-sm font-bold text-gray-900 mb-4">
                    Produk ({products.length})
                  </div>

                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        {(product.imageBase64 || product.imageUrl) ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.imageBase64 || product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-xl flex-shrink-0">
                            📦
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-green-700 font-semibold">
                            {formatRupiah(product.price)} / {product.unit}
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: LIVE PREVIEW */}
            <div className="lg:sticky lg:top-20 self-start">
              <div className="bg-white border border-gray-200 rounded-3xl p-6">
                <div className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                  <span>Preview Toko</span>
                  {products.length >= 5 && (
                    <span className="text-xs text-amber-600 font-medium">
                      Limit free: {products.length}/5
                    </span>
                  )}
                </div>

                {!showPreview ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    {canPreview
                      ? 'Klik "Lihat Preview" untuk melihat toko'
                      : 'Input nama toko & minimal 1 produk'}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="font-display font-bold text-gray-900 mb-1">
                        {storeName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {products.length} produk tersedia
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {products.slice(0, 4).map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          {(product.imageBase64 || product.imageUrl) ? (
                            <div className="w-full aspect-square relative">
                              <img
                                src={product.imageBase64 || product.imageUrl!}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-square bg-green-50 flex items-center justify-center text-3xl">
                              📦
                            </div>
                          )}
                          <div className="p-2">
                            <div className="text-xs font-bold text-gray-900 truncate">
                              {product.name}
                            </div>
                            <div className="text-xs text-green-700 font-semibold">
                              {formatRupiah(product.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      disabled={!whatsapp}
                      className="btn-primary w-full justify-center text-xs py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Pesan Lewat WhatsApp
                    </button>
                  </div>
                )}
              </div>

              {/* CTA */}
              {canPreview && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => {
                      // TODO: Generate unique link & prompt login
                      alert('Link toko: niraga.id/toko/' + storeName.toLowerCase().replace(/\s+/g, '-'))
                    }}
                    className="btn-primary w-full justify-center"
                  >
                    Buat Link Toko →
                  </button>
                  <p className="text-xs text-gray-400 mt-2">
                    Login diperlukan untuk menyimpan toko
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
