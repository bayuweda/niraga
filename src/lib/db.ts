import { getSupabaseClient } from './supabase'
import type { PostgrestError } from '@supabase/supabase-js'

type Result<T> = { data: T; error: null } | { data: null; error: PostgrestError | string }

// --- STORES ---

export async function getStoreBySlug(slug: string) {
  const supabase = getSupabaseClient()
  return supabase.from('stores').select('*').eq('slug', slug).single()
}

export async function getStoreByUserId(userId: string) {
  const supabase = getSupabaseClient()
  return supabase.from('stores').select('*').eq('user_id', userId).single()
}

export async function createStore(store: {
  user_id: string
  name: string
  slug: string
  description?: string
  logo_emoji?: string
  whatsapp?: string
  shipping_info?: string
}) {
  const supabase = getSupabaseClient()
  return supabase.from('stores').insert(store).select().single()
}

export async function updateStore(id: string, updates: Partial<{
  name: string
  description: string
  logo_emoji: string
  whatsapp: string
  shipping_info: string
  payment_info: string
  qris_url: string
  banner_url: string | null
  status: 'active' | 'inactive'
}>) {
  const supabase = getSupabaseClient()
  return supabase.from('stores').update(updates).eq('id', id).select().single()
}

export async function deleteStore(id: string) {
  const supabase = getSupabaseClient()
  return supabase.from('stores').delete().eq('id', id)
}

// --- PRODUCTS ---

export async function getProductsByStoreId(storeId: string, includeInactive = false) {
  const supabase = getSupabaseClient()
  let query = supabase.from('products').select('*').eq('store_id', storeId).order('created_at')
  if (!includeInactive) query = query.eq('is_active', true)
  return query
}

export async function createProduct(product: {
  store_id: string
  name: string
  price: number
  unit: string
  emoji?: string
  bg_color?: string
  stock?: number
  image_url?: string
}) {
  const supabase = getSupabaseClient()
  return supabase.from('products').insert(product).select().single()
}

export async function updateProduct(id: string, updates: Partial<{
  name: string
  price: number
  unit: string
  emoji: string
  bg_color: string
  stock: number
  is_active: boolean
  image_url: string
}>) {
  const supabase = getSupabaseClient()
  return supabase.from('products').update(updates).eq('id', id).select().single()
}

export async function deleteProduct(id: string) {
  const supabase = getSupabaseClient()
  return supabase.from('products').delete().eq('id', id)
}

// --- ORDERS ---

export async function getOrdersByStoreId(storeId: string) {
  const supabase = getSupabaseClient()
  return supabase.from('orders').select('*').eq('store_id', storeId).order('created_at', { ascending: false })
}

export async function createOrder(order: {
  store_id: string
  customer_name?: string
  customer_contact?: string
  notes?: string
  items: { product_id: string; name: string; qty: number; price: number }[]
  total: number
}) {
  const supabase = getSupabaseClient()
  return supabase.from('orders').insert({ ...order, customer_name: order.customer_name || '' }).select().single()
}

export async function updateOrderStatus(id: string, status: 'new' | 'confirmed' | 'done' | 'cancelled') {
  const supabase = getSupabaseClient()
  return supabase.from('orders').update({ status }).eq('id', id).select().single()
}

export async function deleteOrder(id: string) {
  const supabase = getSupabaseClient()
  return supabase.from('orders').delete().eq('id', id)
}

// --- DASHBOARD METRICS ---

export async function getDashboardMetrics(storeId: string) {
  const supabase = getSupabaseClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const paidStatuses = ['confirmed', 'done']

  const [ordersRes, todayOrdersRes, productsRes, chatRes] = await Promise.all([
    supabase.from('orders').select('total').eq('store_id', storeId).in('status', paidStatuses),
    supabase.from('orders').select('id, total').eq('store_id', storeId).gte('created_at', today.toISOString()).in('status', paidStatuses),
    supabase.from('products').select('id, stock').eq('store_id', storeId).eq('is_active', true),
    supabase.from('chat_logs').select('id, sender').eq('store_id', storeId).gte('created_at', today.toISOString()),
  ])

  const totalRevenue = ordersRes.data?.reduce((sum: number, o: any) => sum + o.total, 0) ?? 0
  const todayRevenue = todayOrdersRes.data?.reduce((sum: number, o: any) => sum + o.total, 0) ?? 0
  const todayOrders = todayOrdersRes.data?.length ?? 0
  const activeProducts = productsRes.data?.length ?? 0
  const lowStockProducts = productsRes.data?.filter((p: any) => p.stock !== null && p.stock <= 2).length ?? 0
  const todayChats = chatRes.data?.length ?? 0
  const autoReplied = chatRes.data?.filter((c: any) => c.sender === 'bot').length ?? 0
  const autoReplyRate = todayChats > 0 ? Math.round((autoReplied / todayChats) * 100) : 0

  return {
    totalRevenue,
    todayRevenue,
    todayOrders,
    activeProducts,
    lowStockProducts,
    todayChats,
    autoReplyRate,
  }
}

// --- CHAT LOGS ---

export async function getChatLogs(storeId: string) {
  const supabase = getSupabaseClient()
  return supabase.from('chat_logs').select('*').eq('store_id', storeId).order('created_at', { ascending: false }).limit(50)
}

// --- BOT SETTINGS ---

export async function getBotSettings(storeId: string) {
  const supabase = getSupabaseClient()
  return supabase.from('bot_settings').select('*').eq('store_id', storeId).single()
}

export async function upsertBotSettings(settings: {
  store_id: string
  telegram_token?: string
  bot_username?: string
  prompt_personality?: string
  auto_reply_enabled?: boolean
}) {
  const supabase = getSupabaseClient()
  return supabase.from('bot_settings').upsert(settings).select().single()
}
