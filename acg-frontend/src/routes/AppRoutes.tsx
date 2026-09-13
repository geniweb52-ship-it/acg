import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const Services = lazy(() => import('../pages/Services/Services'))
const ServiceImmobilier = lazy(() => import('../pages/Services/ServiceImmobilier'))
const PropertyDetail = lazy(() => import('../pages/Services/PropertyDetail'))
const ServiceLogistique = lazy(() => import('../pages/Services/ServiceLogistique'))
const ServiceCommunication = lazy(() => import('../pages/Services/ServiceCommunication'))
const ServiceLivraison = lazy(() => import('../pages/Services/ServiceLivraison'))
const Realisations = lazy(() => import('../pages/Realisations/Realisations'))
const Actualites = lazy(() => import('../pages/Actualites/Actualites'))
const ArticleDetail = lazy(() => import('../pages/Actualites/ArticleDetail'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

// Admin (pas de layout principal)
const AdminLogin = lazy(() => import('../pages/Admin/AdminLogin'))
const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'))

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Site public ── */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/immobilier" element={<ServiceImmobilier />} />
        <Route path="services/immobilier/:slug" element={<PropertyDetail />} />
        <Route path="services/logistique" element={<ServiceLogistique />} />
        <Route path="services/communication" element={<ServiceCommunication />} />
        <Route path="services/livraison" element={<ServiceLivraison />} />
        <Route path="realisations" element={<Realisations />} />
        <Route path="actualites" element={<Actualites />} />
        <Route path="actualites/:slug" element={<ArticleDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ── Admin (sans layout public) ── */}
      <Route path="admin" element={<AdminLogin />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}
