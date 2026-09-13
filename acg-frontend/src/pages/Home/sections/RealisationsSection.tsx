import { Container } from '@mantine/core'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../../../components/common/SectionTitle'
import ProjectCard from '../../../components/cards/ProjectCard'
import { projects } from '../../../utils/data'

export default function RealisationsSection() {
  const featured = projects.slice(0, 3)

  return (
    <section style={{ padding: '96px 0', background: '#F5F7FA' }}>
      <Container size="xl">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <SectionTitle
            overline="Portfolio"
            title="Nos réalisations"
            subtitle="Découvrez quelques-uns de nos projets phares."
            centered={false}
          />
          <Link
            to="/realisations"
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
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </section>
  )
}
