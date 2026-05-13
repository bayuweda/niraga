import { formatRupiah } from '@/lib/utils'

interface ProductCardProps {
  emoji?: string
  imageUrl?: string
  name: string
  price: number
  unit: string
  bgColor?: string
  selected?: boolean
  quantity?: number
  onSelect?: () => void
  onQtyChange?: (qty: number) => void
}

export default function ProductCard({
  emoji,
  imageUrl,
  name,
  price,
  unit,
  bgColor = '#f0fdf4',
  selected = false,
  quantity = 0,
  onSelect,
  onQtyChange,
}: ProductCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 relative ${selected ? 'border-green-500 shadow-[0_0_0_3px_rgba(22,163,74,.12)]' : 'border-gray-200 hover:border-green-200 hover:shadow-[0_6px_20px_rgba(22,163,74,.1)] hover:-translate-y-0.5'}`}
    >
      {/* Product Image */}
      <div className="w-full aspect-square relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: bgColor }}
          >
            {emoji}
          </div>
        )}
      </div>

      {/* Check Mark */}
      <div className={`absolute top-2 right-2 w-[22px] h-[22px] rounded-full bg-green-600 text-white text-[11px] flex items-center justify-center transition-all duration-200 ${selected ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.6]'}`}>
        ✓
      </div>

      {/* Product Body */}
      <div className="p-2.5">
        <div className="text-xs font-bold text-gray-900 mb-0.5 leading-tight line-clamp-2">{name}</div>
        <div className="text-sm font-bold text-green-600">
          {formatRupiah(price)} <span className="text-[10px] text-gray-500 font-normal">/ {unit}</span>
        </div>
      </div>

      {/* Quantity Controls */}
      {selected && quantity > 0 && (
        <div className="flex items-center justify-center gap-2 p-2 bg-green-50 border-t border-green-200" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onQtyChange?.(quantity - 1)}
            className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 text-sm font-bold flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors font-sans"
          >
            −
          </button>
          <div className="text-sm font-bold text-gray-900 min-w-4 text-center">{quantity}</div>
          <button
            onClick={() => onQtyChange?.(quantity + 1)}
            className="w-6 h-6 rounded-full bg-white border border-green-200 text-green-600 text-sm font-bold flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors font-sans"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}