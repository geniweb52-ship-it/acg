import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Maximize2, BedDouble, Bath, ArrowUpRight } from 'lucide-react'
import { Property } from '../../types'
import { formatPrice } from '../../utils/propertiesData'

interface PropertyCardProps {
  property: Property
  delay?: number
}

const categoryLabels: Record<string, string> = {
  appartement: 'Appartement',
  maison: 'Maison',
  immeuble: 'Immeuble',
  bureau: 'Bureau',
  villa: 'Villa',
  terrain: 'Terrain',
}

export default function PropertyCard({ property, delay = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover="hovered"
    >
      <Link
        to={`/services/immobilier/${property.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <motion.div
          style={{
            borderRadius: '18px',
            overflow: 'hidden',
            background: '#FFFFFF',
            border: '1px solid rgba(11,31,58,0.07)',
          }}
          variants={{
            hovered: { boxShadow: '0 20px 56px rgba(11,31,58,0.13)' },
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
            <motion.img
              src={property.images[0]}
              alt={property.title}
              loading="lazy"
              variants={{ hovered: { scale: 1.07 } }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Type badge */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: property.type === 'vente' ? '#0B1F3A' : '#D4A72C',
                color: property.type === 'vente' ? '#FFFFFF' : '#0B1F3A',
                fontSize: '11px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              {property.type === 'vente' ? 'À Vendre' : 'À Louer'}
            </div>

            {/* Category */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(6px)',
                color: '#0B1F3A',
                fontSize: '11px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '6px',
              }}
            >
              {categoryLabels[property.category]}
            </div>

            {/* Arrow on hover */}
            <motion.div
              variants={{ hovered: { opacity: 1, scale: 1 } }}
              initial={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#D4A72C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B1F3A',
              }}
            >
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </motion.div>

            {/* Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,31,58,0.4) 0%, transparent 55%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: '20px' }}>
            {/* Price */}
            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#D4A72C',
                marginBottom: '6px',
              }}
            >
              {formatPrice(property.price, property.currency, property.priceSuffix)}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#0B1F3A',
                marginBottom: '8px',
                lineHeight: 1.3,
              }}
            >
              {property.title}
            </h3>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '13px',
                color: '#4B5563',
                marginBottom: '14px',
              }}
            >
              <MapPin size={13} color="#D4A72C" />
              {property.location}
            </div>

            {/* Specs */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(11,31,58,0.07)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                <Maximize2 size={13} color="#D4A72C" />
                {property.surface} m²
              </div>
              {property.rooms && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                  <BedDouble size={13} color="#D4A72C" />
                  {property.rooms} pièces
                </div>
              )}
              {property.bathrooms && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                  <Bath size={13} color="#D4A72C" />
                  {property.bathrooms} sdb
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
