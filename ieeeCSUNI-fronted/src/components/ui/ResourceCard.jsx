/**
 * ResourceCard — IEEE CS UNI
 *
 * Data model esperado (actualizar en data.js):
 * {
 *   id, title, description, url,
 *   category,                          // categoría existente
 *   type: 'paper'|'guide'|'tool'|'course'|'tutorial'|'reference',
 *   level: 'beginner'|'intermediate'|'advanced',
 *   area:  'software'|'security'|'networks'|'competitive'|'research',
 *   featured?: boolean,
 *   cta?: string,                      // ej: "Leer paper", "Ver guía"
 * }
 *
 * Si el resource no trae type/level/area, el card los omite
 * limpiamente — retrocompatible con la data actual.
 */

import { ArrowUpRight, BookOpen, Wrench, GraduationCap, FileText, Terminal, Link2 } from 'lucide-react'

// ─── Sistemas de metadata ──────────────────────────────────────

const TYPE_CONFIG = {
  paper:     { icon: FileText,      label: 'Paper',     style: 'text-violet-400 bg-violet-500/8 border-violet-500/15' },
  guide:     { icon: BookOpen,      label: 'Guía',      style: 'text-sky-400 bg-sky-500/8 border-sky-500/15'         },
  tool:      { icon: Wrench,        label: 'Tool',      style: 'text-orange-400 bg-orange-500/8 border-orange-500/15'},
  course:    { icon: GraduationCap, label: 'Curso',     style: 'text-emerald-400 bg-emerald-500/8 border-emerald-500/15'},
  tutorial:  { icon: Terminal,      label: 'Tutorial',  style: 'text-sky-400 bg-sky-500/8 border-sky-500/15'         },
  reference: { icon: Link2,         label: 'Referencia',style: 'text-gray-400 bg-white/4 border-white/8'             },
}

const LEVEL_CONFIG = {
  beginner:     { label: 'Básico',       style: 'text-emerald-400/80' },
  intermediate: { label: 'Intermedio',   style: 'text-sky-400/80'     },
  advanced:     { label: 'Avanzado',     style: 'text-orange-400/80'  },
}

const DEFAULT_CTA = {
  paper:     'Leer paper',
  guide:     'Ver guía',
  tool:      'Abrir tool',
  course:    'Iniciar curso',
  tutorial:  'Ver tutorial',
  reference: 'Explorar',
}

// ─── Componente ────────────────────────────────────────────────

export function ResourceCard({ resource, featured = false }) {
  const {
    title,
    excerpt,
    link,
    category,
    type,
    level,
    cta,
  } = resource

  const typeConfig  = type  ? TYPE_CONFIG[type]   : null
  const levelConfig = level ? LEVEL_CONFIG[level] : null
  const TypeIcon    = typeConfig?.icon ?? Link2
  const ctaLabel    = cta ?? (type ? DEFAULT_CTA[type] : 'Explorar')

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group flex flex-col h-full rounded-2xl border bg-white/[0.015]
        transition-all duration-300 overflow-hidden
        hover:bg-white/[0.03]
        ${featured
          ? 'border-sky-500/25 hover:border-sky-500/50'
          : 'border-white/[0.06] hover:border-white/[0.14]'
        }
      `}
    >
      {/* Cabecera */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">

          {/* Type badge */}
          {typeConfig ? (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border
                              text-[10px] font-mono font-bold uppercase tracking-widest ${typeConfig.style}`}>
              <TypeIcon className="w-3 h-3" />
              {typeConfig.label}
            </span>
          ) : (
            <span className="inline-flex px-2.5 py-1 rounded-lg border border-white/[0.06]
                             text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              {category}
            </span>
          )}

          {featured && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-lg
                             bg-sky-500/10 border border-sky-500/20
                             text-[9px] font-mono font-bold text-sky-400 uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              Destacado
            </span>
          )}
        </div>

        <h3 className="font-bold text-base text-white leading-snug tracking-tight mb-2
                       group-hover:text-sky-50 transition-colors line-clamp-2">
          {title}
        </h3>

        {levelConfig && (
          <span className={`font-mono text-[10px] ${levelConfig.style}`}>
            {levelConfig.label}
          </span>
        )}
      </div>

      {/* Separador */}
      <div className="mx-6 h-px bg-white/[0.05]" />

      {/* Cuerpo */}
      <div className="p-6 pt-4 flex-1 flex flex-col justify-between gap-5">
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {excerpt ?? 'Recurso técnico del ecosistema IEEE CS UNI.'}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-gray-600
                           group-hover:text-sky-400 transition-colors uppercase tracking-wider">
            {ctaLabel}
          </span>
          <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-white
                                   transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  )
}