import { Container } from '@mantine/core'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import ServiceCard from '../../components/cards/ServiceCard'
import CTASection from '../../components/sections/CTASection'
import { services } from '../../utils/data'

export default function Services() {
  return (
    <>
      <title>Nos Services – Alpha Consulting Group</title>
      <HeroSection
        overline="Ce que nous faisons"
        title="Nos domaines"
        highlight="d'expertise"
        description="Quatre pôles d'activité complémentaires pour vous accompagner dans vos projets les plus ambitieux."
        image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80"
        minHeight="55vh"
      />

      <section style={{ padding: '96px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <SectionTitle
            overline="Nos services"
            title="Des solutions adaptées à chaque besoin"
            subtitle="ACG met son expertise multisectorielle au service de votre développement."
            centered
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
            }}
          >
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} delay={i * 0.1} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
