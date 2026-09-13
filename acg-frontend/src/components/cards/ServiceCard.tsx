import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Truck, Megaphone, Package, ArrowUpRight } from 'lucide-react'
import { Service } from '../../types'

interface ServiceCardProps {
  service: Service
  delay?: number
}

const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={28} />,
  truck: <Truck size={28} />,
  megaphone: <Megaphone size={28} />,
  package: <Package size={28} />,
}

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Link
        to={`/services/${service.slug}`}
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      >
        <motion.div
          whileHover="hovered"
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            height: '360px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {/* Background image */}
          <motion.div
            variants={{
              hovered: { scale: 1.07 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${service.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Gradient overlay — darkens more on hover */}
          <motion.div
            variants={{
              hovered: {
                background: 'linear-gradient(180deg, rgba(11,31,58,0.20) 0%, rgba(11,31,58,0.96) 100%)',
              },
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(11,31,58,0.05) 0%, rgba(11,31,58,0.88) 100%)',
              transition: 'background 0.4s ease',
            }}
          />

          {/* Accent top-left badge */}
          <motion.div
            variants={{
              hovered: { opacity: 0, y: -8 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#D4A72C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B1F3A',
            }}
          >
            {iconMap[service.icon] || <Building2 size={28} />}
          </motion.div>

          {/* Arrow top-right on hover */}
          <motion.div
            variants={{
              hovered: { opacity: 1, scale: 1 },
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#D4A72C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B1F3A',
            }}
          >
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </motion.div>

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '28px',
            }}
          >
            {/* Icon shows inside content on hover */}
            <motion.div
              variants={{
                hovered: { opacity: 1, y: 0 },
              }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: '#D4A72C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B1F3A',
                marginBottom: '14px',
              }}
            >
              {iconMap[service.icon] || <Building2 size={24} />}
            </motion.div>

            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}
            >
              {service.title}
            </h3>

            {/* Description revealed on hover */}
            <motion.p
              variants={{
                hovered: { opacity: 1, y: 0, maxHeight: '80px' },
              }}
              initial={{ opacity: 0, y: 8, maxHeight: '0px' }}
              transition={{ duration: 0.35 }}
              style={{
                fontSize: '13.5px',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.65,
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              {service.shortDescription}
            </motion.p>

            {/* Bottom CTA line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <motion.div
                variants={{
                  hovered: { width: '28px' },
                }}
                style={{
                  height: '2px',
                  width: '20px',
                  background: '#D4A72C',
                  borderRadius: '2px',
                  transition: 'width 0.3s',
                }}
              />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#D4A72C',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Découvrir
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
