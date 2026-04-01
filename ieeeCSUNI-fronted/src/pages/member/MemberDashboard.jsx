// src/pages/member/MemberDashboard.jsx
// ============================================================
// Dashboard principal del miembro.
// Muestra: resumen de horas, tareas activas, próximos eventos,
// certificados disponibles y actividad reciente.
//
// DATOS:
//   - Reemplaza los `mockData` por llamadas a tu API Laravel.
//   - Usa un hook custom (ej. useMemberStats) para separar lógica.
//   - El endpoint sugerido: GET /api/member/dashboard
// ============================================================

import { GlassCard, StatCard, Badge, PageHeader, PrimaryButton } from '../../components/layout/UI'

// ── Mock data — REEMPLAZAR con fetch a tu API ──
const mockStats = {
  horasVoluntariado: 18,
  metaAnual:         40,
  tareasActivas:     3,
  certificados:      2,
  eventosAsistidos:  5,
}

const mockTareas = [
  { id: 1, title: 'Diseñar landing page IEEE CS',    status: 'in_progress', due: '2025-04-10', project: 'Web IEEE' },
  { id: 2, title: 'Actualizar README del repo',      status: 'pending',     due: '2025-04-15', project: 'Web IEEE' },
  { id: 3, title: 'Preparar presentación Xtreme',   status: 'done',        due: '2025-03-30', project: 'IEEE Xtreme' },
]

const mockEventos = [
  { id: 1, name: 'Taller React + TypeScript', date: '2025-04-20', lugar: 'Sala Cómputo UNI', checkin: false },
  { id: 2, name: 'IEEE Xtreme 2025',           date: '2025-10-18', lugar: 'Online',           checkin: false },
]

const mockActividad = [
  { id: 1, tipo: 'horas',     texto: 'Solicitud de 3h aprobada',                       tiempo: 'hace 2 días' },
  { id: 2, tipo: 'cert',      texto: 'Certificado de participación disponible',         tiempo: 'hace 5 días' },
  { id: 3, tipo: 'tarea',     texto: 'Tarea "Diseñar landing page" asignada',          tiempo: 'hace 1 semana' },
]

// ── Helpers ──
function ProgressBar({ value, max, color = '#3b82f6' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full rounded-full h-1.5 mt-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <div
        className="h-1.5 rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}

export default function MemberDashboard({ user = { name: 'Adrián César' }, onNavigate, onLogout }) {
  const horasPct = Math.round((mockStats.horasVoluntariado / mockStats.metaAnual) * 100)

  return (
      <div className="max-w-6xl mx-auto animate-fade-up">

        {/* ── Encabezado ── */}
        <PageHeader
          title={`Buen día, ${user.name.split(' ')[0]} 👋`}
          subtitle="Aquí está el resumen de tu actividad en el capítulo."
          action={
            <PrimaryButton onClick={() => nav('/member/hours')}>
              + Registrar horas
            </PrimaryButton>
          }
        />

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Horas de voluntariado"
            value={`${mockStats.horasVoluntariado}h`}
            sublabel={`Meta: ${mockStats.metaAnual}h · ${horasPct}% completado`}
            accent="green"
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          />
          <StatCard
            label="Tareas activas"
            value={mockStats.tareasActivas}
            sublabel="Asignadas a ti"
            accent="blue"
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>}
          />
          <StatCard
            label="Certificados"
            value={mockStats.certificados}
            sublabel="Disponibles para descargar"
            accent="amber"
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>}
          />
          <StatCard
            label="Eventos asistidos"
            value={mockStats.eventosAsistidos}
            sublabel="Este año"
            accent="green"
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
          />
        </div>

        {/* ── Progress de voluntariado ── */}
        <GlassCard className="p-5 mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold" style={{ color: '#e8edf5' }}>Meta anual de voluntariado</span>
            <span className="text-xs font-mono" style={{ color: '#4ade80' }}>{mockStats.horasVoluntariado} / {mockStats.metaAnual} h</span>
          </div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Te faltan {mockStats.metaAnual - mockStats.horasVoluntariado} horas para alcanzar tu meta anual.
          </p>
          <ProgressBar value={mockStats.horasVoluntariado} max={mockStats.metaAnual} color="#4ade80" />
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Mis tareas ── */}
          <GlassCard className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#e8edf5' }}>Mis tareas recientes</h2>
              <button
                onClick={() => nav('/member/tasks')}
                className="text-xs font-mono transition-colors"
                style={{ color: 'rgba(59,130,246,0.7)' }}
              >
                Ver todas →
              </button>
            </div>
            <div className="space-y-2">
              {mockTareas.map(t => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#e8edf5' }}>{t.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>
                      {t.project} · Fecha límite: {t.due}
                    </p>
                  </div>
                  <Badge status={t.status} />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* ── Columna derecha: eventos + actividad ── */}
          <div className="space-y-4">

            {/* Próximos eventos */}
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold" style={{ color: '#e8edf5' }}>Próximos eventos</h2>
                <button onClick={() => nav('/member/events')} className="text-xs font-mono" style={{ color: 'rgba(59,130,246,0.7)' }}>
                  Ver todos →
                </button>
              </div>
              <div className="space-y-3">
                {mockEventos.map(ev => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-xs font-semibold mb-1 truncate" style={{ color: '#e8edf5' }}>{ev.name}</p>
                    <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{ev.date}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{ev.lugar}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Actividad reciente */}
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>Actividad reciente</h2>
              <div className="space-y-3">
                {mockActividad.map(a => (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: a.tipo === 'horas' ? '#4ade80' : a.tipo === 'cert' ? '#fbbf24' : '#3b82f6' }}
                    />
                    <div>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{a.texto}</p>
                      <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>{a.tiempo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
  )
}
