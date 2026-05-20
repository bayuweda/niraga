import {
  LayoutDashboard, Package, ClipboardList, Link, Settings,
  Store, ShoppingCart, MessageCircle, DollarSign, TrendingUp, TrendingDown,
  User, Plus, ChevronRight, ChevronLeft, Check, X, Pencil, ArrowUpRight, ArrowDownRight,
  Search, Camera, Save, ExternalLink, Share2, Copy, ArrowLeft, ShoppingBag,
  Sparkles, Star, Clock, Truck, Zap, FileText, Pointer, Eye, type LucideProps,
} from 'lucide-react'

export const Icon = {
  Dashboard: (props: LucideProps) => <LayoutDashboard {...props} />,
  Package: (props: LucideProps) => <Package {...props} />,
  Orders: (props: LucideProps) => <ClipboardList {...props} />,
  Link: (props: LucideProps) => <Link {...props} />,
  Settings: (props: LucideProps) => <Settings {...props} />,
  Store: (props: LucideProps) => <Store {...props} />,
  Cart: (props: LucideProps) => <ShoppingCart {...props} />,
  Chat: (props: LucideProps) => <MessageCircle {...props} />,
  Money: (props: LucideProps) => <DollarSign {...props} />,
  TrendingUp: (props: LucideProps) => <TrendingUp {...props} />,
  TrendingDown: (props: LucideProps) => <TrendingDown {...props} />,
  User: (props: LucideProps) => <User {...props} />,
  Plus: (props: LucideProps) => <Plus {...props} />,
  ChevronRight: (props: LucideProps) => <ChevronRight {...props} />,
  ChevronLeft: (props: LucideProps) => <ChevronLeft {...props} />,
  Check: (props: LucideProps) => <Check {...props} />,
  X: (props: LucideProps) => <X {...props} />,
  Pencil: (props: LucideProps) => <Pencil {...props} />,
  ArrowUpRight: (props: LucideProps) => <ArrowUpRight {...props} />,
  ArrowDownRight: (props: LucideProps) => <ArrowDownRight {...props} />,
  Search: (props: LucideProps) => <Search {...props} />,
  Camera: (props: LucideProps) => <Camera {...props} />,
  Save: (props: LucideProps) => <Save {...props} />,
  ExternalLink: (props: LucideProps) => <ExternalLink {...props} />,
  Share2: (props: LucideProps) => <Share2 {...props} />,
  Copy: (props: LucideProps) => <Copy {...props} />,
  ArrowLeft: (props: LucideProps) => <ArrowLeft {...props} />,
  ShoppingBag: (props: LucideProps) => <ShoppingBag {...props} />,
  Sparkles: (props: LucideProps) => <Sparkles {...props} />,
  Star: (props: LucideProps) => <Star {...props} />,
  Clock: (props: LucideProps) => <Clock {...props} />,
  Truck: (props: LucideProps) => <Truck {...props} />,
  Zap: (props: LucideProps) => <Zap {...props} />,
  FileText: (props: LucideProps) => <FileText {...props} />,
  Hand: (props: LucideProps) => <Pointer {...props} />,
  Eye: (props: LucideProps) => <Eye {...props} />,
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.019.597 3.898 1.621 5.475L2 22l4.682-1.553A9.963 9.963 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="#25D366"/>
      <path d="M8.3 7.1c-.2-.3-.3-.3-.5-.3h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.5 2.4 3.7 3.3 2.2.9 2.2.6 2.6.6s1.3-.5 1.5-1c.2-.5.2-.9.1-1-.1-.1-.2-.2-.5-.4l-1.5-.7s-.3-.1-.5.1l-.7.8c-.1.1-.2.2-.4.1-.6-.2-1.1-.5-1.5-.9-.4-.4-.7-.8-.9-1.3 0-.1 0-.2.1-.3l.5-.6s.2-.2.1-.4l-.7-1.6c-.2-.4-.3-.4-.5-.4h-.4z" fill="#fff"/>
    </svg>
  )
}

export function TelegramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#0088cc"/>
      <path d="M16.15 7.35l-9.5 3.7c-.5.2-.5.5-.1.6l2.4.8 1.1 3.4c.1.3.2.3.4.2l1.6-1.3 2.8 2.1c.3.2.5.1.6-.2l2.2-10.4c.1-.5-.2-.7-.5-.5z" fill="#fff"/>
    </svg>
  )
}

export function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <radialGradient id="ig" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="25%" stopColor="#fdf497"/>
        <stop offset="50%" stopColor="#fd5949"/>
        <stop offset="75%" stopColor="#d6249f"/>
        <stop offset="100%" stopColor="#285AEB"/>
      </radialGradient>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig)"/>
      <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.5" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
      <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" stroke="#fff" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}
