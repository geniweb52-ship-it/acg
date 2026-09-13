import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Message {
  sender: 'ai' | 'user'
  text: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    sender: 'ai',
    text: "Bonjour ! Je suis l'assistant virtuel d'Alpha Consulting Group (ACG). Posez-moi vos questions sur nos services (Immobilier, Logistique, Communication, Livraison) ou nos réalisations !",
  },
]

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMsg = inputValue.trim()
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response based on keywords or general query
    setTimeout(() => {
      let reply = "Je vous remercie pour votre question concernant Alpha Consulting Group. Pour toute demande spécifique ou devis détaillé, vous pouvez consulter notre page Contact ou appeler notre service client."
      
      const lower = userMsg.toLowerCase()
      if (lower.includes('immobilier') || lower.includes('appartement') || lower.includes('maison') || lower.includes('terrain')) {
        reply = "ACG propose des biens immobiliers de premier choix (appartements, terrains viabilisés, villas) au Sénégal et en Afrique. Souhaitez-vous voir nos offres disponibles ?"
      } else if (lower.includes('logistique') || lower.includes('transport') || lower.includes('stockage')) {
        reply = "Notre pôle Logistique gère la chaîne d'approvisionnement, le transport de marchandises sécurisé et l'entreposage adapté à vos besoins professionnels."
      } else if (lower.includes('communication') || lower.includes('marketing') || lower.includes('pub') || lower.includes('agence')) {
        reply = "Notre agence de communication conçoit votre stratégie de marque, vos campagnes publicitaires, la création de sites web et la gestion de vos réseaux sociaux."
      } else if (lower.includes('livraison') || lower.includes('colis') || lower.includes('coursier')) {
        reply = "Nous assurons des services de livraison express et sécurisée de colis et documents sur Dakar et dans toute la région."
      } else if (lower.includes('contact') || lower.includes('telephone') || lower.includes('adresse') || lower.includes('horaire')) {
        reply = "Vous pouvez nous joindre au +221 77 650 26 98 ou par email à contact@alphaconsultinggroup.com. Notre bureau est situé à Dakar."
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 1000,
        fontFamily: 'inherit',
      }}
    >
      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'absolute',
              bottom: '72px',
              right: '0',
              width: '380px',
              maxWidth: 'calc(100vw - 48px)',
              height: '500px',
              maxHeight: 'calc(100vh - 120px)',
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(11, 31, 58, 0.2)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(11, 31, 58, 0.1)',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: '#0B1F3A',
                color: '#FFFFFF',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#D97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: '18px',
                    }}
                  >
                    🤖
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      background: '#22C55E',
                      borderRadius: '50%',
                      border: '2px solid #0B1F3A',
                    }}
                  />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Assistant ACG (IA)</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8' }}>En ligne • Posez vos questions ici</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '4px',
                }}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages Area */}
            <div
              style={{
                padding: '16px',
                background: '#F8FAFC',
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      background: msg.sender === 'user' ? '#0B1F3A' : '#FFFFFF',
                      color: msg.sender === 'user' ? '#FFFFFF' : '#1E293B',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      ...(msg.sender === 'user'
                        ? { borderTopRightRadius: '2px' }
                        : { borderTopLeftRadius: '2px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }),
                      fontSize: '13px',
                      lineHeight: '1.5',
                      maxWidth: '85%',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      background: '#FFFFFF',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      borderTopLeftRadius: '2px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      fontSize: '13px',
                      color: '#64748B',
                      fontStyle: 'italic',
                    }}
                  >
                    ACG Assistant écrit...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              style={{
                padding: '12px',
                background: '#FFFFFF',
                borderTop: '1px solid #E2E8F0',
                display: 'flex',
                gap: '8px',
              }}
            >
              <input
                type="text"
                placeholder="Posez votre question sur ACG..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#0B1F3A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0 16px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Envoyer
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chatbot Trigger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir l'assistant virtuel"
      >
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            style={{
              background: '#0B1F3A',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(11,31,58,0.25)',
            }}
          >
            Posez vos questions !
          </motion.div>
        )}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(11, 31, 58, 0.4)',
              '0 0 0 12px rgba(11, 31, 58, 0)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#0B1F3A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(11,31,58,0.3)',
            color: '#FFFFFF',
            fontSize: '26px',
          }}
        >
          {isOpen ? '✕' : '🤖'}
        </motion.div>
      </motion.div>
    </div>
  )
}
