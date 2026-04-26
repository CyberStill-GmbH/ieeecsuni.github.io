// src/Layout.jsx
// ============================================================
// Punto de entrada de la app.
// Demo mode: cambia el rol con los botones del header para
// previsualizar cada zona.
//
// EN PRODUCCIÓN:
//   - Elimina los botones de cambio de rol
//   - Conecta `currentUser` con tu sistema de auth (Sanctum)
//   - Usa react-router-dom para el enrutamiento real
//   - El rol viene del JWT / sesión del backend Laravel
//
// RUTAS SUGERIDAS (react-router-dom):
//   /member/*  → DashboardLayout role="member"
//   /admin/*   → DashboardLayout role="admin" (guard: require admin)
//   /user/*    → DashboardLayout role="user"
//   /login     → LoginPage
// ============================================================


import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

//pages
import HomePage from './pages/HomePage'
import NosotrosPage from './pages/NosotrosPage'
import EventosPage from './pages/EventosPage'
import RecursosPage from './pages/RecursosPage'
import EquipoPage from './pages/EquipoPage'
import ContactoPage from './pages/ContactoPage'
import ProyectosPage from './pages/ProyectosPage'
import NotFoundPage from './pages/NotFoundPage'


function Layout() {
  const { pathname } = useLocation()
  const NO_UI = ['/login', '/member', '/admin', '/User', '/user', '/Admin', '/Member']
  // Verificamos si la ruta actual coincide con las rutas sin footer
  // Usamos startsWith por si hay subrutas en el dashboard
  const hideUI = NO_UI.some(r => pathname.startsWith(r))

  const showFooter = !hideUI
  const showNavbar = !hideUI

  return (
    <>
      { showNavbar && <Navbar /> }
      <main className="min-h-screen">
        <Routes>
          {/* HEROPAGE */}
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path='/proyectos' element={ < ProyectosPage /> } />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout