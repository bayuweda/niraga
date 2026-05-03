import { formatRupiah } from '@/lib/utils'
import Image from 'next/image'

interface ProductCardProps {
  emoji?: string
  imageUrl?: string
  name: string
  price: number
  unit: string
  bgColor?: string
}

export default function ProductCard({
  emoji,
  imageUrl,
  name,
  price,
  unit,
  bgColor,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-green-200 hover:shadow-green-sm hover:-translate-y-0.5">
      <div className="w-full aspect-square relative overflow-hidden">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 240px"
            />
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: bgColor }}
          >
            {emoji}
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="text-sm font-bold text-gray-900 mb-0.5">{name}</div>
        <div className="text-sm font-bold text-green-700">
          {formatRupiah(price)}
          <span className="text-xs text-gray-400 font-normal"> / {unit}</span>
        </div>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 transition-colors duration-150">
        Chat Penjual 💬
      </button>
    </div>
  )
}
