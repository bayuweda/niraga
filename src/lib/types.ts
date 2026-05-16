export interface Store {
  id: string
  user_id: string
  name: string
  slug: string
  description: string | null
  logo_emoji: string
  whatsapp: string | null
  shipping_info: string | null
  payment_info: string | null
  banner_url: string | null
  status: 'active' | 'inactive'
  created_at: string
}

export interface Product {
  id: string
  store_id: string
  name: string
  emoji: string
  price: number
  unit: string
  bg_color: string
  stock: number
  is_active: boolean
  image_url: string | null
  created_at: string
}

export interface Order {
  id: string
  store_id: string
  customer_name: string
  customer_contact: string | null
  items: OrderItem[]
  total: number
  notes: string | null
  status: 'new' | 'confirmed' | 'done' | 'cancelled'
  created_at: string
}

export interface OrderItem {
  product_id: string
  name: string
  qty: number
  price: number
}

export interface BotSettings {
  id: string
  store_id: string
  telegram_token: string | null
  bot_username: string | null
  prompt_personality: string
  auto_reply_enabled: boolean
  created_at: string
}

export interface ChatLog {
  id: string
  store_id: string
  sender: 'user' | 'bot'
  message: string
  response: string | null
  created_at: string
}
