import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Container } from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MapPin, Maximize2, BedDouble, Bath, ArrowLeft,
  Check, Send, CheckCircle, Phone,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { formatPrice, WHATSAPP_ACG } from '../../utils/propertiesData'
import { getPropertyBySlug } from '../../utils/adminStore'
import AnimatedSection from '../../components/common/AnimatedSection'

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  phone: z.string().min(8, 'Numéro invalide'),
  email: z.string().email('Email invalide'),
  message: z.string().min(5, 'Message requis'),
})
type FormData = z.infer<typeof schema>

const categoryLabels: Record<string, string> = {
  appartement: 'Appartement', maison: 'Maison', immeuble: 'Immeuble',
  bureau: 'Bureau', villa: 'Villa', terrain: 'Terrain',
}

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const property = getPropertyBySlug(slug ?? '')

  const [imgIndex, setImgIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  if (!property) return <Navigate to="/services/immobilier" replace />

  const onSubmit = async (_data: FormData) => {
    setLoading(true)
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
    reset()
  }

  const whatsappMsg = encodeURIComponent(
    `Bonjour ACG 👋\nJe suis intéressé(e) par le bien suivant :\n📌 ${property.title}\n📍 ${property.location}\n💰 ${formatPrice(property.price, property.currency, property.priceSuffix)}\n\nMerci de me recontacter.`
  )
  const whatsappUrl = `https://wa.me/${property.whatsappNumber.replace(/\s/g, '')}?text=${whatsappMsg}`

  const prev = () => setImgIndex((i) => (i === 0 ? property.images.length - 1 : i - 1))
  const next = () => setImgIndex((i) => (i === property.images.length - 1 ? 0 : i + 1))

  return (
    <>
      <title>{property.title} – ACG Immobilier</title>

      {/* Back nav */}
      <div style={{ background: '#F5F7FA', paddingTop: '96px', paddingBottom: '16px' }}>
        <Container size="xl">
          <Link
            to="/services/immobilier"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: '#0B1F3A', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
            }}
          >
            <ArrowLeft size={15} /> Retour aux annonces
          </Link>
        </Container>
      </div>

      <section style={{ background: '#F5F7FA', paddingBottom: '80px' }}>
        <Container size="xl">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: '32px', alignItems: 'start' }}>

            {/* ── LEFT ─────────────────────────────────────── */}
            <div>
              {/* Image gallery */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '24px', position: 'relative', background: '#0B1F3A' }}>
                <div style={{ position: 'relative', height: '460px' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={property.images[imgIndex]}
                      alt={`${property.title} - photo ${imgIndex + 1}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </AnimatePresence>

                  {/* Badges */}
                  <div
                    style={{
                      position: 'absolute', top: '16px', left: '16px',
                      background: property.type === 'vente' ? '#0B1F3A' : '#D4A72C',
                      color: property.type === 'vente' ? '#FFFFFF' : '#0B1F3A',
                      fontSize: '12px', fontWeight: 700, padding: '6px 14px',
                      borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.07em',
                    }}
                  >
                    {property.type === 'vente' ? 'À Vendre' : 'À Louer'}
                  </div>

                  {/* Arrows */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        style={{
                          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        aria-label="Photo précédente"
                      >
                        <ChevronLeft size={20} color="#0B1F3A" />
                      </button>
                      <button
                        onClick={next}
                        style={{
                          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        aria-label="Photo suivante"
                      >
                        <ChevronRight size={20} color="#0B1F3A" />
                      </button>
                    </>
                  )}

                  {/* Counter */}
                  <div
                    style={{
                      position: 'absolute', bottom: '14px', right: '14px',
                      background: 'rgba(11,31,58,0.75)', backdropFilter: 'blur(6px)',
                      color: '#FFFFFF', fontSize: '12px', fontWeight: 600,
                      padding: '5px 12px', borderRadius: '6px',
                    }}
                  >
                    {imgIndex + 1} / {property.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {property.images.length > 1 && (
                  <div style={{ display: 'flex', gap: '8px', padding: '12px', background: '#0B1F3A' }}>
                    {property.images.map((img, i) => (
                      <motion.img
                        key={i}
                        src={img}
                        alt=""
                        onClick={() => setImgIndex(i)}
                        whileHover={{ opacity: 1 }}
                        style={{
                          width: '72px', height: '52px', objectFit: 'cover',
                          borderRadius: '8px', cursor: 'pointer',
                          opacity: i === imgIndex ? 1 : 0.45,
                          border: i === imgIndex ? '2px solid #D4A72C' : '2px solid transparent',
                          transition: 'opacity 0.2s, border-color 0.2s',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title + price */}
              <AnimatedSection>
                <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div
                        style={{
                          display: 'inline-block', background: 'rgba(212,167,44,0.10)',
                          color: '#D4A72C', fontSize: '11px', fontWeight: 700,
                          padding: '4px 12px', borderRadius: '6px',
                          textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px',
                        }}
                      >
                        {categoryLabels[property.category]}
                      </div>
                      <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 800, color: '#0B1F3A', lineHeight: 1.2 }}>
                        {property.title}
                      </h1>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: '#D4A72C' }}>
                        {formatPrice(property.price, property.currency, property.priceSuffix)}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4B5563', fontSize: '14px', marginBottom: '20px' }}>
                    <MapPin size={15} color="#D4A72C" />
                    {property.location}, {property.city}
                  </div>

                  {/* Specs */}
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid rgba(11,31,58,0.07)' }}>
                    {[
                      { icon: <Maximize2 size={16} color="#D4A72C" />, label: `${property.surface} m²` },
                      ...(property.rooms ? [{ icon: <BedDouble size={16} color="#D4A72C" />, label: `${property.rooms} pièces` }] : []),
                      ...(property.bathrooms ? [{ icon: <Bath size={16} color="#D4A72C" />, label: `${property.bathrooms} sdb` }] : []),
                    ].map((spec, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#0B1F3A' }}>
                        {spec.icon} {spec.label}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Description */}
              <AnimatedSection delay={0.1}>
                <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '14px' }}>Description</h2>
                  <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.8 }}>{property.description}</p>
                </div>
              </AnimatedSection>

              {/* Features */}
              <AnimatedSection delay={0.15}>
                <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '16px' }}>Équipements & caractéristiques</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                    {property.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D4A72C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={13} color="#0B1F3A" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '14px', color: '#0B1F3A', fontWeight: 500 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* ── RIGHT – Contact sticky ────────────────────── */}
            <div style={{ position: 'sticky', top: '100px' }}>

              {/* WhatsApp CTA */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', background: '#25D366', color: '#FFFFFF',
                  fontWeight: 700, fontSize: '15px', padding: '16px',
                  borderRadius: '14px', textDecoration: 'none', marginBottom: '12px',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.30)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contacter sur WhatsApp
              </motion.a>

              {/* Phone CTA */}
              <motion.a
                href={`tel:${WHATSAPP_ACG}`}
                whileHover={{ scale: 1.02, y: -2 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', background: '#0B1F3A', color: '#FFFFFF',
                  fontWeight: 700, fontSize: '15px', padding: '14px',
                  borderRadius: '14px', textDecoration: 'none', marginBottom: '20px',
                }}
              >
                <Phone size={18} /> Appeler maintenant
              </motion.a>

              {/* Formulaire de demande */}
              <div
                style={{
                  background: '#FFFFFF', borderRadius: '16px', padding: '24px',
                  border: '1px solid rgba(11,31,58,0.07)',
                  boxShadow: '0 4px 24px rgba(11,31,58,0.06)',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #D4A72C', display: 'inline-block' }}>
                  Envoyer une demande
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '24px 0' }}
                  >
                    <CheckCircle size={44} color="#D4A72C" style={{ marginBottom: '12px' }} />
                    <p style={{ fontWeight: 700, color: '#0B1F3A', marginBottom: '6px' }}>Demande envoyée !</p>
                    <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px' }}>
                      Notre équipe vous contactera très rapidement.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      style={{
                        background: '#0B1F3A', color: '#FFFFFF', fontWeight: 700,
                        fontSize: '13px', padding: '10px 20px', borderRadius: '8px',
                        border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
                      }}
                    >
                      Nouvelle demande
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { label: 'Nom complet *', name: 'name', placeholder: 'Votre nom', type: 'text' },
                      { label: 'Téléphone *', name: 'phone', placeholder: '+225 00 00 00 00', type: 'tel' },
                      { label: 'Email *', name: 'email', placeholder: 'votre@email.com', type: 'email' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#0B1F3A', display: 'block', marginBottom: '5px' }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          style={{
                            width: '100%', padding: '11px 14px', borderRadius: '9px',
                            border: '1.5px solid rgba(11,31,58,0.14)',
                            fontFamily: 'Manrope, sans-serif', fontSize: '13px',
                            color: '#0B1F3A', outline: 'none', boxSizing: 'border-box',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
                          {...register(field.name as keyof FormData)}
                        />
                        {errors[field.name as keyof FormData] && (
                          <span style={{ fontSize: '11px', color: '#e53e3e', marginTop: '3px', display: 'block' }}>
                            {errors[field.name as keyof FormData]?.message}
                          </span>
                        )}
                      </div>
                    ))}

                    {/* Message with property pre-filled */}
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#0B1F3A', display: 'block', marginBottom: '5px' }}>
                        Message *
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={`Bonjour, je suis intéressé(e) par "${property.title}". Merci de me recontacter.`}
                        style={{
                          width: '100%', padding: '11px 14px', borderRadius: '9px',
                          border: '1.5px solid rgba(11,31,58,0.14)',
                          fontFamily: 'Manrope, sans-serif', fontSize: '13px',
                          color: '#0B1F3A', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
                        {...register('message')}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: '#D4A72C', color: '#0B1F3A', fontWeight: 700,
                        fontSize: '14px', padding: '13px', borderRadius: '10px',
                        border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'Manrope, sans-serif', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', gap: '8px',
                        opacity: loading ? 0.8 : 1,
                      }}
                    >
                      {loading ? 'Envoi...' : <><Send size={15} /> Envoyer ma demande</>}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
