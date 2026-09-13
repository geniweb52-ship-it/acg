import { Container } from '@mantine/core'
import SectionTitle from '../../../components/common/SectionTitle'
import ServiceCard from '../../../components/cards/ServiceCard'
import { services } from '../../../utils/data'

export default function ServicesSection() {
  return (
    <section style={{ padding: '96px 0', background: '#F5F7FA' }}>
      <Container size="xl">
        <SectionTitle
          overline="Nos expertises"
          title="Nos domaines d'expertise"
          subtitle="Quatre pôles d'activité complémentaires pour répondre aux ambitions de vos projets."
          centered
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  )
}
