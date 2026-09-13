import { Loader } from '@mantine/core'
import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0B1F3A',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#D4A72C',
          fontFamily: 'Manrope, sans-serif',
          letterSpacing: '0.05em',
        }}
      >
        ACG
      </motion.div>
      <Loader color="#D4A72C" size="sm" type="dots" />
    </motion.div>
  )
}
