import { cn } from '@/lib/utils'

type BadgeVariant = 'new' | 'confirmed' | 'done' | 'tag'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  new: 'bg-orange-50 text-orange-700 border border-orange-200',
  confirmed: 'bg-green-50 text-green-700 border border-green-200',
  done: 'bg-gray-100 text-gray-500 border border-gray-200',
  tag: 'tag-badge',
}

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
