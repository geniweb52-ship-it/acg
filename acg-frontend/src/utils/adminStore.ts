/**
 * Admin store — stockage local (localStorage).
 * En production, remplacer par appels API sécurisés côté serveur.
 */
import { Property } from '../types'
import { propertiesData } from './propertiesData'

const STORAGE_KEY = 'acg_properties'
const AUTH_KEY = 'acg_admin_auth'

// Identifiants admin par défaut (À changer en production !)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'acg2026',
}

// ── Authentification ─────────────────────────────────────────
export function adminLogin(username: string, password: string): boolean {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    sessionStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY)
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

// ── Properties CRUD ──────────────────────────────────────────
function loadProperties(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Property[]
  } catch {
    // ignore
  }
  // Initialise avec les données par défaut
  localStorage.setItem(STORAGE_KEY, JSON.stringify(propertiesData))
  return propertiesData
}

function saveProperties(list: Property[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function getAllProperties(): Property[] {
  return loadProperties()
}

export function getPublishedProperties(): Property[] {
  return loadProperties().filter((p) => p.published)
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return loadProperties().find((p) => p.slug === slug)
}

export function createProperty(data: Omit<Property, 'id' | 'createdAt'>): Property {
  const list = loadProperties()
  const newProp: Property = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
  }
  list.unshift(newProp)
  saveProperties(list)
  return newProp
}

export function updateProperty(id: string, data: Partial<Property>): Property | null {
  const list = loadProperties()
  const idx = list.findIndex((p) => p.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...data }
  saveProperties(list)
  return list[idx]
}

export function deleteProperty(id: string): boolean {
  const list = loadProperties()
  const filtered = list.filter((p) => p.id !== id)
  if (filtered.length === list.length) return false
  saveProperties(filtered)
  return true
}

export function togglePublish(id: string): Property | null {
  const list = loadProperties()
  const idx = list.findIndex((p) => p.id === id)
  if (idx === -1) return null
  list[idx].published = !list[idx].published
  saveProperties(list)
  return list[idx]
}
