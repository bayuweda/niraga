'use client'

import { create } from 'zustand'

interface TempProduct {
  id: string
  name: string
  price: number
  unit: string
  imageUrl?: string
  imageBase64?: string // Untuk upload preview
  description?: string
}

interface TempStoreState {
  storeName: string
  whatsapp: string
  products: TempProduct[]
  addProduct: (product: Omit<TempProduct, 'id'>) => void
  removeProduct: (id: string) => void
  updateStoreName: (name: string) => void
  updateWhatsapp: (phone: string) => void
  clearAll: () => void
}

export const useTempStore = create<TempStoreState>((set) => ({
  storeName: 'Toko Saya',
  whatsapp: '',
  products: [],

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Date.now().toString() },
      ],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateStoreName: (name) => set({ storeName: name }),

  updateWhatsapp: (phone) => set({ whatsapp: phone }),

  clearAll: () => set({ storeName: 'Toko Saya', whatsapp: '', products: [] }),
}))
