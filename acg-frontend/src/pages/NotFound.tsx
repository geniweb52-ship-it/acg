import { Container } from '@mantine/core'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B1F3A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container size="sm" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            style={{
              fontSize: 'clamp(5rem, 15vw, 10rem)',
              fontWeight: 800,
              color: '#D4A72C',
              lineHeight: 1,
              marginBottom: '16px',
            }}
          >
            404
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '12px',
            }}
          >
            Page introuvable
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '36px', fontSize: '15px' }}>
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#D4A72C',
              color: '#0B1F3A',
              fontWeight: 700,
              fontSize: '15px',
              padding: '14px 28px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            <Home size={18} /> Retour à l'accueil
          </Link>
        </motion.div>
      </Container>
    </div>
  )
}
