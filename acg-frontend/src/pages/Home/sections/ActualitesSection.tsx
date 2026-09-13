import { Container } from '@mantine/core'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../../../components/common/SectionTitle'
import ArticleCard from '../../../components/cards/ArticleCard'
import { articles } from '../../../utils/data'

export default function ActualitesSection() {
  return (
    <section style={{ padding: '96px 0', background: '#FFFFFF' }}>
      <Container size="xl">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '0',
          }}
        >
          <SectionTitle
            overline="Actualités"
            title="Dernières nouvelles"
            subtitle="Restez informés de l'actualité d'Alpha Consulting Group."
          />
          <Link
            to="/actualites"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#D4A72C',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              marginBottom: '48px',
            }}
          >
            Toutes les actualités <ArrowRight size={16} />
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </section>
  )
}
