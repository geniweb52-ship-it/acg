import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@mantine/core'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonTo?: string
}

export default function CTASection({
  title = 'Vous avez un projet ? Construisons-le ensemble.',
  subtitle = 'Bâtir l\'Afrique ensemble — contactez nos équipes pour discuter de vos ambitions.',
  buttonText = 'Parlons de votre projet',
  buttonTo = '/contact',
}: CTASectionProps) {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #132F52 100%)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '60px solid rgba(212,167,44,0.07)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '80px solid rgba(212,167,44,0.05)',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '40px',
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={buttonTo}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#D4A72C',
                color: '#0B1F3A',
                fontWeight: 700,
                fontSize: '16px',
                padding: '16px 36px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = '#E8C65A')
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = '#D4A72C')
              }
            >
              {buttonText}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
