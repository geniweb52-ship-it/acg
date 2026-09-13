export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  image: string
  features: string[]
  color?: string
}

export interface Project {
  id: string
  title: string
  sector: 'immobilier' | 'logistique' | 'communication' | 'livraison'
  description: string
  image: string
  year: number
  client?: string
  location?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  image: string
  date: string
  category: string
  author?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface Stat {
  value: string
  label: string
}

// ── Immobilier ──────────────────────────────────────────────
export type PropertyType = 'vente' | 'location'
export type PropertyCategory =
  | 'appartement'
  | 'maison'
  | 'immeuble'
  | 'bureau'
  | 'villa'
  | 'terrain'

export interface Property {
  id: string
  slug: string
  title: string
  type: PropertyType           // vente ou location
  category: PropertyCategory
  price: number
  priceSuffix?: string         // "/mois" pour location
  currency: string             // "FCFA" | "€" | "$"
  location: string
  city: string
  surface: number              // m²
  rooms?: number
  bathrooms?: number
  description: string
  features: string[]
  images: string[]
  published: boolean
  createdAt: string
  whatsappNumber: string       // numéro spécifique de l'annonce
}

// ── Admin ────────────────────────────────────────────────────
export interface AdminUser {
  username: string
  passwordHash: string         // en prod : géré côté serveur
}
