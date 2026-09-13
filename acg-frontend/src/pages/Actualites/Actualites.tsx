import { useState } from 'react'
import { Container, TextInput } from '@mantine/core'
import { Search } from 'lucide-react'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import ArticleCard from '../../components/cards/ArticleCard'
import CTASection from '../../components/sections/CTASection'
import { articles } from '../../utils/data'

const categories = ['Toutes', ...Array.from(new Set(articles.map((a) => a.category)))]

export default function Actualites() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Toutes')

  const filtered = articles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Toutes' || a.category === category
    return matchSearch && matchCat
  })

  return (
    <>
      <title>Actualités – Alpha Consulting Group</title>
      <HeroSection
        overline="Blog & Actualités"
        title="Dernières"
        highlight="Nouvelles"
        description="Restez informé de l'actualité d'Alpha Consulting Group et des tendances de nos secteurs."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
        minHeight="50vh"
      />

      <section style={{ padding: '96px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <SectionTitle
            overline="Actualités"
            title="Nos articles"
            subtitle="Analyses, actualités et insights de nos équipes."
            centered
          />

          {/* Search & filters */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '40px',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextInput
              placeholder="Rechercher un article..."
              leftSection={<Search size={16} color="#D4A72C" />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              style={{ maxWidth: '320px', flex: 1, minWidth: '200px' }}
              styles={{
                input: {
                  borderColor: 'rgba(11,31,58,0.15)',
                  fontFamily: 'Manrope, sans-serif',
                  '&:focus': { borderColor: '#D4A72C' },
                },
              }}
            />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1.5px solid',
                    borderColor: category === cat ? '#D4A72C' : 'rgba(11,31,58,0.15)',
                    background: category === cat ? '#D4A72C' : '#FFFFFF',
                    color: category === cat ? '#0B1F3A' : '#4B5563',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'Manrope, sans-serif',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          {filtered.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map((article, i) => (
                <ArticleCard key={article.id} article={article} delay={i * 0.08} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#4B5563' }}>
              <p style={{ fontSize: '16px' }}>Aucun article trouvé pour cette recherche.</p>
            </div>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  )
}
