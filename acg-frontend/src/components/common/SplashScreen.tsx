import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    // Animate progress bar
    const steps = [
      { target: 35, delay: 100 },
      { target: 65, delay: 500 },
      { target: 90, delay: 1000 },
      { target: 100, delay: 1600 },
    ]

    const timers: ReturnType<typeof setTimeout>[] = []

    steps.forEach(({ target, delay }) => {
      timers.push(
        setTimeout(() => {
          setProgress(target)
        }, delay)
      )
    })

    timers.push(
      setTimeout(() => {
        setPhase('done')
      }, 2200)
    )

    timers.push(
      setTimeout(() => {
        onComplete()
      }, 2900)
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0B1F3A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background circles */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              border: '1px solid rgba(212,167,44,0.08)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '900px',
              height: '900px',
              borderRadius: '50%',
              border: '1px solid rgba(212,167,44,0.04)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Animated gold accent top */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #D4A72C, #E8C65A, #D4A72C, transparent)',
              transformOrigin: 'left',
            }}
          />

          {/* Center content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0',
            }}
          >
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #D4A72C 0%, #E8C65A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 0 60px rgba(212,167,44,0.35), 0 16px 48px rgba(0,0,0,0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#0B1F3A',
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                ACG
              </span>
            </motion.div>

            {/* Company name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ textAlign: 'center', marginBottom: '8px' }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                Alpha Consulting
              </div>
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#D4A72C',
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                Group
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '52px',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              Bâtir l'Afrique ensemble
            </motion.p>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              style={{ width: '240px' }}
            >
              {/* Track */}
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                {/* Fill */}
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #D4A72C, #E8C65A)',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px rgba(212,167,44,0.6)',
                  }}
                />
              </div>

              {/* Percentage */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.30)',
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Chargement
                </span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#D4A72C',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '32px',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [1, 2.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '3px',
                  height: '12px',
                  borderRadius: '2px',
                  background: '#D4A72C',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
