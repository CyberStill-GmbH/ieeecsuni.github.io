/**
 * EventCard v2 — IEEE CS UNI
 *
 * Cambios vs v1:
 * ─ Eliminado: gradient background header (frágil, dependiente de strings en data)
 * ─ Eliminado: giant letter type?.charAt(0) como decoración (cliché)
 * ─ Eliminado: todos los inline styles con CSS variables
 * ─ Eliminado: card-base class (inexistente en Tailwind)
 * ─ Corregido: typo `tect-[10px]` → text-[10px]
 * ─ Añadido: CTA de registro (falla de conversión crítica en v1)
 * ─ Añadido: barra de progreso de cupos (más legible que número solo)
 * ─ Añadido: modality chip (Presencial / Virtual / Híbrido)
 * ─ Añadido: variante featured con ring de acento
 * ─ Añadido: speaker field opcional
 * ─ Añadido: level badge opcional
 *
 * Estructura del event object esperada:
 * {
 *   id, type, title, date, time, location, description, tag,
 *   spotsLeft, spots,
 *   featured?,  speaker?, level?, modality?
 * }
 */

import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Users, Zap, Wifi, Building, Radio, ChevronRight } from 'lucide-react'

// ─── Constantes de tipo ────────────────────────────────────────

const TYPE_STYLES = {
  Taller:       'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Competencia:  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Charla:       'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Hackathon:    'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Conferencia:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const MODALITY_CONFIG = {
  Presencial: { icon: Building, label: 'Presencial' },
  Virtual:    { icon: Wifi,     label: 'Virtual'    },
  Híbrido:    { icon: Radio,    label: 'Híbrido'    },
}

const LEVEL_STYLES = {
  Básico:      'text-emerald-400/70',
  Intermedio:  'text-sky-400/70',
  Avanzado:    'text-orange-400/70',
}

// ─── Sub-componente: estado de cupos ──────────────────────────

function SpotsIndicator({ spots, spotsLeft }) {
  if (spots === undefined || spotsLeft === undefined) return null

  const isFull    = spotsLeft === 0
  const isUrgent  = !isFull && spotsLeft <= 5
  const pct       = Math.max(0, Math.round(((spots - spotsLeft) / spots) * 100))

  return (
    <div className="space-y-1.5">
      {/* Barra de progreso */}
      <div className="h-0.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull ? 'bg-amber-500' : isUrgent ? 'bg-orange-400' : 'bg-sky-500'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Label */}
      <div className={`flex items-center gap-1.5 text-[10px] font-mono font-bold ${
        isFull ? 'text-amber-400' : isUrgent ? 'text-orange-400' : 'text-gray-600'
      }`}>
        {isFull ? (
          <><Users className="w-3 h-3" /> AFORO COMPLETO</>
        ) : isUrgent ? (
          <><Zap className="w-3 h-3 animate-pulse" /> {spotsLeft} CUPOS RESTANTES</>
        ) : (
          <><Users className="w-3 h-3" /> {spotsLeft} / {spots} disponibles</>
        )}
      </div>
    </div>
  )
}

// ─── Componente principal ──────────────────────────────────────

export function EventCard({ event }) {
  const {
    id,
    type,
    title,
    date,
    time,
    location,
    description,
    tag,
    spotsLeft,
    spots,
    featured = false,
    speaker,
    level,
    modality,
    link,
  } = event

  const isFull        = spotsLeft === 0
  const typeStyle     = TYPE_STYLES[type] ?? 'bg-white/5 text-gray-400 border-white/10'
  const ModalityIcon  = modality ? MODALITY_CONFIG[modality]?.icon : null
  const levelStyle    = level ? LEVEL_STYLES[level] ?? 'text-gray-500' : null

  return (
    <article
      className={`
        group flex flex-col h-full rounded-2xl border bg-white/[0.015]
        transition-all duration-300 overflow-hidden
        hover:bg-white/[0.03]
        ${featured
          ? 'border-sky-500/25 hover:border-sky-500/50 shadow-[0_0_0_1px_rgba(14,165,233,0.1)]'
          : 'border-white/[0.06] hover:border-white/[0.12]'
        }
      `}
    >
      {/* ── Cabecera ── */}
      <div className="p-6 pb-4">

        {/* Top row: badge de tipo + featured indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase tracking-widest ${typeStyle}`}>
            {type}
          </span>
          {featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-[9px] font-mono font-bold uppercase tracking-widest text-sky-400">
              <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
              Destacado
            </span>
          )}
        </div>

        {/* Título */}
        <h3 className="font-bold text-white text-base leading-snug tracking-tight mb-3 group-hover:text-sky-50 transition-colors">
          {title}
        </h3>

        {/* Speaker (opcional) */}
        {speaker && (
          <p className="text-[11px] text-gray-600 font-mono mb-4">
            <span className="text-gray-700">con </span>{speaker}
          </p>
        )}

        {/* Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CalendarDays className="w-3.5 h-3.5 text-sky-500/60 flex-shrink-0" />
            <span>{date}{time ? ` · ${time}` : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-sky-500/60 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      {/* ── Separador ── */}
      <div className="mx-6 h-px bg-white/[0.05]" />

      {/* ── Cuerpo ── */}
      <div className="p-6 pt-4 flex-1 flex flex-col gap-4">
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Chips de metadata secundaria */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tag temático */}
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/[0.07] border border-sky-500/15 text-[10px] font-mono text-sky-500/60">
            {tag}
          </span>

          {/* Modality */}
          {modality && ModalityIcon && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-gray-600">
              <ModalityIcon className="w-3 h-3" />
              {modality}
            </span>
          )}

          {/* Level */}
          {level && (
            <span className={`px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono ${levelStyle}`}>
              {level}
            </span>
          )}
        </div>

        {/* Cupos */}
        <SpotsIndicator spots={spots} spotsLeft={spotsLeft} />

        {/* ── CTA ── */}
        <Link
          href={link}
          className={`
            mt-auto flex items-center justify-center gap-2
            w-full py-2.5 rounded-xl text-xs font-bold tracking-wide
            transition-all duration-200
            ${
              isFull
                ? 'bg-white/[0.03] border border-white/[0.06] text-gray-600 cursor-not-allowed pointer-events-none'
                : featured
                  ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_0_0] hover:shadow-[0_0_16px_rgba(14,165,233,0.3)]'
                  : 'bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white'
            }
          `}
        >
          {isFull ? 'Sin cupos disponibles' : 'Registrarme'}
          {!isFull && <ChevronRight className="w-3.5 h-3.5" />}
        </Link>
      </div>
    </article>
  )
}