import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Container } from '@mantine/core'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  {
    label: 'Nos Services',
    to: '/services',
    children: [
      { label: 'Immobilier', to: '/services/immobilier' },
      { label: 'Logistique', to: '/services/logistique' },
      { label: 'Communication', to: '/services/communication' },
      { label: 'Livraison', to: '/services/livraison' },
    ],
  },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Actualités', to: '/actualites' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const transparent = isHome && !scrolled

  return (
    <motion.header
      animate={{
        backgroundColor: transparent ? 'rgba(11,31,58,0)' : '#FFFFFF',
        boxShadow: transparent ? 'none' : '0 2px 24px rgba(11,31,58,0.10)',
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backdropFilter: transparent ? 'none' : 'blur(12px)',
      }}
    >
      <Container size="xl">
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '64px' : '80px',
            transition: 'height 0.3s ease',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              whileHover={{ opacity: 0.9 }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: transparent ? '#D4A72C' : '#0B1F3A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: transparent ? '#0B1F3A' : '#D4A72C',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}
              >
                ACG
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: '15px',
                    color: transparent ? '#FFFFFF' : '#0B1F3A',
                    lineHeight: 1.1,
                    transition: 'color 0.3s',
                  }}
                >
                  Alpha Consulting
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '11px',
                    color: '#D4A72C',
                    letterSpacing: '0.08em',
                  }}
                >
                  GROUP
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.to}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: 'Manrope, sans-serif',
                      color: transparent ? '#FFFFFF' : '#0B1F3A',
                      transition: 'color 0.2s',
                      borderRadius: '8px',
                    }}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      style={{
                        transition: 'transform 0.2s',
                        transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#FFFFFF',
                          borderRadius: '12px',
                          padding: '8px',
                          minWidth: '200px',
                          boxShadow: '0 8px 32px rgba(11,31,58,0.15)',
                          border: '1px solid rgba(11,31,58,0.06)',
                        }}
                      >
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            style={({ isActive }) => ({
                              display: 'block',
                              padding: '10px 16px',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: 600,
                              color: isActive ? '#D4A72C' : '#0B1F3A',
                              background: isActive ? 'rgba(212,167,44,0.08)' : 'transparent',
                              transition: 'all 0.15s',
                            })}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  style={({ isActive }) => ({
                    padding: '8px 12px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    color: isActive ? '#D4A72C' : transparent ? '#FFFFFF' : '#0B1F3A',
                    transition: 'color 0.2s',
                  })}
                >
                  {link.label}
                </NavLink>
              )
            )}

            <Link
              to="/contact"
              style={{
                marginLeft: '8px',
                padding: '10px 22px',
                background: '#D4A72C',
                color: '#0B1F3A',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s',
                display: 'inline-block',
              }}
              onMouseOver={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#E8C65A'
              }}
              onMouseOut={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background = '#D4A72C'
              }}
            >
              Nous contacter
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: transparent ? '#FFFFFF' : '#0B1F3A',
              display: 'none',
              padding: '4px',
            }}
            className="mobile-menu-btn"
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#FFFFFF',
              borderTop: '1px solid rgba(11,31,58,0.08)',
              overflow: 'hidden',
            }}
          >
            <Container size="xl" style={{ padding: '16px 0 24px' }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.children ? (
                    <>
                      <div
                        style={{
                          padding: '12px 16px',
                          fontWeight: 700,
                          fontSize: '12px',
                          color: '#4B5563',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {link.label}
                      </div>
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          style={({ isActive }) => ({
                            display: 'block',
                            padding: '10px 28px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '15px',
                            color: isActive ? '#D4A72C' : '#0B1F3A',
                          })}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </>
                  ) : (
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '12px 16px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: isActive ? '#D4A72C' : '#0B1F3A',
                        borderBottom: '1px solid rgba(11,31,58,0.06)',
                      })}
                    >
                      {link.label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <div style={{ padding: '16px 16px 0' }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'block',
                    padding: '14px',
                    background: '#D4A72C',
                    color: '#0B1F3A',
                    fontWeight: 700,
                    fontSize: '15px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Nous contacter
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </motion.header>
  )
}
