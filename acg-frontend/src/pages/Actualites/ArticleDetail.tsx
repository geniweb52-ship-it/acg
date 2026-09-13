import { useParams, Link, Navigate } from 'react-router-dom'
import { Container } from '@mantine/core'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import { articles } from '../../utils/data'
import ArticleCard from '../../components/cards/ArticleCard'
import CTASection from '../../components/sections/CTASection'

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find((a) => a.slug === slug)

  if (!article) return <Navigate to="/actualites" replace />

  const similar = articles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <>
      <title>{article.title} – ACG</title>

      {/* Hero image */}
      <div
        style={{
          position: 'relative',
          height: '480px',
          overflow: 'hidden',
          marginTop: '0',
        }}
      >
        <motion.img
          src={article.image}
          alt={article.title}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11,31,58,0.8) 0%, rgba(11,31,58,0.2) 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '800px',
            padding: '0 24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                display: 'inline-block',
                background: '#D4A72C',
                color: '#0B1F3A',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}
            >
              {article.category}
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
              }}
            >
              {article.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section style={{ padding: '64px 0', background: '#FFFFFF' }}>
        <Container size="sm">
          {/* Back */}
          <Link
            to="/actualites"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#D4A72C',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              marginBottom: '32px',
            }}
          >
            <ArrowLeft size={16} /> Retour aux actualités
          </Link>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4B5563' }}>
              <Calendar size={15} color="#D4A72C" />
              <span style={{ fontSize: '14px' }}>{formatDate(article.date)}</span>
            </div>
            {article.author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4B5563' }}>
                <User size={15} color="#D4A72C" />
                <span style={{ fontSize: '14px' }}>{article.author}</span>
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#0B1F3A',
              lineHeight: 1.7,
              marginBottom: '24px',
              borderLeft: '4px solid #D4A72C',
              paddingLeft: '20px',
            }}
          >
            {article.summary}
          </p>

          <div
            style={{
              fontSize: '15px',
              color: '#4B5563',
              lineHeight: 1.85,
            }}
          >
            {article.content
              .split('\n')
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '16px' }}>
                  {paragraph}
                </p>
              ))}
          </div>
        </Container>
      </section>

      {/* Articles similaires */}
      {similar.length > 0 && (
        <section style={{ padding: '64px 0', background: '#F5F7FA' }}>
          <Container size="xl">
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#0B1F3A',
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              Articles similaires
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {similar.map((a, i) => (
                <ArticleCard key={a.id} article={a} delay={i * 0.1} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  )
}
