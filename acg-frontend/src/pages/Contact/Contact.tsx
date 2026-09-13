import { Container } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import HeroSection from '../../components/sections/HeroSection'
import SectionTitle from '../../components/common/SectionTitle'
import AnimatedSection from '../../components/common/AnimatedSection'

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  subject: z.string().min(3, 'Le sujet est requis'),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères'),
})

type FormData = z.infer<typeof schema>

const contactInfo = [
  { icon: <Phone size={20} />, label: 'Téléphone', value: '+221 77 650 26 98', href: 'tel:+221776502698' },
  { icon: <Mail size={20} />, label: 'Email', value: 'contact@acg-groupe.sn', href: 'mailto:contact@acg-groupe.sn' },
  { icon: <MapPin size={20} />, label: 'Adresse', value: 'Dakar, Sénégal', href: '#' },
  { icon: <MessageCircle size={20} />, label: 'WhatsApp', value: '+221 77 650 26 98', href: 'https://wa.me/221776502698?text=Bonjour%20Alpha%20Consulting%20Group%2C%20je%20souhaite%20discuter%20avec%20le%20chatbot.' },
]

function InputField({
  label,
  error,
  textarea = false,
  ...props
}: {
  label: string
  error?: string
  textarea?: boolean
  [key: string]: unknown
}) {
  const sharedStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: `1.5px solid ${error ? '#e53e3e' : 'rgba(11,31,58,0.15)'}`,
    fontFamily: 'Manrope, sans-serif',
    fontSize: '14px',
    color: '#0B1F3A',
    background: '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.2s',
    marginTop: '6px',
  }

  return (
    <div>
      <label style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A', display: 'block' }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          style={{ ...sharedStyle, minHeight: '140px', resize: 'vertical' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
          onBlur={(e) => (e.currentTarget.style.borderColor = error ? '#e53e3e' : 'rgba(11,31,58,0.15)')}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          style={sharedStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
          onBlur={(e) => (e.currentTarget.style.borderColor = error ? '#e53e3e' : 'rgba(11,31,58,0.15)')}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <span style={{ fontSize: '12px', color: '#e53e3e', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (_data: FormData) => {
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      <title>Contact – Alpha Consulting Group</title>
      <HeroSection
        overline="Parlons de votre projet"
        title="Contactez"
        highlight="nos équipes"
        description="Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner."
        image="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80"
        minHeight="50vh"
      />

      <section style={{ padding: '96px 0', background: '#F5F7FA' }}>
        <Container size="xl">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '56px',
              alignItems: 'start',
            }}
          >
            {/* Left – Contact info */}
            <div>
              <SectionTitle
                overline="Nous joindre"
                title="Parlons de votre projet"
                subtitle="N'hésitez pas à nous contacter. Nous vous répondrons dans les plus brefs délais."
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {contactInfo.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        textDecoration: 'none',
                        border: '1px solid rgba(11,31,58,0.06)',
                        transition: 'box-shadow 0.2s, border-color 0.2s',
                      }}
                      onMouseOver={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.boxShadow = '0 4px 20px rgba(11,31,58,0.10)'
                        el.style.borderColor = '#D4A72C'
                      }}
                      onMouseOut={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.boxShadow = 'none'
                        el.style.borderColor = 'rgba(11,31,58,0.06)'
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: 'rgba(212,167,44,0.10)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#D4A72C',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B1F3A' }}>
                          {item.value}
                        </div>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Right – Form */}
            <AnimatedSection delay={0.15}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '40px',
                  border: '1px solid rgba(11,31,58,0.06)',
                  boxShadow: '0 4px 32px rgba(11,31,58,0.06)',
                }}
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <CheckCircle size={56} color="#D4A72C" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '10px' }}>
                      Message envoyé !
                    </h3>
                    <p style={{ color: '#4B5563', marginBottom: '24px' }}>
                      Merci pour votre message. Notre équipe vous contactera très prochainement.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      style={{
                        background: '#0B1F3A',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '14px',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Manrope, sans-serif',
                      }}
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#0B1F3A',
                        marginBottom: '28px',
                        borderBottom: '2px solid #D4A72C',
                        paddingBottom: '12px',
                        display: 'inline-block',
                      }}
                    >
                      Envoyer un message
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px',
                        }}
                      >
                        <InputField
                          label="Nom complet *"
                          placeholder="Votre nom"
                          error={errors.name?.message}
                          {...register('name')}
                        />
                        <InputField
                          label="Email *"
                          type="email"
                          placeholder="votre@email.com"
                          error={errors.email?.message}
                          {...register('email')}
                        />
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px',
                        }}
                      >
                        <InputField
                          label="Téléphone *"
                          placeholder="+221 77 650 26 98"
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                        <InputField
                          label="Sujet *"
                          placeholder="Objet de votre message"
                          error={errors.subject?.message}
                          {...register('subject')}
                        />
                      </div>
                      <InputField
                        label="Message *"
                        textarea
                        placeholder="Décrivez votre projet ou votre demande..."
                        error={errors.message?.message}
                        {...register('message')}
                      />
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        style={{
                          background: loading ? '#E8C65A' : '#D4A72C',
                          color: '#0B1F3A',
                          fontWeight: 700,
                          fontSize: '15px',
                          padding: '15px 28px',
                          borderRadius: '10px',
                          border: 'none',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontFamily: 'Manrope, sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          width: '100%',
                        }}
                      >
                        {loading ? (
                          'Envoi en cours...'
                        ) : (
                          <>
                            Envoyer ma demande <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>
    </>
  )
}
