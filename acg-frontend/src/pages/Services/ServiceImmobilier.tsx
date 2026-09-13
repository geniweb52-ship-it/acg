import { useState } from 'react'
import { Container } from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Building2, TreePine, LayoutGrid, Search } from 'lucide-react'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import PropertyCard from '../../components/cards/PropertyCard'
import CTASection from '../../components/sections/CTASection'
import { getPublishedProperties } from '../../utils/adminStore'

const typeFilters = [
  { label: 'Tous', value: 'all' },
  { label: 'À Vendre', value: 'vente' },
  { label: 'À Louer', value: 'location' },
]

const categoryFilters = [
  { label: 'Toutes', value: 'all', icon: <LayoutGrid size={15} /> },
  { label: 'Villas', value: 'villa', icon: <Home size={15} /> },
  { label: 'Maisons', value: 'maison', icon: <Home size={15} /> },
  { label: 'Appartements', value: 'appartement', icon: <Building2 size={15} /> },
  { label: 'Immeubles', value: 'immeuble', icon: <Building2 size={15} /> },
  { label: 'Bureaux', value: 'bureau', icon: <Building2 size={15} /> },
  { label: 'Terrains', value: 'terrain', icon: <TreePine size={15} /> },
]

export default function ServiceImmobilier() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')

  const properties = getPublishedProperties()

  const filtered = properties.filter((p) => {
    const matchType = typeFilter === 'all' || p.type === typeFilter
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
    return matchType && matchCat && matchSearch
  })

  return (
    <>
      <title>Immobilier – Alpha Consulting Group</title>

      <HeroSection
        overline="Promotion Immobilière"
        title="Vente & Location"
        highlight="de biens immobiliers"
        description="Découvrez nos annonces exclusives : villas, appartements, immeubles, bureaux et terrains à travers l'Afrique."
        image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"
        minHeight="55vh"
      />

      <section style={{ padding: '80px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <SectionTitle
            overline="Nos annonces"
            title="Trouvez votre bien idéal"
            subtitle={`${properties.length} bien${properties.length > 1 ? 's' : ''} disponible${properties.length > 1 ? 's' : ''}`}
            centered
          />

          {/* Search bar */}
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto 32px',
              position: 'relative',
            }}
          >
            <Search
              size={18}
              color="#D4A72C"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Rechercher par titre, ville, quartier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                borderRadius: '12px',
                border: '1.5px solid rgba(11,31,58,0.12)',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '14px',
                color: '#0B1F3A',
                background: '#FFFFFF',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,31,58,0.12)')}
            />
          </div>

          {/* Type filters */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            {typeFilters.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '9px 22px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: typeFilter === f.value ? '#0B1F3A' : 'rgba(11,31,58,0.15)',
                  background: typeFilter === f.value ? '#0B1F3A' : '#FFFFFF',
                  color: typeFilter === f.value ? '#FFFFFF' : '#4B5563',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {f.label}
              </motion.button>
            ))}
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
            {categoryFilters.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setCategoryFilter(f.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: categoryFilter === f.value ? '#D4A72C' : 'rgba(11,31,58,0.12)',
                  background: categoryFilter === f.value ? '#D4A72C' : '#FFFFFF',
                  color: categoryFilter === f.value ? '#0B1F3A' : '#4B5563',
                  fontWeight: 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {f.icon}
                {f.label}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((property, i) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PropertyCard property={property} delay={i * 0.05} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#4B5563' }}>
              <Building2 size={48} color="rgba(11,31,58,0.15)" style={{ marginBottom: '16px' }} />
              <p style={{ fontSize: '16px', fontWeight: 600 }}>Aucun bien trouvé</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                Essayez d'autres critères de recherche.
              </p>
            </div>
          )}
        </Container>
      </section>

      <CTASection
        title="Vous avez un projet immobilier ?"
        subtitle="Notre équipe vous accompagne pour trouver le bien idéal ou vendre votre propriété au meilleur prix."
        buttonText="Nous contacter"
        buttonTo="/contact"
      />
    </>
  )
}
