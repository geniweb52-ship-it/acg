import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react'
import { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  delay?: number
  onClick?: (project: Project) => void
}

const sectorLabels: Record<string, string> = {
  immobilier: 'Immobilier',
  logistique: 'Logistique',
  communication: 'Communication',
  livraison: 'Livraison',
}

export default function ProjectCard({ project, delay = 0, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover="hovered"
      onClick={() => onClick?.(project)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <motion.div
        style={{
          borderRadius: '18px',
          overflow: 'hidden',
          background: '#FFFFFF',
          border: '1px solid rgba(11,31,58,0.07)',
          transition: 'box-shadow 0.35s',
        }}
        variants={{
          hovered: {
            boxShadow: '0 20px 56px rgba(11,31,58,0.14)',
          },
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            variants={{ hovered: { scale: 1.07 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Gradient overlay */}
          <motion.div
            variants={{
              hovered: { opacity: 1 },
            }}
            initial={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11,31,58,0.55) 0%, transparent 60%)',
            }}
          />

          {/* Sector badge */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: '#D4A72C',
              color: '#0B1F3A',
              fontSize: '11px',
              fontWeight: 700,
              padding: '5px 12px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}
          >
            {sectorLabels[project.sector]}
          </div>

          {/* Arrow on hover */}
          <motion.div
            variants={{ hovered: { opacity: 1, scale: 1, y: 0 } }}
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B1F3A',
            }}
          >
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Content */}
        <div style={{ padding: '22px 20px' }}>
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#0B1F3A',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '13.5px',
              color: '#4B5563',
              lineHeight: 1.65,
              marginBottom: '16px',
            }}
          >
            {project.description}
          </p>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              paddingTop: '14px',
              borderTop: '1px solid rgba(11,31,58,0.07)',
            }}
          >
            {project.location && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#4B5563',
                }}
              >
                <MapPin size={12} color="#D4A72C" />
                {project.location}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#4B5563',
                marginLeft: 'auto',
              }}
            >
              <Calendar size={12} color="#D4A72C" />
              {project.year}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
