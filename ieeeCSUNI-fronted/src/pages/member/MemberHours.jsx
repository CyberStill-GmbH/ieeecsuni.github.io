// src/pages/member/MemberHours.jsx
// ============================================================
// Zona de voluntariado del miembro.
// El miembro puede:
//   - Ver sus solicitudes (historial completo)
//   - Crear nuevas solicitudes de horas
//   - Ver el estado de cada solicitud (pendiente/aprobada/rechazada)
//   - Ver su progreso hacia la meta anual
//
// CONECTAR CON API:
//   GET  /api/member/volunteer-hours     → lista de solicitudes
//   POST /api/member/volunteer-hours     → crear solicitud
//   Meta anual → GET /api/settings?key=volunteer_goal
// ============================================================

import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { GlassCard, Badge, PageHeader, PrimaryButton, GlassInput, GlassSelect, EmptyState } from '../../components/layout/UI'

// Mock — REEMPLAZAR con fetch a Laravel
const mockSolicitudes = [
  { id: 1, actividad: 'Taller de React para nuevos miembros', fecha: '2025-03-15', horas: 3, status: 'approved',  comentario: 'Excelente trabajo.' },
  { id: 2, actividad: 'Apoyo en stand de feria vocacional',   fecha: '2025-03-22', horas: 4, status: 'approved',  comentario: '' },
  { id: 3, actividad: 'Reunión de planificación IEEE Xtreme', fecha: '2025-04-01', horas: 2, status: 'pending',   comentario: '' },
  { id: 4, actividad: 'Diseño de materiales del capítulo',   fecha: '2025-03-10', horas: 5, status: 'rejected',  comentario: 'No corresponde a voluntariado directo del capítulo.' },
]

const META_ANUAL = 40
const horasAprobadas = mockSolicitudes.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.horas, 0)

export default function MemberHours({ user = { name: 'Adrián César' }, onNavigate, onLogout }) {
  const [activePath] = useState('/member/hours')
  const [showForm, setShowForm] = useState(false)

  // Estado del formulario — conectar con POST /api/member/volunteer-hours
  const [form, setForm] = useState({ actividad: '', fecha: '', horas: '', descripcion: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST al backend Laravel
    // const res = await fetch('/api/member/volunteer-hours', { method: 'POST', body: JSON.stringify(form) })
    console.log('Enviar solicitud:', form)
    setShowForm(false)
    setForm({ actividad: '', fecha: '', horas: '', descripcion: '' })
  }

  const pct = Math.min(100, Math.round((horasAprobadas / META_ANUAL) * 100))

  return (
    
      <div className="max-w-5xl mx-auto animate-fade-up">

        <PageHeader
          title="Voluntariado"
          subtitle={`${horasAprobadas} de ${META_ANUAL} horas aprobadas este año`}
          action={
            <PrimaryButton onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancelar' : '+ Nueva solicitud'}
            </PrimaryButton>
          }
        />

        {/* ── Barra de progreso meta anual ── */}
        <GlassCard className="p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: '#e8edf5' }}>Progreso anual</span>
            <span className="text-xs font-mono" style={{ color: '#4ade80' }}>{horasAprobadas}h / {META_ANUAL}h · {pct}%</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#4ade80,#22d3ee)' }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {pct >= 100 ? '🎉 Meta anual alcanzada.' : `Te faltan ${META_ANUAL - horasAprobadas} horas para alcanzar la meta anual.`}
          </p>
        </GlassCard>

        {/* ── Formulario nueva solicitud ── */}
        {showForm && (
          <GlassCard className="p-6 mb-6" style={{ border: '1px solid rgba(59,130,246,0.2)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>Nueva solicitud de horas</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassInput
                  label="Actividad"
                  placeholder="Ej. Taller de React para nuevos miembros"
                  value={form.actividad}
                  onChange={e => setForm({ ...form, actividad: e.target.value })}
                  required
                />
                <GlassInput
                  label="Fecha"
                  type="date"
                  value={form.fecha}
                  onChange={e => setForm({ ...form, fecha: e.target.value })}
                  required
                />
              </div>
              <GlassInput
                label="Horas realizadas"
                type="number"
                placeholder="Ej. 3"
                value={form.horas}
                onChange={e => setForm({ ...form, horas: e.target.value })}
                required
              />
              {/* Descripción opcional */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Descripción (opcional)
                </label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Describe brevemente la actividad..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#e8edf5',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </div>
              <div className="flex gap-3">
                <PrimaryButton type="submit">Enviar solicitud</PrimaryButton>
              </div>
            </form>
          </GlassCard>
        )}

        {/* ── Historial de solicitudes ── */}
        <GlassCard className="p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>Historial de solicitudes</h3>

          {mockSolicitudes.length === 0
            ? <EmptyState icon="⏰" title="Sin solicitudes" description="Crea tu primera solicitud de horas de voluntariado." />
            : (
              <div className="space-y-3">
                {mockSolicitudes.map(s => (
                  <div
                    key={s.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1 truncate" style={{ color: '#e8edf5' }}>{s.actividad}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.fecha}</span>
                        <span className="text-xs font-mono font-semibold" style={{ color: '#4ade80' }}>{s.horas}h</span>
                      </div>
                      {/* Comentario del admin al aprobar/rechazar */}
                      {s.comentario && (
                        <p className="text-xs mt-1.5 italic" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          Encargado: "{s.comentario}"
                        </p>
                      )}
                    </div>
                    <Badge status={s.status} />
                  </div>
                ))}
              </div>
            )
          }
        </GlassCard>
      </div>
  )
}
