import {
  LayoutDashboard, Package, ClipboardList, Link, Settings,
  Store, ShoppingCart, MessageCircle, DollarSign, TrendingUp, TrendingDown,
  User, Plus, ChevronRight, ChevronLeft, Check, X, Pencil, ArrowUpRight, ArrowDownRight,
  Search, Camera, Save, ExternalLink, Share2, Copy, ArrowLeft, ShoppingBag,
  Sparkles, Star, Clock, Truck, Zap, FileText, Pointer, Eye, type LucideProps,
} from 'lucide-react'
import { FaWhatsapp, FaTelegram, FaInstagram } from 'react-icons/fa'

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
  return <FaWhatsapp size={size} />
}

export function TelegramIcon({ size = 24 }: { size?: number }) {
  return <FaTelegram size={size} />
}

export function InstagramIcon({ size = 24 }: { size?: number }) {
  return <FaInstagram size={size} />
}
