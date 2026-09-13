import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  overline?: string
  title: string
  highlight?: string
  subtitle?: string
  description?: string
  primaryBtn?: { label: string; to: string }
  secondaryBtn?: { label: string; to: string }
  image: string
  showScroll?: boolean
  minHeight?: string
}

export default function HeroSection({
  overline,
  title,
  highlight,
  subtitle,
  description,
  primaryBtn,
  secondaryBtn,
  image,
  showScroll = false,
  minHeight = '100vh',
}: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(11,31,58,0.88) 0%, rgba(19,47,82,0.75) 100%)',
        }}
      />

      {/* Decorative accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #D4A72C, #E8C65A, #D4A72C)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '120px 24px 80px',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '760px' }}
        >
          {overline && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '3px',
                  background: '#D4A72C',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#D4A72C',
                }}
              >
                {overline}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {title}
            {highlight && (
              <>
                {' '}
                <span style={{ color: '#D4A72C' }}>{highlight}</span>
              </>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 600,
                color: '#D4A72C',
                marginBottom: '12px',
                letterSpacing: '0.02em',
              }}
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.80)',
                lineHeight: 1.75,
                marginBottom: '40px',
                maxWidth: '560px',
              }}
            >
              {description}
            </motion.p>
          )}

          {(primaryBtn || secondaryBtn) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              {primaryBtn && (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={primaryBtn.to}
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
                    {primaryBtn.label}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
              {secondaryBtn && (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={secondaryBtn.to}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255,255,255,0.10)',
                      border: '1.5px solid rgba(255,255,255,0.35)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '15px',
                      padding: '14px 28px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {secondaryBtn.label}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ChevronDown size={24} color="rgba(255,255,255,0.6)" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
