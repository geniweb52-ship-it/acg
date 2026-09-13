import { Container } from '@mantine/core'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import AnimatedSection from '../../components/common/AnimatedSection'
import ProjectCard from '../../components/cards/ProjectCard'
import CTASection from '../../components/sections/CTASection'
import { Service, Project } from '../../types'

interface ServiceDetailProps {
  service: Service
  relatedProjects: Project[]
}

export default function ServiceDetailTemplate({ service, relatedProjects }: ServiceDetailProps) {
  return (
    <>
      <title>{service.title} – Alpha Consulting Group</title>
      <HeroSection
        overline="Nos services"
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        primaryBtn={{ label: 'Demander un devis', to: '/contact' }}
        minHeight="60vh"
      />

      {/* Description */}
      <section style={{ padding: '96px 0', background: '#FFFFFF' }}>
        <Container size="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <SectionTitle
                overline="Présentation"
                title={`Notre expertise en ${service.title}`}
                subtitle={service.description}
              />
              <AnimatedSection delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: '#D4A72C',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={13} color="#0B1F3A" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '15px', color: '#0B1F3A', fontWeight: 500 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.35} style={{ marginTop: '32px' }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#D4A72C',
                    color: '#0B1F3A',
                    fontWeight: 700,
                    fontSize: '15px',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                  }}
                >
                  Nous contacter <ArrowRight size={16} />
                </Link>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.15}>
              <motion.img
                src={service.image}
                alt={service.title}
                loading="lazy"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  objectFit: 'cover',
                  aspectRatio: '4/3',
                  display: 'block',
                }}
              />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Avantages */}
      <section style={{ padding: '80px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <SectionTitle
            overline="Pourquoi nous choisir"
            title="Nos avantages"
            centered
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              { title: 'Expertise reconnue', desc: 'Une équipe de professionnels qualifiés et expérimentés.' },
              { title: 'Approche sur mesure', desc: 'Chaque solution est adaptée aux besoins spécifiques du client.' },
              { title: 'Résultats mesurables', desc: 'Des indicateurs clairs pour suivre l\'impact de nos interventions.' },
              { title: 'Accompagnement continu', desc: 'Un suivi rigoureux à chaque étape de votre projet.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '28px 20px',
                    textAlign: 'center',
                    border: '1px solid rgba(11,31,58,0.06)',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'rgba(212,167,44,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontSize: '1.3rem',
                    }}
                  >
                    ✦
                  </div>
                  <h4 style={{ fontWeight: 700, color: '#0B1F3A', marginBottom: '8px', fontSize: '15px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Projets liés */}
      {relatedProjects.length > 0 && (
        <section style={{ padding: '80px 0', background: '#FFFFFF' }}>
          <Container size="xl">
            <SectionTitle overline="Portfolio" title="Projets liés" centered />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={i * 0.1} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  )
}
