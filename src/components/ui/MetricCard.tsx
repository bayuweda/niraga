import { cn } from '@/lib/utils'
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react'

type Trend = 'up' | 'down' | 'neutral'

interface MetricCardProps {
  label: string
  value: string
  change: string
  trend: Trend
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
}: MetricCardProps) {
  return (
    <div className="card-base flex flex-col gap-2">
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
}
