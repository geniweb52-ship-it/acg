import { useState } from 'react'
import { Container, Modal } from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar } from 'lucide-react'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import ProjectCard from '../../components/cards/ProjectCard'
import CTASection from '../../components/sections/CTASection'
import { projects } from '../../utils/data'
import { Project } from '../../types'

const filters = [
  { label: 'Tous', value: 'all' },
  { label: 'Immobilier', value: 'immobilier' },
  { label: 'Logistique', value: 'logistique' },
  { label: 'Communication', value: 'communication' },
  { label: 'Livraison', value: 'livraison' },
]

export default function Realisations() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.sector === active)

  return (
    <>
      <title>Réalisations – Alpha Consulting Group</title>
      <HeroSection
        overline="Notre portfolio"
        title="Nos"
        highlight="Réalisations"
        description="Découvrez nos projets phares à travers l'Afrique dans nos quatre domaines d'expertise."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
        minHeight="55vh"
      />

      <section style={{ padding: '96px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <SectionTitle
            overline="Portfolio"
            title="Tous nos projets"
            subtitle="Filtrez par secteur pour explorer nos réalisations."
            centered
          />

          {/* Filters */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            {filters.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setActive(f.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '9px 20px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: active === f.value ? '#D4A72C' : 'rgba(11,31,58,0.15)',
                  background: active === f.value ? '#D4A72C' : '#FFFFFF',
                  color: active === f.value ? '#0B1F3A' : '#4B5563',
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

          {/* Grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} onClick={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Modal */}
      <Modal
        opened={!!selected}
        onClose={() => setSelected(null)}
        size="lg"
        radius="lg"
        padding="xl"
        title={
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0B1F3A' }}>
            {selected?.title}
          </span>
        }
      >
        {selected && (
          <div>
            <img
              src={selected.image}
              alt={selected.title}
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', aspectRatio: '16/9', marginBottom: '20px' }}
            />
            <div
              style={{
                display: 'inline-block',
                background: '#D4A72C',
                color: '#0B1F3A',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}
            >
              {selected.sector}
            </div>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.75, marginBottom: '16px' }}>
              {selected.description}
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {selected.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0B1F3A' }}>
                  <MapPin size={15} color="#D4A72C" />
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{selected.location}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0B1F3A' }}>
                <Calendar size={15} color="#D4A72C" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{selected.year}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <CTASection />
    </>
  )
}
