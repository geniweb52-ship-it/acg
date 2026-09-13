import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut, Plus, Eye, EyeOff, Trash2, Edit3,
  Home, Building2, BarChart3, CheckCircle, XCircle
} from 'lucide-react'
import { Property } from '../../types'
import {
  getAllProperties, deleteProperty, togglePublish,
  adminLogout, isAdminAuthenticated
} from '../../utils/adminStore'
import { formatPrice } from '../../utils/propertiesData'
import AdminPropertyForm from './AdminPropertyForm'

const categoryLabels: Record<string, string> = {
  appartement: 'Appartement', maison: 'Maison', immeuble: 'Immeuble',
  bureau: 'Bureau', villa: 'Villa', terrain: 'Terrain',
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState<Property[]>([])
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list')
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin')
      return
    }
    setProperties(getAllProperties())
  }, [navigate])

  const refresh = () => setProperties(getAllProperties())

  const handleLogout = () => {
    adminLogout()
    navigate('/admin')
  }

  const handleDelete = (id: string) => {
    deleteProperty(id)
    setDeleteConfirm(null)
    refresh()
  }

  const handleToggle = (id: string) => {
    togglePublish(id)
    refresh()
  }

  const published = properties.filter((p) => p.published).length
  const unpublished = properties.length - published

  if (view === 'add' || view === 'edit') {
    return (
      <AdminPropertyForm
        property={editingProperty}
        onSave={() => { refresh(); setView('list'); setEditingProperty(null) }}
        onCancel={() => { setView('list'); setEditingProperty(null) }}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA', fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#0B1F3A', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#D4A72C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '12px', color: '#0B1F3A' }}>
              ACG
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Administration</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Gestion des annonces</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link
              to="/services/immobilier"
              target="_blank"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
            >
              <Eye size={14} /> Voir le site
            </Link>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#FFFFFF', fontWeight: 600, fontSize: '13px', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
            >
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { icon: <Home size={20} />, label: 'Total annonces', value: properties.length, color: '#0B1F3A' },
            { icon: <CheckCircle size={20} />, label: 'Publiées', value: published, color: '#16a34a' },
            { icon: <XCircle size={20} />, label: 'Non publiées', value: unpublished, color: '#dc2626' },
            { icon: <BarChart3 size={20} />, label: 'À vendre', value: properties.filter(p => p.type === 'vente').length, color: '#D4A72C' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: '#FFFFFF', borderRadius: '14px', padding: '20px',
                border: '1px solid rgba(11,31,58,0.07)',
                boxShadow: '0 2px 12px rgba(11,31,58,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ color: stat.color }}>{stat.icon}</div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Header + Add button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0B1F3A' }}>
            Toutes les annonces
          </h2>
          <motion.button
            onClick={() => { setEditingProperty(null); setView('add') }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#D4A72C', color: '#0B1F3A', fontWeight: 700,
              fontSize: '14px', padding: '12px 20px', borderRadius: '10px',
              border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
            }}
          >
            <Plus size={16} /> Nouvelle annonce
          </motion.button>
        </div>

        {/* Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(11,31,58,0.07)', overflow: 'hidden', boxShadow: '0 2px 16px rgba(11,31,58,0.05)' }}>
          {properties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#4B5563' }}>
              <Building2 size={40} color="rgba(11,31,58,0.15)" style={{ marginBottom: '12px' }} />
              <p style={{ fontWeight: 600 }}>Aucune annonce pour l'instant.</p>
              <p style={{ fontSize: '13px', marginTop: '4px' }}>Cliquez sur "Nouvelle annonce" pour commencer.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(11,31,58,0.08)', background: '#F5F7FA' }}>
                    {['Bien', 'Type', 'Prix', 'Localisation', 'Statut', 'Actions'].map((h) => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={{ borderBottom: '1px solid rgba(11,31,58,0.06)', transition: 'background 0.15s' }}
                      onMouseOver={(e) => (e.currentTarget.style.background = '#FAFAFA')}
                      onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Bien */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                          />
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0B1F3A', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#4B5563' }}>{categoryLabels[p.category]}</div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          background: p.type === 'vente' ? '#0B1F3A' : 'rgba(212,167,44,0.15)',
                          color: p.type === 'vente' ? '#FFFFFF' : '#D4A72C',
                          fontSize: '11px', fontWeight: 700, padding: '4px 10px',
                          borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                          {p.type === 'vente' ? 'Vente' : 'Location'}
                        </span>
                      </td>

                      {/* Prix */}
                      <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#D4A72C', whiteSpace: 'nowrap' }}>
                        {formatPrice(p.price, p.currency, p.priceSuffix)}
                      </td>

                      {/* Localisation */}
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: '#4B5563', whiteSpace: 'nowrap' }}>
                        {p.city}
                      </td>

                      {/* Statut */}
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          onClick={() => handleToggle(p.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: p.published ? 'rgba(22,163,74,0.10)' : 'rgba(220,38,38,0.08)',
                            color: p.published ? '#16a34a' : '#dc2626',
                            fontSize: '12px', fontWeight: 700, padding: '5px 12px',
                            borderRadius: '6px', border: 'none', cursor: 'pointer',
                            fontFamily: 'Manrope, sans-serif', whiteSpace: 'nowrap',
                          }}
                          title={p.published ? 'Cliquer pour dépublier' : 'Cliquer pour publier'}
                        >
                          {p.published ? <><Eye size={12} /> Publiée</> : <><EyeOff size={12} /> Masquée</>}
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            onClick={() => { setEditingProperty(p); setView('edit') }}
                            style={{
                              width: '32px', height: '32px', borderRadius: '8px',
                              background: 'rgba(11,31,58,0.06)', border: 'none',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B1F3A',
                            }}
                            title="Modifier"
                          >
                            <Edit3 size={14} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            onClick={() => setDeleteConfirm(p.id)}
                            style={{
                              width: '32px', height: '32px', borderRadius: '8px',
                              background: 'rgba(220,38,38,0.08)', border: 'none',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626',
                            }}
                            title="Supprimer"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(11,31,58,0.6)',
              backdropFilter: 'blur(4px)', zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
            }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF', borderRadius: '20px', padding: '36px',
                maxWidth: '380px', width: '100%', textAlign: 'center',
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#dc2626' }}>
                <Trash2 size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '8px' }}>Supprimer l'annonce ?</h3>
              <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '24px' }}>
                Cette action est irréversible.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1.5px solid rgba(11,31,58,0.15)', background: 'transparent', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', color: '#0B1F3A' }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#dc2626', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
