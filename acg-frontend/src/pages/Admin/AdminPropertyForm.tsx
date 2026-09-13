import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, X, Save } from 'lucide-react'
import { Property, PropertyType, PropertyCategory } from '../../types'
import { createProperty, updateProperty } from '../../utils/adminStore'

interface Props {
  property?: Property | null
  onSave: () => void
  onCancel: () => void
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
}

const Field = ({
  label, error, textarea = false, select, options, ...props
}: {
  label: string
  error?: string
  textarea?: boolean
  select?: boolean
  options?: { label: string; value: string }[]
  [key: string]: unknown
}) => {
  const base: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: `1.5px solid ${error ? '#dc2626' : 'rgba(11,31,58,0.14)'}`,
    fontFamily: 'Manrope, sans-serif', fontSize: '14px',
    color: '#0B1F3A', outline: 'none', boxSizing: 'border-box',
    background: '#FFFFFF',
  }
  return (
    <div>
      <label style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A', display: 'block', marginBottom: '6px' }}>
        {label}
      </label>
      {select ? (
        <select
          style={{ ...base, cursor: 'pointer' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,31,58,0.14)')}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : textarea ? (
        <textarea
          style={{ ...base, minHeight: '100px', resize: 'vertical' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
          onBlur={(e) => (e.currentTarget.style.borderColor = error ? '#dc2626' : 'rgba(11,31,58,0.14)')}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          style={base}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
          onBlur={(e) => (e.currentTarget.style.borderColor = error ? '#dc2626' : 'rgba(11,31,58,0.14)')}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span style={{ fontSize: '11px', color: '#dc2626', marginTop: '3px', display: 'block' }}>{error}</span>}
    </div>
  )
}

export default function AdminPropertyForm({ property, onSave, onCancel }: Props) {
  const isEdit = !!property

  const [form, setForm] = useState({
    title: property?.title ?? '',
    type: (property?.type ?? 'vente') as PropertyType,
    category: (property?.category ?? 'appartement') as PropertyCategory,
    price: property?.price?.toString() ?? '',
    priceSuffix: property?.priceSuffix ?? '',
    currency: property?.currency ?? 'FCFA',
    location: property?.location ?? '',
    city: property?.city ?? '',
    surface: property?.surface?.toString() ?? '',
    rooms: property?.rooms?.toString() ?? '',
    bathrooms: property?.bathrooms?.toString() ?? '',
    description: property?.description ?? '',
    whatsappNumber: property?.whatsappNumber ?? '+2210000',
    published: property?.published ?? false,
  })

  const [features, setFeatures] = useState<string[]>(property?.features ?? [])
  const [featureInput, setFeatureInput] = useState('')
  const [images, setImages] = useState<string[]>(property?.images ?? [''])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }))

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures((f) => [...f, featureInput.trim()])
      setFeatureInput('')
    }
  }

  const removeFeature = (i: number) => setFeatures((f) => f.filter((_, idx) => idx !== i))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = 'Titre requis'
    if (!form.price || isNaN(Number(form.price))) e.price = 'Prix invalide'
    if (!form.location.trim()) e.location = 'Localisation requise'
    if (!form.city.trim()) e.city = 'Ville requise'
    if (!form.surface || isNaN(Number(form.surface))) e.surface = 'Surface invalide'
    if (!form.description.trim()) e.description = 'Description requise'
    if (images.filter(Boolean).length === 0) e.images = 'Au moins une image requise'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))

    const data = {
      title: form.title,
      slug: slugify(form.title),
      type: form.type,
      category: form.category,
      price: Number(form.price),
      priceSuffix: form.priceSuffix || undefined,
      currency: form.currency,
      location: form.location,
      city: form.city,
      surface: Number(form.surface),
      rooms: form.rooms ? Number(form.rooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      description: form.description,
      features,
      images: images.filter(Boolean),
      whatsappNumber: form.whatsappNumber,
      published: form.published,
    }

    if (isEdit && property) {
      updateProperty(property.id, data)
    } else {
      createProperty(data)
    }
    setSaving(false)
    onSave()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA', fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#0B1F3A', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <button
            onClick={onCancel}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <h1 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
            {isEdit ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
          </h1>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: saving ? 1 : 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#D4A72C', color: '#0B1F3A', fontWeight: 700,
              fontSize: '14px', padding: '10px 18px', borderRadius: '10px',
              border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              fontFamily: 'Manrope, sans-serif', opacity: saving ? 0.8 : 1,
            }}
          >
            <Save size={15} />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </motion.button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Section Informations générales */}
          <div style={{ gridColumn: '1 / -1' }}>
            <SectionHeader title="Informations générales" />
          </div>

          <Field
            label="Titre de l'annonce *"
            placeholder="Ex: Villa de standing – Cocody"
            value={form.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('title', e.target.value)}
            error={errors.title}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <Field
              label="Type *"
              select
              options={[{ label: 'À Vendre', value: 'vente' }, { label: 'À Louer', value: 'location' }]}
              value={form.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                set('type', e.target.value)
                set('priceSuffix', e.target.value === 'location' ? '/mois' : '')
              }}
            />
            <Field
              label="Catégorie *"
              select
              options={[
                { label: 'Appartement', value: 'appartement' },
                { label: 'Maison', value: 'maison' },
                { label: 'Villa', value: 'villa' },
                { label: 'Immeuble', value: 'immeuble' },
                { label: 'Bureau', value: 'bureau' },
                { label: 'Terrain', value: 'terrain' },
              ]}
              value={form.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set('category', e.target.value)}
            />
          </div>

          {/* Section Prix */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Prix" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', gridColumn: '1 / -1' }}>
            <Field
              label="Prix *"
              type="number"
              placeholder="Ex: 85000000"
              value={form.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('price', e.target.value)}
              error={errors.price}
            />
            <Field
              label="Devise"
              select
              options={[{ label: 'FCFA', value: 'FCFA' }, { label: 'EUR (€)', value: '€' }, { label: 'USD ($)', value: '$' }]}
              value={form.currency}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => set('currency', e.target.value)}
            />
            <Field
              label="Suffixe (optionnel)"
              placeholder="/mois"
              value={form.priceSuffix}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('priceSuffix', e.target.value)}
            />
          </div>

          {/* Section Localisation */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Localisation" />
          </div>

          <Field
            label="Adresse / Quartier *"
            placeholder="Ex: Cocody, Angré"
            value={form.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('location', e.target.value)}
            error={errors.location}
          />
          <Field
            label="Ville *"
            placeholder="Ex: Abidjan"
            value={form.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('city', e.target.value)}
            error={errors.city}
          />

          {/* Section Caractéristiques */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Caractéristiques" />
          </div>

          <Field
            label="Surface (m²) *"
            type="number"
            placeholder="Ex: 150"
            value={form.surface}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('surface', e.target.value)}
            error={errors.surface}
          />
          <Field
            label="Nombre de pièces"
            type="number"
            placeholder="Ex: 4"
            value={form.rooms}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('rooms', e.target.value)}
          />
          <Field
            label="Salles de bain"
            type="number"
            placeholder="Ex: 2"
            value={form.bathrooms}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('bathrooms', e.target.value)}
          />

          {/* Section Description */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Description" />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <Field
              label="Description *"
              textarea
              placeholder="Décrivez le bien en détail..."
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set('description', e.target.value)}
              error={errors.description}
            />
          </div>

          {/* Features */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Équipements & caractéristiques" />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Ex: Piscine privée"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                style={{
                  flex: 1, padding: '11px 14px', borderRadius: '10px',
                  border: '1.5px solid rgba(11,31,58,0.14)',
                  fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#0B1F3A', outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,31,58,0.14)')}
              />
              <motion.button
                onClick={addFeature}
                whileHover={{ scale: 1.05 }}
                style={{ background: '#D4A72C', color: '#0B1F3A', border: 'none', borderRadius: '10px', padding: '0 18px', cursor: 'pointer', fontWeight: 700, fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={15} /> Ajouter
              </motion.button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(212,167,44,0.1)', border: '1px solid rgba(212,167,44,0.25)', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', fontWeight: 600, color: '#0B1F3A' }}>
                  {f}
                  <button onClick={() => removeFeature(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#4B5563', padding: 0 }}>
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images URLs */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Images (URLs)" />
            {errors.images && <p style={{ color: '#dc2626', fontSize: '12px', marginBottom: '8px' }}>{errors.images}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {images.map((img, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="url"
                    placeholder={`URL image ${i + 1}`}
                    value={img}
                    onChange={(e) => {
                      const arr = [...images]
                      arr[i] = e.target.value
                      setImages(arr)
                    }}
                    style={{ flex: 1, padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(11,31,58,0.14)', fontFamily: 'Manrope, sans-serif', fontSize: '13px', color: '#0B1F3A', outline: 'none' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,31,58,0.14)')}
                  />
                  {img && <img src={img} alt="" style={{ width: '60px', height: '44px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />}
                  {images.length > 1 && (
                    <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setImages([...images, ''])}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1.5px dashed rgba(11,31,58,0.2)', borderRadius: '10px', padding: '10px 16px', cursor: 'pointer', color: '#4B5563', fontWeight: 600, fontSize: '13px', fontFamily: 'Manrope, sans-serif' }}
              >
                <Plus size={14} /> Ajouter une image
              </button>
            </div>
          </div>

          {/* WhatsApp & Statut */}
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <SectionHeader title="Contact & Publication" />
          </div>

          <Field
            label="Numéro WhatsApp"
            placeholder="+22500000000"
            value={form.whatsappNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set('whatsappNumber', e.target.value)}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '22px' }}>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, color: '#0B1F3A' }}
            >
              <div
                onClick={() => set('published', !form.published)}
                style={{
                  width: '44px', height: '24px', borderRadius: '12px',
                  background: form.published ? '#16a34a' : 'rgba(11,31,58,0.15)',
                  position: 'relative', transition: 'background 0.25s', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%', background: '#FFFFFF',
                  position: 'absolute', top: '3px',
                  left: form.published ? '23px' : '3px',
                  transition: 'left 0.25s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }} />
              </div>
              {form.published ? '✅ Publiée (visible sur le site)' : '⏸️ Non publiée (masquée)'}
            </label>
          </div>

        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ borderBottom: '2px solid #D4A72C', paddingBottom: '8px', marginBottom: '16px', display: 'inline-block' }}>
      <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{title}</h3>
    </div>
  )
}
