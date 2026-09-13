import { motion } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
  delay?: number
  light?: boolean
}

export default function StatCard({ value, label, delay = 0, light = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ textAlign: 'center' }}
    >
      <div
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
          fontWeight: 800,
          color: '#D4A72C',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: light ? 'rgba(255,255,255,0.75)' : '#4B5563',
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}
