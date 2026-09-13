import { Container } from '@mantine/core'
import { motion } from 'framer-motion'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import AnimatedSection from '../../components/common/AnimatedSection'
import StatCard from '../../components/cards/StatCard'
import CTASection from '../../components/sections/CTASection'
import { stats } from '../../utils/data'
import { Target, Eye, Heart, Check } from 'lucide-react'

const values = [
  { label: 'Confiance', color: '#0B1F3A' },
  { label: 'Excellence', color: '#132F52' },
  { label: 'Innovation', color: '#D4A72C' },
  { label: 'Engagement', color: '#0B1F3A' },
  { label: 'Proximité', color: '#132F52' },
]

const missions = [
  'Développer des projets immobiliers de qualité',
  'Optimiser les chaînes logistiques africaines',
  'Accompagner les entreprises dans leur communication',
  'Offrir des solutions de livraison fiables et rapides',
  'Créer de la valeur durable pour les partenaires et clients',
]

export default function About() {
  return (
    <>
      <title>À propos – Alpha Consulting Group</title>
      <HeroSection
        overline="Notre histoire"
        title="À propos d'Alpha"
        highlight="Consulting Group"
        description="Depuis notre création, nous œuvrons chaque jour pour bâtir une Afrique plus forte, plus connectée et plus prospère."
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80"
        minHeight="60vh"
      />

      {/* Présentation */}
      <section style={{ padding: '96px 0', background: '#FFFFFF' }}>
        <Container size="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <SectionTitle
                overline="Présentation"
                title="Qui est Alpha Consulting Group ?"
                subtitle="Un groupe multisectoriel engagé pour le développement de l'Afrique."
              />
              <AnimatedSection delay={0.1}>
                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.8, marginBottom: '16px' }}>
                  Alpha Consulting Group est un groupe panafricain opérant dans quatre secteurs stratégiques : l'immobilier, la logistique, la communication et la livraison. Notre vocation est d'accompagner les entreprises, les institutions et les particuliers dans leurs projets les plus ambitieux.
                </p>
                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.8 }}>
                  Basé en Afrique, avec une vision continentale, ACG se distingue par son approche sur mesure, sa rigueur professionnelle et son profond ancrage dans les réalités locales.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.2}>
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80"
                alt="Alpha Consulting Group bureau"
                loading="lazy"
                style={{ width: '100%', borderRadius: '20px', objectFit: 'cover', aspectRatio: '4/3' }}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section style={{ padding: '80px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px',
            }}
          >
            {[
              {
                icon: <Target size={28} />,
                title: 'Notre Mission',
                text: 'Offrir des solutions professionnelles, innovantes et adaptées aux besoins de nos clients à travers une approche multi-sectorielle.',
              },
              {
                icon: <Eye size={28} />,
                title: 'Notre Vision',
                text: 'Devenir le partenaire de référence du développement économique africain, en combinant expertise locale et standards internationaux.',
              },
              {
                icon: <Heart size={28} />,
                title: 'Nos Engagements',
                text: 'Transparence, qualité, ponctualité et satisfaction client sont au cœur de chacune de nos interventions.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    height: '100%',
                    border: '1px solid rgba(11,31,58,0.06)',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: 'rgba(212,167,44,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#D4A72C',
                      marginBottom: '20px',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0B1F3A', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.75 }}>{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Missions liste */}
      <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
        <Container size="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <SectionTitle
                overline="Domaines d'intervention"
                title="Ce que nous faisons"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {missions.map((m, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#D4A72C',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={14} color="#0B1F3A" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '15px', color: '#0B1F3A', fontWeight: 500 }}>{m}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
            <AnimatedSection delay={0.2}>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                alt="Bureau ACG"
                loading="lazy"
                style={{ width: '100%', borderRadius: '20px', objectFit: 'cover', aspectRatio: '4/3' }}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Valeurs */}
      <section style={{ padding: '80px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <SectionTitle
            overline="Ce qui nous guide"
            title="Nos valeurs fondamentales"
            centered
          />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.06, y: -3 }}
                style={{
                  background: val.color,
                  color: val.color === '#D4A72C' ? '#0B1F3A' : '#FFFFFF',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '15px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'default',
                }}
              >
                {val.label}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #0B1F3A 0%, #132F52 100%)',
        }}
      >
        <Container size="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              gap: '40px',
            }}
          >
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} delay={i * 0.12} light />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
