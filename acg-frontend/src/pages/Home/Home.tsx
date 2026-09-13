import HeroSection from '../../components/sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import WhyACGSection from './sections/WhyACGSection'
import StatsSection from './sections/StatsSection'
import RealisationsSection from './sections/RealisationsSection'
import ActualitesSection from './sections/ActualitesSection'
import CTASection from '../../components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection
        overline="Alpha Consulting Group"
        title="BÂTIR L'AFRIQUE"
        highlight="ENSEMBLE"
        subtitle="Des solutions professionnelles au service de vos ambitions."
        description="Immobilier, logistique, communication, livraison — ACG vous accompagne à chaque étape de votre développement en Afrique."
        primaryBtn={{ label: 'Découvrir nos services', to: '/services' }}
        secondaryBtn={{ label: 'Nous contacter', to: '/contact' }}
        image="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80"
        showScroll
      />
      <AboutSection />
      <ServicesSection />
      <WhyACGSection />
      <StatsSection />
      <RealisationsSection />
      <ActualitesSection />
      <CTASection />
    </>
  )
}
