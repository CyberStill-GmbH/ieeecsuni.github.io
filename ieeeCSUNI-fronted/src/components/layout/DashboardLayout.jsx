// src/components/layout/DashboardLayout.jsx
// ============================================================
// Wrapper principal del dashboard. Envuelve todas las páginas
// de las tres zonas (member, admin, user).
//
// CÓMO USAR:
//   <DashboardLayout role="member" user={currentUser}>
//     <MemberDashboard />
//   </DashboardLayout>
//
// CONECTAR CON ROUTER:
//   - Usa useLocation().pathname para activePath
//   - Usa useNavigate() para onNavigate
// ============================================================

import Sidebar from './Sidebar'
import { useState } from 'react'

export default function DashboardLayout({ role, user, activePath, onNavigate, onLogout, children }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      <Sidebar
        role={role}
        user={user}
        activePath={activePath}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      {/* Contenido principal — margen izquierdo deja espacio al sidebar */}
      {/* NOTA: ajusta ml-60 a ml-16 cuando el sidebar esté colapsado (maneja estado aquí si lo necesitas) */}
      <main className="ml-60 min-h-screen p-6 relative z-10 transition-all duration-300">
        {children}
      </main>
    </div>
  )
}
