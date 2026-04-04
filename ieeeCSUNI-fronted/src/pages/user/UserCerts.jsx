// src/pages/user/UserCerts.jsx
// ============================================================
// ZONA USUARIO — Mis Certificados
//
// El usuario básico puede:
//   - Ver sus certificados disponibles
//   - Descargar el PDF de cada certificado
//   - Filtrar por tipo de certificado
//
// DIFERENCIA CON MIEMBRO:
//   El usuario (rol 'user') solo puede ver y descargar.
//   No puede gestionar voluntariado ni tareas.
//   Obtiene certificados SOLO por asistencia a eventos.
//
// DOCUMENTACIÓN ÚTIL:
//   - Descarga de archivos desde Laravel: https://laravel.com/docs/responses#file-downloads
//   - Si usas Cloudinary en v2: https://cloudinary.com/documentation/react_integration
//
// CONECTAR CON BACKEND LARAVEL:
//   GET /api/user/certificates                    → lista de certificados del usuario
//   GET /api/user/certificates/:id/download       → descarga el PDF
//          Laravel: return response()->download(storage_path('certs/' . $cert->file))
//          O con Cloudinary: return redirect($cert->cloudinary_url)
//
// ENTIDADES BACKEND: certificates (filtradas por user_id desde auth)
// ============================================================

import { useState, useMemo } from 'react'
import { GlassCard, PageHeader, GlassSelect, EmptyState } from '../../components/layout/UI'

// Mock — reemplazar con GET /api/user/certificates
const mockCerts = [
  { id: 1, titulo: 'Taller de Ciberseguridad UNI',   tipo: 'evento',      fecha: '2025-03-15', evento: 'Taller Cyber' },
  { id: 2, titulo: 'Charla IEEE Región 9',            tipo: 'evento',      fecha: '2025-02-20', evento: 'Charla R9' },
  { id: 3, titulo: 'IEEE Xtreme 2024 — Participante', tipo: 'competencia', fecha: '2024-10-19', evento: 'Xtreme 2024' },
]

const TIPO_COLORS = {
  evento:       { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  color: '#3b82f6',  label: 'Evento' },
  voluntariado: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80', label: 'Voluntariado' },
  competencia:  { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', color: '#fbbf24', label: 'Competencia' },
}

const TIPO_OPTS = [
  { value: 'all',         label: 'Todos los tipos' },
  { value: 'evento',      label: 'Evento' },
  { value: 'voluntariado',label: 'Voluntariado' },
  { value: 'competencia', label: 'Competencia' },
]

export default function UserCerts({ user = { name: 'Estudiante' }, onNavigate, onLogout }) {
  const [tipoFilter, setTipoFilter] = useState('all')

  const filtered = useMemo(() =>
    mockCerts.filter(c => tipoFilter === 'all' || c.tipo === tipoFilter),
    [tipoFilter]
  )

  const handleDownload = (certId) => {
    // TODO: descargar PDF desde Laravel
    // window.open('/api/user/certificates/' + certId + '/download', '_blank')
    // O si es Cloudinary (v2):
    // const cert = certs.find(c => c.id === certId)
    // window.open(cert.cloudinary_url, '_blank')
    console.log('Descargar certificado:', certId)
  }

  return (
    <DashboardLayout role="user" user={user} activePath="/user/certs" onNavigate={onNavigate} onLogout={onLogout}>
      <div className="max-w-3xl mx-auto animate-fade-up">
        <PageHeader
          title="Mis certificados"
          subtitle="Descarga los certificados de tu participación en eventos."
        />

        {/* Filtro */}
        <GlassCard className="p-4 mb-5">
          <div className="max-w-xs">
            <GlassSelect label="Filtrar por tipo" value={tipoFilter} onChange={e => setTipoFilter(e.target.value)} options={TIPO_OPTS} />
          </div>
        </GlassCard>

        {filtered.length === 0
          ? (
            <EmptyState
              icon="🎖️"
              title="Sin certificados aún"
              description="Participa en eventos del capítulo para obtener tu primer certificado."
            />
          )
          : (
            <div className="space-y-3">
              {filtered.map(c => {
                const t = TIPO_COLORS[c.tipo] || TIPO_COLORS.evento
                return (
                  <GlassCard key={c.id} className="p-5" hover>
                    <div className="flex items-center gap-4">
                      {/* Ícono */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: t.bg, border: `1px solid ${t.border}` }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold mb-1 truncate" style={{ color: '#e8edf5' }}>{c.titulo}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                            style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}
                          >
                            {t.label}
                          </span>
                          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{c.fecha}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(c.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0"
                        style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Descargar PDF
                      </button>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          )
        }
      </div>
    </DashboardLayout>
  )
}


// ============================================================
// src/pages/user/UserEvents.jsx
// ============================================================
// ZONA USUARIO — Mis Eventos
//
// El usuario puede:
//   - Ver todos los eventos disponibles del capítulo
//   - Registrar su intención de asistencia ("Voy a asistir")
//   - Cancelar su inscripción a un evento
//   - Hacer check-in cuando el admin abra el check-in
//   - Ver el historial de eventos a los que asistió
//
// DIFERENCIA CON MEMBER:
//   El usuario puede INSCRIBIRSE a eventos (pre-registro).
//   El check-in lo hace cuando el admin lo habilita.
//   Los certificados los recibe automáticamente si el evento lo tiene configurado.
//
// DOCUMENTACIÓN ÚTIL:
//   - Laravel Broadcasting para check-in en tiempo real:
//     https://laravel.com/docs/broadcasting
//   - QR dinámico (v2): https://github.com/zpao/qrcode.react
//
// CONECTAR CON BACKEND LARAVEL:
//   GET    /api/user/events                        → todos los eventos (públicos)
//   GET    /api/user/events/mine                   → eventos donde me inscribí
//   POST   /api/user/events/:id/register           → inscribirse
//   DELETE /api/user/events/:id/register           → cancelar inscripción
//   POST   /api/user/events/:id/checkin            → hacer check-in (cuando está abierto)
//
// ENTIDADES BACKEND: events, event_attendances
// ============================================================

import { useState as useStateEv } from 'react'
import DashboardLayout  from '../../components/layout/DashboardLayout'
import { GlassCard as GlassCardEv, PageHeader as PageHeaderEv, StatCard as StatCardEv, EmptyState as EmptyStateEv } from '../../components/layout/UI'

// Mock — reemplazar con GET /api/user/events
const mockEventosUser = [
  {
    id: 1,
    name: 'Taller React + TypeScript',
    date: '2025-04-20',
    lugar: 'Sala Cómputo UNI',
    tipo: 'taller',
    checkinOpen: true,
    inscrito: true,
    asistio: false,
    capacidad: 30,
    inscritos: 18,
    descripcion: 'Aprende React con TypeScript desde cero. Proyecto final incluido.',
  },
  {
    id: 2,
    name: 'Charla Cybersecurity en Perú',
    date: '2025-04-28',
    lugar: 'Auditorio UNI',
    tipo: 'charla',
    checkinOpen: false,
    inscrito: false,
    asistio: false,
    capacidad: 100,
    inscritos: 42,
    descripcion: 'Especialistas del sector hablan sobre el panorama de ciberseguridad local.',
  },
  {
    id: 3,
    name: 'Taller de Ciberseguridad UNI',
    date: '2025-03-15',
    lugar: 'Sala Cómputo UNI',
    tipo: 'taller',
    checkinOpen: false,
    inscrito: true,
    asistio: true,
    capacidad: 25,
    inscritos: 25,
    descripcion: 'Introducción a pentesting y herramientas básicas de seguridad.',
  },
]

const TIPO_LABELS = { taller: 'Taller', charla: 'Charla', competencia: 'Competencia', hackathon: 'Hackathon', reunion: 'Reunión' }
const TIPO_COLORS_EV = {
  taller:      { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  charla:      { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  competencia: { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  hackathon:   { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

// Modal QR check-in (mismo que UserDashboard, extrae a componente compartido si crece)
function QRCheckinModal({ evento, onConfirm, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs p-6 rounded-2xl text-center"
        style={{ background: '#0f1520', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <p className="text-xs font-mono tracking-widest mb-2" style={{ color: 'rgba(59,130,246,0.8)' }}>// CHECK-IN</p>
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#e8edf5' }}>{evento.name}</h3>

        {/* QR placeholder — v2: usa qrcode.react
            npm install qrcode.react
            import { QRCodeSVG } from 'qrcode.react'
            <QRCodeSVG value={`checkin:${evento.id}:${userId}`} size={140} /> */}
        <div className="w-36 h-36 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: 'white' }}>
          <svg viewBox="0 0 80 80" width="110" height="110">
            <rect x="5"  y="5"  width="24" height="24" fill="none" stroke="#000" strokeWidth="3"/>
            <rect x="10" y="10" width="14" height="14" fill="#000"/>
            <rect x="51" y="5"  width="24" height="24" fill="none" stroke="#000" strokeWidth="3"/>
            <rect x="56" y="10" width="14" height="14" fill="#000"/>
            <rect x="5"  y="51" width="24" height="24" fill="none" stroke="#000" strokeWidth="3"/>
            <rect x="10" y="56" width="14" height="14" fill="#000"/>
            <rect x="35" y="35" width="6"  height="6"  fill="#000"/>
            <rect x="45" y="35" width="6"  height="6"  fill="#000"/>
            <rect x="55" y="35" width="6"  height="6"  fill="#000"/>
            <rect x="35" y="45" width="6"  height="6"  fill="#000"/>
            <rect x="55" y="45" width="6"  height="6"  fill="#000"/>
            <rect x="45" y="55" width="6"  height="6"  fill="#000"/>
            <rect x="65" y="45" width="6"  height="6"  fill="#000"/>
            <rect x="65" y="65" width="6"  height="6"  fill="#000"/>
          </svg>
        </div>

        <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Muestra este QR al encargado, o confirma directamente:
        </p>
        <button
          onClick={() => { onConfirm(evento.id); onClose() }}
          className="w-full py-2.5 rounded-xl text-sm font-semibold mb-2"
          style={{ background: 'rgba(59,130,246,0.18)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.35)' }}
        >
          Confirmar asistencia
        </button>
        <button onClick={onClose} className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Cerrar</button>
      </div>
    </div>
  )
}

export function UserEvents({ user = { name: 'Estudiante' }, onNavigate, onLogout }) {
  const [eventos, setEventos] = useStateEv(mockEventosUser)
  const [qrEvento, setQrEvento] = useStateEv(null)

  const asistidos   = eventos.filter(e => e.asistio).length
  const inscripciones = eventos.filter(e => e.inscrito && !e.asistio).length

  const handleInscribirse = (eventoId) => {
    // TODO: POST /api/user/events/:id/register
    setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, inscrito: true, inscritos: e.inscritos + 1 } : e))
  }

  const handleCancelar = (eventoId) => {
    // TODO: DELETE /api/user/events/:id/register
    setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, inscrito: false, inscritos: Math.max(0, e.inscritos - 1) } : e))
  }

  const handleCheckin = (eventoId) => {
    // TODO: POST /api/user/events/:id/checkin
    setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, asistio: true, checkinOpen: false } : e))
  }

  return (
      <div className="max-w-4xl mx-auto animate-fade-up">
        <PageHeaderEv
          title="Eventos"
          subtitle="Eventos del capítulo IEEE CS UNI"
        />

        {/* Stats breves */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCardEv label="Eventos asistidos"    value={asistidos}      accent="green" sublabel="Este ciclo" />
          <StatCardEv label="Inscripciones activas" value={inscripciones}  accent="blue"  sublabel="Próximos eventos" />
        </div>

        {eventos.length === 0
          ? <EmptyStateEv icon="📅" title="Sin eventos" description="El capítulo no tiene eventos publicados aún." />
          : (
            <div className="space-y-4">
              {eventos.map(ev => {
                const tc = TIPO_COLORS_EV[ev.tipo] || TIPO_COLORS_EV.taller
                const lleno = ev.inscritos >= ev.capacidad

                return (
                  <GlassCardEv key={ev.id} className="p-5" hover>
                    <div className="flex items-start gap-4">
                      {/* Emoji tipo */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                        style={{ background: tc.bg }}
                      >
                        {ev.tipo === 'taller' ? '🖥️' : ev.tipo === 'charla' ? '🎤' : ev.tipo === 'competencia' ? '🏆' : '⚡'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-semibold" style={{ color: '#e8edf5' }}>{ev.name}</p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-mono"
                            style={{ background: tc.bg, color: tc.color }}
                          >
                            {TIPO_LABELS[ev.tipo] || ev.tipo}
                          </span>
                          {ev.asistio && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>
                              ✓ Asististe
                            </span>
                          )}
                          {ev.checkinOpen && !ev.asistio && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.25)' }}>
                              ● Check-in abierto
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs flex-wrap mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          <span className="font-mono">{ev.date}</span>
                          <span>·</span>
                          <span>{ev.lugar}</span>
                          <span>·</span>
                          <span style={{ color: lleno ? '#f87171' : 'rgba(255,255,255,0.4)' }}>
                            {ev.inscritos}/{ev.capacidad} {lleno ? '(lleno)' : 'inscritos'}
                          </span>
                        </div>

                        {ev.descripcion && (
                          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{ev.descripcion}</p>
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {/* Check-in abierto */}
                        {ev.checkinOpen && ev.inscrito && !ev.asistio && (
                          <button
                            onClick={() => setQrEvento(ev)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
                            style={{ background: 'rgba(59,130,246,0.18)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.35)' }}
                          >
                            📲 Check-in
                          </button>
                        )}

                        {/* Inscripción / cancelar — solo si el evento es futuro */}
                        {!ev.asistio && !ev.checkinOpen && (
                          ev.inscrito
                            ? (
                              <button
                                onClick={() => handleCancelar(ev.id)}
                                className="px-3 py-2 rounded-lg text-xs font-semibold"
                                style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
                              >
                                Cancelar inscripción
                              </button>
                            )
                            : (
                              <button
                                onClick={() => handleInscribirse(ev.id)}
                                disabled={lleno}
                                className="px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                                style={
                                  lleno
                                    ? { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed' }
                                    : { background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }
                                }
                              >
                                {lleno ? 'Aforo lleno' : '+ Inscribirme'}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  </GlassCardEv>
                )
              })}
            </div>
          )
        }
        <p className="text-xs mt-4 text-center font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
          // QR dinámico con qrcode.react en v2 · Check-in en tiempo real con Laravel Echo en v2
        </p>
      </div>
  )
}

