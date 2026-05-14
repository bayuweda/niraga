import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'

type Trend = 'up' | 'down' | 'neutral'

interface MetricCardProps {
  label: React.ReactNode
  value: string
  change: string
  trend: Trend
  href?: string
}

const trendStyles: Record<Trend, string> = {
  up: 'text-green-600',
  down: 'text-red-500',
  neutral: 'text-gray-400',
}

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === 'up') return <ArrowUpRight size={14} />
  if (trend === 'down') return <ArrowDownRight size={14} />
  return <Minus size={14} />
}

export default function MetricCard({
  label,
  value,
  change,
  trend,
  href,
}: MetricCardProps) {
  const inner = (
    <div className="card-base flex flex-col gap-2 cursor-pointer">
      <div className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
        {label}
      </div>
      <div className="font-display font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight">
        {value}
      </div>
      <div
        className={cn(
          'text-xs font-semibold flex items-center gap-1',
          trendStyles[trend]
        )}
      >
        <TrendIcon trend={trend} />
        {change}
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{inner}</Link>
  }

  return inner
}
