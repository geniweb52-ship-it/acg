import { motion } from 'framer-motion'

interface SectionTitleProps {
  overline?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionTitle({
  overline,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{ textAlign: centered ? 'center' : 'left', marginBottom: '48px' }}
    >
      {overline && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              width: '32px',
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
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D4A72C',
            }}
          >
            {overline}
          </span>
        </div>
      )}
      <h2
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: light ? '#FFFFFF' : '#0B1F3A',
          lineHeight: 1.15,
          marginBottom: subtitle ? '16px' : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            color: light ? 'rgba(255,255,255,0.75)' : '#4B5563',
            maxWidth: centered ? '600px' : 'none',
            margin: centered ? '0 auto' : 0,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
