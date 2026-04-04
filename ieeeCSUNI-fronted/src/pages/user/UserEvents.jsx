/**
 * UserEvents.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Vista de eventos para usuarios básicos (rol: user).
 *
 * A diferencia de MemberEvents, este componente es más ligero:
 *   • NO muestra documentación interna ni materiales del capítulo
 *   • NO muestra la agenda detallada (eso es exclusivo de members)
 *   • SÍ puede ver eventos, fechas, descripción pública y speakers
 *   • SÍ puede confirmar asistencia (RSVP) y cancelarla
 *   • SÍ puede hacer check-in si el admin lo habilita
 *   • SÍ ve sus certificados de asistencia (si el evento los otorga)
 *   • SÍ puede agregar eventos a su calendario (Google Calendar / iCal)
 *
 * FLUJO DE ASISTENCIA:
 *   1. Usuario ve el evento → pulsa "Voy a asistir"
 *      → POST /api/user/events/{id}/rsvp   { attending: true }
 *   2. Puede cambiar de opinión → pulsa "Cancelar asistencia"
 *      → DELETE /api/user/events/{id}/rsvp
 *      (solo si el evento no ha comenzado todavía)
 *   3. Día del evento → admin abre check-in → usuario pulsa "Check-In"
 *      → POST /api/user/events/{id}/checkin
 *   4. Post-evento → si attended=true y cert_on_attendance=true
 *      → el certificado aparece en UserCerts automáticamente
 *
 * CONECTAR CON LARAVEL (Sanctum):
 *   - GET    /api/user/events              → lista de eventos públicos
 *   - GET    /api/user/events/{id}         → detalle de un evento
 *   - POST   /api/user/events/{id}/rsvp    → confirmar asistencia
 *   - DELETE /api/user/events/{id}/rsvp    → cancelar asistencia
 *   - POST   /api/user/events/{id}/checkin → check-in presencial
 *   - GET    /api/user/events/my           → mis eventos confirmados
 *
 * DOCUMENTACIÓN RECOMENDADA:
 *   • Laravel Routes & Controllers: https://laravel.com/docs/routing
 *   • Laravel Sanctum (auth):       https://laravel.com/docs/sanctum
 *   • Google Calendar API:          https://developers.google.com/calendar/api
 *   • ics / iCal format:            https://www.npmjs.com/package/ics
 *   • React Router useParams:       https://reactrouter.com/en/main/hooks/use-params
 */

import { useState, useMemo } from 'react'

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: reemplazar con →
//   fetch('/api/user/events', {
//     headers: { Authorization: `Bearer ${token}` }
//   }).then(r => r.json()).then(setEvents)

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Workshop: Introducción a la Ciberseguridad',
    date: '2025-08-15',
    time: '17:00',
    end_time: '19:30',
    location: 'Laboratorio B-201 — UNI',
    online: false,
    type: 'workshop',
    status: 'upcoming',
    rsvp: true,           // el usuario ya confirmó asistencia
    checkin_open: false,
    attended: false,
    cert_on_attendance: true,
    capacity: 30,
    enrolled: 22,
    cover: 'from-green-500 to-teal-600',
    description:
      'Taller introductorio sobre los fundamentos de la ciberseguridad. No se requieren conocimientos previos. Ideal para quienes quieren dar sus primeros pasos en el área.',
    what_to_bring: ['Laptop con al menos 4GB RAM', 'Tener VirtualBox instalado', 'Ganas de aprender 🚀'],
    speakers: [{ name: 'Diego Paredes', role: 'Líder Cybersecurity Track', avatar: 'DP' }],
  },
  {
    id: 2,
    title: 'IEEE Day 2025 — Celebración Anual del Capítulo',
    date: '2025-10-07',
    time: '18:00',
    end_time: '21:00',
    location: 'Auditorio Central — UNI',
    online: false,
    type: 'social',
    status: 'upcoming',
    rsvp: false,
    checkin_open: false,
    attended: false,
    cert_on_attendance: false,
    capacity: 150,
    enrolled: 67,
    cover: 'from-blue-500 to-indigo-600',
    description:
      'Evento anual de celebración del IEEE Day. Habrá charlas cortas de miembros destacados, reconocimientos, networking y refrigerio. Abierto para todos.',
    what_to_bring: ['Nada, solo tu presencia 🎉'],
    speakers: [
      { name: 'Carlos Mendoza', role: 'Presidente IEEE CS UNI', avatar: 'CM' },
      { name: 'Lucía Torres', role: 'Encargada de Eventos', avatar: 'LT' },
    ],
  },
  {
    id: 3,
    title: 'Charla: Cómo conseguir tu primera pasantía en Tech',
    date: '2025-07-28',
    time: '19:00',
    end_time: '20:30',
    location: 'Online — Zoom',
    online: true,
    type: 'talk',
    status: 'upcoming',
    rsvp: true,
    checkin_open: false,
    attended: false,
    cert_on_attendance: false,
    capacity: 200,
    enrolled: 134,
    cover: 'from-violet-500 to-purple-700',
    description:
      'Una ex-miembro del capítulo comparte su experiencia consiguiendo una pasantía en Google. Tips de CV, LinkedIn, entrevistas y cómo aprovechar IEEE como ventaja diferencial.',
    what_to_bring: ['Tus dudas sobre el proceso de búsqueda de práctica'],
    speakers: [{ name: 'Valeria Ríos', role: 'SWE Intern — Google (ex-miembro)', avatar: 'VR' }],
  },
  {
    id: 4,
    title: 'Workshop: React desde cero',
    date: '2025-06-10',
    time: '15:00',
    end_time: '18:00',
    location: 'Sala de Cómputo A — UNI',
    online: false,
    type: 'workshop',
    status: 'past',
    rsvp: true,
    checkin_open: false,
    attended: true,
    cert_on_attendance: true,
    capacity: 25,
    enrolled: 25,
    cover: 'from-cyan-500 to-blue-600',
    description:
      'Taller práctico de React: componentes, props, estado, hooks y despliegue en Vercel. Se construyó una mini app durante la sesión.',
    what_to_bring: ['Laptop', 'Node.js instalado'],
    speakers: [{ name: 'Andrés Soto', role: 'Líder Web Dev Track', avatar: 'AS' }],
  },
  {
    id: 5,
    title: 'Hackathon "Build for UNI" — Apertura de inscripciones',
    date: '2025-10-18',
    time: '08:00',
    end_time: '20:00',
    location: 'Pabellón de Sistemas — UNI',
    online: false,
    type: 'hackathon',
    status: 'upcoming',
    rsvp: false,
    checkin_open: false,
    attended: false,
    cert_on_attendance: true,
    capacity: 60,
    enrolled: 14,
    cover: 'from-orange-500 to-red-600',
    description:
      'Hackathon de un día completo para crear soluciones tecnológicas para problemas reales de la UNI. Equipos de 3-4 personas. Los 3 mejores equipos recibirán premios y todos los participantes obtienen certificado.',
    what_to_bring: ['Laptop cargada', 'Cargador', 'Ideas 💡', 'Mucho café ☕'],
    speakers: [],
  },
]

// ─── Constantes de diseño ─────────────────────────────────────────────────────
const TYPE_META = {
  workshop:  { icon: '🛠️',  label: 'Workshop' },
  talk:      { icon: '🎙️', label: 'Charla' },
  hackathon: { icon: '⚡',  label: 'Hackathon' },
  social:    { icon: '🎉',  label: 'Social' },
  competition:{ icon: '🏆', label: 'Competencia' },
}

// Calcula cuántos días faltan para el evento
const daysUntil = (dateStr) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24))
  if (diff < 0)  return null
  if (diff === 0) return 'Hoy'
  if (diff === 1) return 'Mañana'
  return `En ${diff} días`
}

// Genera link de Google Calendar
const googleCalLink = (ev) => {
  const start = ev.date.replace(/-/g, '') + 'T' + ev.time.replace(':', '') + '00'
  const end   = ev.date.replace(/-/g, '') + 'T' + (ev.end_time || ev.time).replace(':', '') + '00'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${start}/${end}`,
    details: ev.description,
    location: ev.location,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// ─── Avatar pequeño ───────────────────────────────────────────────────────────
const Avatar = ({ initials }) => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500
                  flex items-center justify-center text-white font-bold text-xs shrink-0">
    {initials}
  </div>
)

// ─── Badge de countdown ───────────────────────────────────────────────────────
const Countdown = ({ date }) => {
  const label = daysUntil(date)
  if (!label) return null
  const urgent = label === 'Hoy' || label === 'Mañana'
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
      ${urgent
        ? 'bg-orange-500/20 border border-orange-500/30 text-orange-300'
        : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'}`}>
      {label}
    </span>
  )
}

// ─── Modal de detalle ─────────────────────────────────────────────────────────
const EventModal = ({ event, onClose, onRsvp, onCheckin }) => {
  const occupancy  = Math.round((event.enrolled / event.capacity) * 100)
  const spotsLeft  = event.capacity - event.enrolled
  const countdown  = daysUntil(event.date)
  const canCancel  = event.rsvp && event.status === 'upcoming' && !event.attended

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
         onClick={e => e.target === e.currentTarget && onClose()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto
                      rounded-t-3xl sm:rounded-2xl border border-white/10
                      bg-[#0d1b2a]/95 backdrop-blur-xl shadow-2xl">

        {/* Banda de color */}
        <div className={`h-24 bg-gradient-to-br ${event.cover} relative`}>
          <button onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30
                             backdrop-blur-sm flex items-center justify-center text-white text-sm">✕</button>
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0d1b2a]/95 to-transparent" />
        </div>

        <div className="px-6 pb-6 -mt-4 space-y-5">

          {/* Título */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span>{TYPE_META[event.type]?.icon}</span>
              <span className="text-xs text-slate-400">{TYPE_META[event.type]?.label}</span>
              {countdown && <Countdown date={event.date} />}
              {event.cert_on_attendance && (
                <span className="text-xs px-2 py-0.5 rounded-full
                                 bg-yellow-400/10 border border-yellow-400/25 text-yellow-300">
                  🎓 Certifica
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">{event.title}</h2>
          </div>

          {/* Info rápida */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: '📅', label: 'Fecha',   value: event.date },
              { icon: '🕐', label: 'Horario', value: `${event.time} – ${event.end_time ?? '—'}` },
              { icon: event.online ? '💻' : '📍', label: 'Lugar', value: event.location },
              { icon: '👥', label: 'Aforo',   value: `${event.enrolled}/${event.capacity} inscritos` },
            ].map(info => (
              <div key={info.label}
                   className="rounded-xl border border-white/8 bg-white/3 px-3 py-2.5 space-y-0.5">
                <p className="text-xs text-slate-500">{info.icon} {info.label}</p>
                <p className="text-white text-sm font-medium truncate">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Barra de aforo */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Capacidad</span>
              <span className={spotsLeft <= 5 ? 'text-orange-400 font-medium' : ''}>
                {spotsLeft > 0 ? `${spotsLeft} lugares disponibles` : '¡Sin lugares!'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/8 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${event.cover} transition-all duration-500`}
                   style={{ width: `${Math.min(occupancy, 100)}%` }} />
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1.5">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Sobre el evento</p>
            <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
          </div>

          {/* Qué llevar */}
          {event.what_to_bring?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Qué llevar</p>
              <ul className="space-y-1.5">
                {event.what_to_bring.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-blue-400 mt-0.5 shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Quién da el evento</p>
              <div className="space-y-2">
                {event.speakers.map(s => (
                  <div key={s.name}
                       className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/3">
                    <Avatar initials={s.avatar} />
                    <div>
                      <p className="text-white text-sm font-medium">{s.name}</p>
                      <p className="text-slate-400 text-xs">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estado personal */}
          {event.attended && (
            <div className="rounded-xl border border-green-500/25 bg-green-500/10 p-4 text-center space-y-1">
              <p className="text-green-300 font-medium text-sm">✅ Asististe a este evento</p>
              {event.cert_on_attendance && (
                <p className="text-green-200/60 text-xs">Tu certificado ya está disponible en <em>Mis Certificados</em></p>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-2 pt-1">

            {/* Check-In (si está abierto y tiene RSVP y no ha asistido) */}
            {event.checkin_open && event.rsvp && !event.attended && (
              <button onClick={() => onCheckin(event.id)}
                      className="w-full py-3 rounded-xl font-medium text-sm
                                 bg-gradient-to-r from-green-500 to-emerald-500
                                 text-white hover:opacity-90 transition-opacity shadow-lg">
                ✅ Hacer Check-In ahora
                {/* TODO: POST /api/user/events/{event.id}/checkin */}
              </button>
            )}

            {/* RSVP — confirmar o cancelar */}
            {event.status === 'upcoming' && !event.attended && (
              <>
                {!event.rsvp ? (
                  <button onClick={() => onRsvp(event.id, true)}
                          disabled={spotsLeft === 0}
                          className={`w-full py-3 rounded-xl font-medium text-sm transition-all
                            ${spotsLeft === 0
                              ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/8'
                              : `bg-gradient-to-r ${event.cover} text-white hover:opacity-90 shadow-lg`}`}>
                    {spotsLeft === 0 ? 'Sin lugares disponibles' : '✋ Voy a asistir'}
                  </button>
                ) : (
                  !event.checkin_open && (
                    <button onClick={() => onRsvp(event.id, false)}
                            className="w-full py-3 rounded-xl font-medium text-sm
                                       bg-red-500/10 border border-red-500/25 text-red-300
                                       hover:bg-red-500/20 transition-colors">
                      Cancelar mi asistencia
                      {/* TODO: DELETE /api/user/events/{event.id}/rsvp */}
                    </button>
                  )
                )}
              </>
            )}

            {/* Agregar al calendario */}
            {event.status === 'upcoming' && (
              <a href={googleCalLink(event)} target="_blank" rel="noreferrer"
                 className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                            border border-white/10 text-slate-400 hover:text-white
                            hover:border-white/20 transition-colors text-sm">
                <span>📆</span> Agregar a Google Calendar
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Card de evento compacta ──────────────────────────────────────────────────
const EventCard = ({ event, onOpen }) => {
  const occupancy = Math.round((event.enrolled / event.capacity) * 100)
  const countdown = daysUntil(event.date)

  return (
    <div onClick={() => onOpen(event)}
         className="group rounded-2xl border border-white/8 bg-white/3
                    hover:bg-white/6 transition-all duration-300 cursor-pointer overflow-hidden">

      {/* Barra top */}
      <div className={`h-1 bg-gradient-to-r ${event.cover}`} />

      <div className="p-4 space-y-3">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base">{TYPE_META[event.type]?.icon}</span>
              <span className="text-xs text-slate-500">{TYPE_META[event.type]?.label}</span>
              {countdown && event.status === 'upcoming' && <Countdown date={event.date} />}
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug">{event.title}</h3>
          </div>

          {/* Estado personal */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {event.attended && (
              <span className="text-xs px-2 py-0.5 rounded-full
                               bg-green-400/10 border border-green-400/25 text-green-300">
                ✓ Fui
              </span>
            )}
            {event.rsvp && !event.attended && (
              <span className="text-xs px-2 py-0.5 rounded-full
                               bg-blue-400/10 border border-blue-400/25 text-blue-300">
                ✋ Confirmado
              </span>
            )}
            {event.cert_on_attendance && (
              <span className="text-xs text-yellow-400/60">🎓</span>
            )}
          </div>
        </div>

        {/* Fecha y lugar */}
        <div className="space-y-1">
          <p className="text-xs text-slate-400">
            📅 {event.date} · {event.time}
            {event.end_time && ` – ${event.end_time}`}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {event.online ? '💻' : '📍'} {event.location}
          </p>
        </div>

        {/* Aforo */}
        <div className="space-y-1">
          <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${event.cover}`}
                 style={{ width: `${Math.min(occupancy, 100)}%` }} />
          </div>
          <p className="text-xs text-slate-600">
            {event.enrolled}/{event.capacity} confirmados
          </p>
        </div>

        {/* CTA inline */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
            Ver detalles →
          </span>
          {event.status === 'upcoming' && !event.attended && (
            <span className={`text-xs px-2.5 py-1 rounded-lg font-medium
              ${event.rsvp
                ? 'bg-green-500/10 text-green-300 border border-green-500/20'
                : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'}`}>
              {event.rsvp ? '✋ Iré' : '+ Confirmar'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function UserEvents() {
  const [events, setEvents]     = useState(MOCK_EVENTS)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter]     = useState('all')   // all | upcoming | past | mine
  const [toast, setToast]       = useState(null)

  // TODO: al montar →
  // useEffect(() => {
  //   fetch('/api/user/events', { headers: { Authorization: `Bearer ${token}` } })
  //     .then(r => r.json())
  //     .then(data => setEvents(data))
  // }, [])

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // RSVP toggle
  const handleRsvp = (eventId, attending) => {
    // TODO: si attending=true  → POST   /api/user/events/{eventId}/rsvp
    //       si attending=false → DELETE /api/user/events/{eventId}/rsvp
    setEvents(prev => prev.map(e =>
      e.id === eventId
        ? { ...e, rsvp: attending, enrolled: e.enrolled + (attending ? 1 : -1) }
        : e
    ))
    showToast(
      attending ? '✋ ¡Asistencia confirmada!' : '❌ Asistencia cancelada',
      attending ? 'success' : 'error'
    )
    // Actualizar el evento seleccionado en el modal
    setSelected(prev => prev?.id === eventId
      ? { ...prev, rsvp: attending, enrolled: prev.enrolled + (attending ? 1 : -1) }
      : prev)
  }

  // Check-In
  const handleCheckin = (eventId) => {
    // TODO: POST /api/user/events/{eventId}/checkin
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, attended: true, checkin_open: false } : e
    ))
    showToast('✅ Check-in realizado con éxito', 'success')
    setSelected(null)
  }

  // Filtrado
  const filtered = useMemo(() => {
    return events.filter(e => {
      if (filter === 'upcoming') return e.status === 'upcoming'
      if (filter === 'past')     return e.status === 'past'
      if (filter === 'mine')     return e.rsvp || e.attended
      return true
    })
  }, [events, filter])

  // Stats
  const upcoming   = events.filter(e => e.status === 'upcoming').length
  const confirmed  = events.filter(e => e.rsvp && e.status === 'upcoming').length
  const attended   = events.filter(e => e.attended).length

  const toastColors = {
    success: 'bg-green-500/20 border-green-500/30 text-green-200',
    error:   'bg-red-500/20 border-red-500/30 text-red-200',
    info:    'bg-blue-500/20 border-blue-500/30 text-blue-200',
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-6 space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 rounded-xl border px-4 py-3
                         backdrop-blur-sm text-sm ${toastColors[toast.type]}`}>
          {toast.msg}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <EventModal
          event={selected}
          onClose={() => setSelected(null)}
          onRsvp={handleRsvp}
          onCheckin={handleCheckin}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Eventos</h1>
        <p className="text-slate-400 text-sm mt-1">
          Confirma tu asistencia, cancélala si cambias de opinión y haz check-in el día del evento.
        </p>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '📅', label: 'Próximos',    value: upcoming  },
          { icon: '✋', label: 'Confirmados', value: confirmed },
          { icon: '✅', label: 'Asistí',      value: attended  },
        ].map(s => (
          <div key={s.label}
               className="rounded-2xl border border-white/8 bg-white/3 p-4 text-center">
            <p className="text-xl mb-1">{s.icon}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-xl w-full sm:w-auto sm:inline-flex">
        {[
          { key: 'all',      label: 'Todos' },
          { key: 'upcoming', label: 'Próximos' },
          { key: 'mine',     label: 'Los míos' },
          { key: 'past',     label: 'Pasados' },
        ].map(f => (
          <button key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm transition-all
                    ${filter === f.key
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-slate-500 hover:text-slate-300'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 && (
        <div className="py-20 text-center space-y-2">
          <p className="text-4xl">🗓️</p>
          <p className="text-slate-500 text-sm">
            {filter === 'mine'
              ? 'Todavía no has confirmado asistencia a ningún evento.'
              : 'No hay eventos con ese filtro.'}
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(event => (
          <EventCard key={event.id} event={event} onOpen={setSelected} />
        ))}
      </div>

      {/* Nota informativa */}
      <div className="rounded-xl border border-white/6 bg-white/3 p-4 flex items-start gap-3">
        <span className="text-slate-400 text-lg shrink-0">ℹ️</span>
        <div className="space-y-1">
          <p className="text-slate-300 text-sm font-medium">¿Quieres acceder a materiales y documentación?</p>
          <p className="text-slate-500 text-xs leading-relaxed">
            Los miembros del capítulo tienen acceso a la agenda interna, slides y recursos de cada evento.
            Si quieres convertirte en miembro, contacta a un administrador.
          </p>
        </div>
      </div>

    </div>
  )
}
