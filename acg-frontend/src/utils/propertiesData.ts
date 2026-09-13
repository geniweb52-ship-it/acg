import { Property } from '../types'

export const WHATSAPP_ACG = '+221776502698' // ← Remplacer par le vrai numéro ACG Sénégal

export const propertiesData: Property[] = [
  {
    id: '1',
    slug: 'villa-standing-almadies-dakar',
    title: 'Villa de standing – Les Almadies',
    type: 'vente',
    category: 'villa',
    price: 85000000,
    currency: 'FCFA',
    location: 'Les Almadies, Route de la Corniche',
    city: 'Dakar',
    surface: 320,
    rooms: 5,
    bathrooms: 3,
    description:
      'Magnifique villa de standing construite sur un terrain de 500 m² aux Almadies, l\'un des quartiers les plus prisés de Dakar. Finitions haut de gamme, cuisine équipée, piscine, parking 3 voitures. Idéale pour famille aisée ou investissement locatif premium.',
    features: [
      'Piscine privée',
      'Cuisine équipée',
      'Parking 3 voitures',
      'Groupe électrogène',
      'Sécurité 24h/24',
      'Jardin paysager',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    published: true,
    createdAt: '2026-08-01',
    whatsappNumber: WHATSAPP_ACG,
  },
  {
    id: '2',
    slug: 'appartement-plateau-dakar',
    title: 'Appartement moderne – Le Plateau',
    type: 'location',
    category: 'appartement',
    price: 350000,
    priceSuffix: '/mois',
    currency: 'FCFA',
    location: 'Le Plateau, Centre de Dakar',
    city: 'Dakar',
    surface: 95,
    rooms: 3,
    bathrooms: 2,
    description:
      'Appartement entièrement rénové au cœur du Plateau, quartier des affaires de Dakar. Vue dégagée sur la ville, climatisation, parking souterrain. Idéal pour cadres et expatriés. Disponible immédiatement.',
    features: [
      'Climatisation centralisée',
      'Parking souterrain',
      'Gardiennage',
      'Balcon avec vue',
      'Internet fibre',
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    published: true,
    createdAt: '2026-08-10',
    whatsappNumber: WHATSAPP_ACG,
  },
  {
    id: '3',
    slug: 'immeuble-bureaux-point-e-dakar',
    title: 'Immeuble de bureaux – Point E',
    type: 'vente',
    category: 'immeuble',
    price: 250000000,
    currency: 'FCFA',
    location: 'Point E, Dakar',
    city: 'Dakar',
    surface: 1200,
    rooms: 12,
    bathrooms: 8,
    description:
      'Immeuble R+4 de bureaux entièrement équipé au cœur du quartier Point E. Salles de conférence, open-spaces, réception, local technique. Investissement idéal pour société ou groupe institutionnel.',
    features: [
      'R+4 entièrement équipé',
      'Ascenseur',
      'Parking 20 places',
      'Groupe électrogène 100 KVA',
      'Salle de conférence',
      'Réseau fibre optique',
    ],
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
    ],
    published: true,
    createdAt: '2026-07-15',
    whatsappNumber: WHATSAPP_ACG,
  },
  {
    id: '4',
    slug: 'maison-pikine-location',
    title: 'Maison 4 pièces – Pikine',
    type: 'location',
    category: 'maison',
    price: 150000,
    priceSuffix: '/mois',
    currency: 'FCFA',
    location: 'Pikine, Cité Aliou Sow',
    city: 'Dakar',
    surface: 140,
    rooms: 4,
    bathrooms: 2,
    description:
      'Maison en location dans un quartier résidentiel calme de Pikine. Cour intérieure, cuisine indépendante, préau pour voiture. Idéale pour famille.',
    features: [
      'Cour intérieure',
      'Cuisine indépendante',
      'Préau voiture',
      'Quartier résidentiel calme',
    ],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    ],
    published: true,
    createdAt: '2026-09-01',
    whatsappNumber: WHATSAPP_ACG,
  },
  {
    id: '5',
    slug: 'terrain-saly-portudal',
    title: 'Terrain viabilisé – Saly Portudal',
    type: 'vente',
    category: 'terrain',
    price: 18000000,
    currency: 'FCFA',
    location: 'Saly Portudal, Petite Côte',
    city: 'Mbour',
    surface: 600,
    description:
      'Terrain viabilisé de 600 m² à 5 minutes de la plage de Saly. Titre foncier disponible, eau et électricité sur place. Idéal pour construction résidentielle, villa balnéaire ou projet hôtelier.',
    features: [
      'Titre foncier',
      'Eau et électricité',
      'Accès route bitumée',
      'À 5 min de la plage',
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    published: true,
    createdAt: '2026-06-20',
    whatsappNumber: WHATSAPP_ACG,
  },
  {
    id: '6',
    slug: 'bureau-mermoz-dakar',
    title: 'Bureau meublé – Mermoz',
    type: 'location',
    category: 'bureau',
    price: 280000,
    priceSuffix: '/mois',
    currency: 'FCFA',
    location: 'Mermoz, Dakar',
    city: 'Dakar',
    surface: 45,
    rooms: 2,
    bathrooms: 1,
    description:
      'Bureau meublé dans résidence sécurisée à Mermoz. Climatisé, connexion fibre, salle d\'attente partagée. Idéal pour profession libérale, consultant ou représentation commerciale.',
    features: [
      'Meublé et équipé',
      'Connexion fibre incluse',
      'Climatisation',
      'Sécurité 24h/24',
      'Parking',
    ],
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    published: true,
    createdAt: '2026-09-05',
    whatsappNumber: WHATSAPP_ACG,
  },
]

// Helpers
export function getPublishedProperties() {
  return propertiesData.filter((p) => p.published)
}

export function getPropertyBySlug(slug: string) {
  return propertiesData.find((p) => p.slug === slug)
}

export function formatPrice(price: number, currency: string, suffix?: string) {
  const formatted = new Intl.NumberFormat('fr-FR').format(price)
  return `${formatted} ${currency}${suffix ? ' ' + suffix : ''}`
}
