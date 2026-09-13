import { Suspense, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AppRoutes from './routes/AppRoutes'
import PageLoader from './components/common/PageLoader'
import WhatsAppButton from './components/common/WhatsAppButton'
import ScrollToTop from './components/common/ScrollToTop'
import SplashScreen from './components/common/SplashScreen'

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {/* Splash screen — affiché uniquement au premier chargement */}
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      {/* Main app — fade-in une fois le splash terminé */}
      <AnimatePresence>
        {splashDone && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <AppRoutes />
              </Suspense>
              <WhatsAppButton />
            </BrowserRouter>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
