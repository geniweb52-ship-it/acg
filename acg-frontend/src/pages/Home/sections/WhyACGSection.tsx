import { Container } from '@mantine/core'
import { motion } from 'framer-motion'
import { Award, Shield, Lightbulb, Users } from 'lucide-react'
import SectionTitle from '../../../components/common/SectionTitle'
import { whyChooseACG } from '../../../utils/data'

const iconComponents: Record<string, React.ReactNode> = {
  award: <Award size={28} />,
  shield: <Shield size={28} />,
  lightbulb: <Lightbulb size={28} />,
  users: <Users size={28} />,
}

export default function WhyACGSection() {
  return (
    <section style={{ padding: '96px 0', background: '#FFFFFF' }}>
      <Container size="xl">
        <SectionTitle
          overline="Pourquoi nous"
          title="Pourquoi choisir Alpha Consulting Group ?"
          subtitle="Nous combinons expertise locale et standards internationaux pour vous offrir le meilleur."
          centered
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}
        >
          {whyChooseACG.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: '#F5F7FA',
                borderRadius: '16px',
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'box-shadow 0.3s',
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow =
                  '0 8px 32px rgba(11,31,58,0.08)')
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLDivElement).style.boxShadow = 'none')
              }
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(212,167,44,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4A72C',
                  margin: '0 auto 20px',
                }}
              >
                {iconComponents[item.icon]}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0B1F3A', marginBottom: '10px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.7 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
