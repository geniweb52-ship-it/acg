import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { Article } from '../../types'

interface ArticleCardProps {
  article: Article
  delay?: number
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export default function ArticleCard({ article, delay = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      whileHover="hovered"
    >
      <Link to={`/actualites/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
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
              boxShadow: '0 20px 56px rgba(11,31,58,0.12)',
            },
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', overflow: 'hidden', height: '210px' }}>
            <motion.img
              src={article.image}
              alt={article.title}
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
            {/* Overlay */}
            <motion.div
              variants={{ hovered: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,31,58,0.5) 0%, transparent 60%)',
              }}
            />
            {/* Category badge */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                background: 'rgba(11,31,58,0.75)',
                backdropFilter: 'blur(8px)',
                color: '#D4A72C',
                fontSize: '11px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '6px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {article.category}
            </div>
            {/* Arrow on hover */}
            <motion.div
              variants={{ hovered: { opacity: 1, scale: 1 } }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
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
          </div>

          {/* Content */}
          <div style={{ padding: '22px 20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '12px',
              }}
            >
              <Calendar size={13} color="#D4A72C" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
                {formatDate(article.date)}
              </span>
            </div>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#0B1F3A',
                marginBottom: '10px',
                lineHeight: 1.35,
              }}
            >
              {article.title}
            </h3>
            <p
              style={{
                fontSize: '13.5px',
                color: '#4B5563',
                lineHeight: 1.65,
              }}
            >
              {article.summary}
            </p>

            {/* CTA */}
            <motion.div
              variants={{ hovered: { x: 4 } }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '18px',
                color: '#D4A72C',
                fontWeight: 700,
                fontSize: '13px',
              }}
            >
              Lire la suite
              <motion.div variants={{ hovered: { x: 3, y: -3 } }} transition={{ duration: 0.2 }}>
                <ArrowUpRight size={15} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
