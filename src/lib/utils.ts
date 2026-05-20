import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function generateReminderMessage(
  storeName: string,
  customerName: string,
  items: { name: string; qty: number; price: number }[],
  orderedAt?: string
): string {
  const lines = items
    .map(i => `• ${i.name} × ${i.qty} — ${formatRupiah(i.price * i.qty)}`)
    .join('\n')
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const timeAgo = orderedAt ? `(order masuk ${orderedAt})` : ''

  return `Halo ${customerName}! 👋

Mau mengingatkan untuk pesananmu di ${storeName} ya ${timeAgo}:

${lines}

*Total: ${formatRupiah(total)}*

Apakah pesanannya jadi dilanjutkan? Kalau ada pertanyaan, langsung balas chat ini ya kak 😊`
}
