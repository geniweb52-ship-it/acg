import { Container } from '@mantine/core'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../../../components/common/SectionTitle'
import AnimatedSection from '../../../components/common/AnimatedSection'
import StatCard from '../../../components/cards/StatCard'
import { stats } from '../../../utils/data'

export default function AboutSection() {
  return (
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
          {/* Text */}
          <div>
            <SectionTitle
              overline="Qui sommes-nous"
              title="Une vision. Des solutions. Un engagement."
              subtitle="Alpha Consulting Group accompagne ses clients à travers des solutions adaptées dans plusieurs secteurs stratégiques. Notre ambition : être le partenaire de référence du développement africain."
            />

            <AnimatedSection delay={0.1}>
              <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.8, marginBottom: '28px' }}>
                Fondée sur des valeurs de confiance, d'excellence et de proximité, ACG met son expertise au service de projets ambitieux qui contribuent à bâtir une Afrique plus forte et plus prospère.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Link
                to="/a-propos"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#0B1F3A',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '13px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = '#132F52')
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background = '#0B1F3A')
                }
              >
                En savoir plus <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
                gap: '24px',
                marginTop: '48px',
                paddingTop: '40px',
                borderTop: '1px solid rgba(11,31,58,0.08)',
              }}
            >
              {stats.map((stat, i) => (
                <StatCard key={i} value={stat.value} label={stat.label} delay={i * 0.1} />
              ))}
            </div>
          </div>

          {/* Image */}
          <AnimatedSection delay={0.15}>
            <div style={{ position: 'relative' }}>
              <motion.img
                src="https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800&q=80"
                alt="Équipe Alpha Consulting Group"
                loading="lazy"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  aspectRatio: '4/3',
                  display: 'block',
                }}
              />
              {/* Accent badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: '#D4A72C',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  boxShadow: '0 8px 32px rgba(212,167,44,0.35)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0B1F3A', lineHeight: 1 }}>
                  10+
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#0B1F3A', marginTop: '2px' }}>
                  Projets réalisés
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
