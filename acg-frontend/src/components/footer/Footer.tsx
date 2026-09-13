import { Link } from 'react-router-dom'
import { Container } from '@mantine/core'
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#0B1F3A', color: '#FFFFFF', paddingTop: '64px' }}>
      <Container size="xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            paddingBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  color: '#0B1F3A',
                }}
              >
                ACG
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px', lineHeight: 1.1 }}>Alpha Consulting</div>
                <div style={{ fontWeight: 600, fontSize: '11px', color: '#D4A72C', letterSpacing: '0.1em' }}>GROUP</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px' }}>
              Bâtir l'Afrique ensemble. Des solutions professionnelles au service de vos ambitions.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
                { icon: <Linkedin size={16} />, href: '#', label: 'LinkedIn' },
                { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
                { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'background 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background = '#D4A72C')
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)')
                  }
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A72C', marginBottom: '20px' }}>
              Navigation
            </h4>
            {[
              { label: 'Accueil', to: '/' },
              { label: 'À propos', to: '/a-propos' },
              { label: 'Nos services', to: '/services' },
              { label: 'Nos réalisations', to: '/realisations' },
              { label: 'Actualités', to: '/actualites' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '10px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A72C')}
                onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A72C', marginBottom: '20px' }}>
              Nos Services
            </h4>
            {[
              { label: 'Promotion Immobilière', to: '/services/immobilier' },
              { label: 'Logistique', to: '/services/logistique' },
              { label: 'Communication', to: '/services/communication' },
              { label: 'Livraison', to: '/services/livraison' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  marginBottom: '10px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A72C')}
                onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4A72C', marginBottom: '20px' }}>
              Coordonnées
            </h4>
            {[
              { icon: <Phone size={14} />, text: '+221 77 650 26 98' },
              { icon: <Mail size={14} />, text: 'contact@acg-groupe.sn' },
              { icon: <MapPin size={14} />, text: 'Dakar, Sénégal' },
            ].map((item, i) => (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}
              >
                <span style={{ color: '#D4A72C', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
            © 2026 Alpha Consulting Group. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Mentions légales', 'Politique de confidentialité'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#D4A72C')}
                onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
