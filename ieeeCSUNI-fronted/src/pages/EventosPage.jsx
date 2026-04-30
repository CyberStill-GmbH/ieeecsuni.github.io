/**
 * EventosPage v2 — IEEE CS UNI
 *
 * Cambios vs v1:
 * ─ Eliminado: Orb, HeroTag, SectionLabel, SectionTitle (inconsistentes)
 * ─ Eliminado: scanline overlay en video (ruido innecesario)
 * ─ Eliminado: Play icon sobre video con autoplay (contradictorio)
 * ─ Eliminado: `rounded-[3rem]`, `rounded-[2.5rem]` (valores arbitrarios)
 * ─ Eliminado: PlusCircle size={200} como decoración de fondo
 * ─ Añadido: dot grid background (consistente con HomePage/NosotrosPage)
 * ─ Añadido: sección de proof/impact (credibilidad ejecutada)
 * ─ Añadido: empty state institucional
 * ─ Mejorado: copy — menos informal, más aspiracional técnico
 * ─ Mejorado: sistema de filtros — pills limpias sin contenedor innecesario
 * ─ Mejorado: sección "Proponer evento" — sin PlusCircle decorativo
 * ─ Mejorado: ritmo visual entre secciones con border-t consistente
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events } from '../data'
import { EventCard } from '../components/ui/EventCard'
import { Calendar, ArrowUpRight, ArrowRight } from 'lucide-react'
import tuVideo from '../../public/videoplayback.mp4'

// ─── Datos ────────────────────────────────────────────────────

const FILTERS = ['Todos', 'Taller', 'Competencia', 'Charla', 'Hackathon', 'Conferencia']

const impactStats = [
  { value: '6+', label: 'Eventos realizados' },
  { value: '200+', label: 'Asistentes totales' },
  { value: '4', label: 'Categorías técnicas' },
  { value: '100%', label: 'Entrada libre' },
]

// ─── Componentes locales ───────────────────────────────────────

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono font-medium tracking-widest text-gray-500 uppercase">
      {children}
    </span>
  )
}

function SectionMeta({ tag, title, className = '' }) {
  return (
    <div className={className}>
      <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/60 uppercase">{tag}</span>
      <h2 className="mt-2 font-black tracking-tight leading-[0.88] text-white text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  )
}

function FilterChip({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest
                  transition-all duration-200 ${
        isActive
          ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(14,165,233,0.3)]'
          : 'border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/[0.12]'
      }`}
    >
      {label}
    </button>
  )
}

function EmptyState({ filter }) {
  return (
    <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/[0.06] rounded-2xl text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
        <Calendar className="w-6 h-6 text-gray-700" />
      </div>
      <h3 className="font-bold text-base text-gray-400 mb-2">
        Sin eventos en <span className="text-white">{filter}</span>
      </h3>
      <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
        Estamos preparando nuevas actividades. Explora otras categorías o vuelve pronto.
      </p>
    </div>
  )
}

// ─── Página principal ──────────────────────────────────────────

export default function EventosPage() {
  useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? events
    : events.filter(e => e.type === activeFilter)

  return (
    <main className="pt-16 bg-[#020617] text-white min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════
          Dot grid + dos columnas: copy institucional + video.
          Sin scanlines, sin Play icon sobre video en autoplay.
      ═════════════════════════════════════════════════════ */}
      <section className="relative px-6 md:px-20 pt-6 pb-0 overflow-hidden">

        {/* Dot grid — sistema compartido con HomePage/NosotrosPage */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">

          {/* Copy */}
          <div className="reveal">
            <Badge>IEEE CS UNI Live</Badge>

            <h1 className="mt-6 font-black tracking-tighter leading-[0.85] text-[clamp(48px,7vw,88px)]">
              <span className="text-white">Conecta,</span>
              <br />
              <span className="text-sky-500 italic">crea</span>
              <span className="text-white"> &amp;</span>
              <br />
              <span className="text-white">compite.</span>
            </h1>

            <div className="mt-8 mb-6 flex items-center gap-4">
              <div className="w-8 h-px bg-sky-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase">
                Workshops · Hackathons · Conferencias
              </span>
            </div>

            <p className="max-w-md text-base text-gray-400 leading-relaxed mb-8">
              Cada evento es una oportunidad real de crecimiento técnico. Desde
              ciberseguridad hasta programación competitiva — aquí construyes
              tu perfil profesional desde la universidad.
            </p>

            {/* Live indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl
                            border border-white/[0.06] bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                Próximo evento en 3 días
              </span>
            </div>
          </div>

          {/* Video — limpio, sin efectos que compitan */}
          <div className="reveal reveal-delay-2 relative group">
            <div
              className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
                          bg-gradient-to-br from-sky-500/15 to-transparent
                          blur-md transition-opacity duration-700 pointer-events-none"
            />
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
              <video
                src={tuVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay — solo en la parte inferior para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* ══ PROOF STRIP ═══════════════════════════════════════
          Sección nueva — credibilidad ejecutada.
          Mismo sistema de grid que HomePage y NosotrosPage.
      ═════════════════════════════════════════════════════ */}
      <div className="border-y border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {impactStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 px-8 flex flex-col gap-1.5
                  ${i < impactStats.length - 1 ? 'border-r border-white/[0.05]' : ''}
                  ${i < 2 ? 'border-b md:border-b-0 border-white/[0.05]' : ''}
                `}
              >
                <div className="font-black text-3xl md:text-4xl tracking-tight text-white leading-none">
                  {stat.value}
                </div>
                <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ EXPLORADOR DE EVENTOS ═════════════════════════════
          Header editorial + filtros limpios + grid.
      ═════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
            <SectionMeta
              tag="Timeline"
              title={<>Próximas<br />actividades.</>}
            />

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <FilterChip
                  key={f}
                  label={f}
                  isActive={activeFilter === f}
                  onClick={() => setActiveFilter(f)}
                />
              ))}
            </div>
          </div>

          {/* Grid de eventos */}
          {filtered.length > 0 ? (
            <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(ev => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          ) : (
            <div className="reveal">
              <EmptyState filter={activeFilter} />
            </div>
          )}

          {/* CTA de comunidad */}
          <div className="reveal mt-20 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-white font-bold text-lg mb-1">
                ¿No quieres perderte ningún evento?
              </p>
              <p className="text-gray-500 text-sm">
                Únete a la comunidad y recibe notificaciones directas.
              </p>
            </div>
            <Link
              to="/contacto"
              onClick={() => window.scrollTo(0, 0)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                         bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm
                         transition-all duration-200 hover:shadow-[0_0_24px_rgba(14,165,233,0.35)]"
            >
              Unirme a la comunidad
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PROPONER EVENTO ═══════════════════════════════════
          Simplificado — sin PlusCircle giant, sin rounded-[3rem].
          Dos columnas: copy izquierda, CTA derecha.
          Mismo estilo que el CTA final de NosotrosPage.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-28 px-6 md:px-20 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto reveal">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">

            <div className="max-w-lg">
              <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/50 uppercase block mb-4">
                Collaborate
              </span>
              <h2 className="font-black text-4xl md:text-5xl tracking-tight leading-[0.9] text-white mb-5">
                ¿Quieres compartir<br />
                <span className="text-sky-500">tus conocimientos?</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Si tienes un tema que dominas o quieres liderar un taller técnico,
                te damos la plataforma, la audiencia y el soporte logístico completo.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
              {/* Highlights del programa */}
              <div className="space-y-2.5 mb-2">
                {[
                  'Audiencia técnica de la UNI',
                  'Soporte logístico completo',
                  'Visibilidad en la comunidad IEEE',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                    <div className="w-1 h-1 rounded-full bg-sky-500/60 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                to="/contacto"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                           border border-sky-500/30 text-sky-400 font-bold text-sm
                           hover:bg-sky-500 hover:text-white hover:border-sky-500
                           transition-all duration-200"
              >
                Enviar propuesta
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}