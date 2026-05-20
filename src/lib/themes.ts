export const STORE_THEMES = [
  { id: 'green',  label: 'Hijau',   primary: '#16a34a', light: '#f0fdf4', border: '#bbf7d0' },
  { id: 'blue',   label: 'Biru',    primary: '#2563eb', light: '#eff6ff', border: '#bfdbfe' },
  { id: 'purple', label: 'Ungu',    primary: '#7c3aed', light: '#f5f3ff', border: '#ddd6fe' },
  { id: 'orange', label: 'Oranye',  primary: '#ea580c', light: '#fff7ed', border: '#fed7aa' },
  { id: 'pink',   label: 'Pink',    primary: '#db2777', light: '#fdf2f8', border: '#fbcfe8' },
  { id: 'dark',   label: 'Gelap',   primary: '#0f172a', light: '#f8fafc', border: '#e2e8f0' },
] as const

export type ThemeId = typeof STORE_THEMES[number]['id']

export function getTheme(themeId?: string) {
  return STORE_THEMES.find(t => t.id === themeId) || STORE_THEMES[0]
}

export function getThemeByColor(color?: string | null) {
  if (!color) return STORE_THEMES[0]
  return STORE_THEMES.find(t => t.primary === color) || STORE_THEMES[0]
}
