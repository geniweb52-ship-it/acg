import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { adminLogin } from '../../utils/adminStore'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const ok = adminLogin(username, password)
    setLoading(false)
    if (ok) {
      navigate('/admin/dashboard')
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0B1F3A 0%, #132F52 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #D4A72C, #E8C65A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 24px rgba(212,167,44,0.35)',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#0B1F3A', fontFamily: 'Manrope, sans-serif' }}>
              ACG
            </span>
          </div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '4px' }}>
            Espace Administration
          </h1>
          <p style={{ fontSize: '13px', color: '#4B5563' }}>
            Connectez-vous pour gérer les annonces
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.25)',
              borderRadius: '10px', padding: '12px 14px', marginBottom: '20px',
              color: '#c53030', fontSize: '13px', fontWeight: 600,
            }}
          >
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Username */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A', display: 'block', marginBottom: '7px' }}>
              Nom d'utilisateur
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#D4A72C" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                style={{
                  width: '100%', padding: '13px 14px 13px 42px',
                  borderRadius: '10px', border: '1.5px solid rgba(11,31,58,0.14)',
                  fontFamily: 'Manrope, sans-serif', fontSize: '14px',
                  color: '#0B1F3A', outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,31,58,0.14)')}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A', display: 'block', marginBottom: '7px' }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#D4A72C" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '13px 44px 13px 42px',
                  borderRadius: '10px', border: '1.5px solid rgba(11,31,58,0.14)',
                  fontFamily: 'Manrope, sans-serif', fontSize: '14px',
                  color: '#0B1F3A', outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D4A72C')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(11,31,58,0.14)')}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563',
                  display: 'flex', alignItems: 'center',
                }}
                aria-label={showPass ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #0B1F3A, #132F52)',
              color: '#FFFFFF', fontWeight: 700, fontSize: '15px',
              padding: '15px', borderRadius: '12px', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Manrope, sans-serif', marginTop: '8px',
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#4B5563' }}>
          Accès réservé à l'équipe ACG
        </p>
      </motion.div>
    </div>
  )
}
