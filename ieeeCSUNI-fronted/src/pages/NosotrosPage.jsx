/**
 * NosotrosPage — IEEE CS UNI
 *
 * Reestructuración completa vs v1:
 *
 * ARQUITECTURA
 * ─ Eliminados: Orb, HeroTag, SectionLabel/SectionTitle imports externos.
 *   Estas abstracciones eran tan simples que añadían indirección sin valor.
 *   Se definen inline como componentes locales con Tailwind puro.
 * ─ Eliminadas: todas las inline styles con CSS variables (var(--fg), etc.)
 *   Incompatibles con la arquitectura Tailwind-first de la HomePage.
 * ─ Eliminado: efecto glitch triple en mascota. Reemplazado por presentación
 *   limpia con drop-shadow controlado.
 *
 * DISEÑO
 * ─ Color único de acento: sky-500 en todo el documento. Cero desviaciones.
 * ─ Dot grid background en Hero, consistente con HomePage.
 * ─ Mascota: imagen única, sin animaciones destructivas.
 * ─ Timeline: foto solo en el item featured (primero). Evita el "misma foto
 *   para todo" que destroza la credibilidad.
 * ─ Nueva sección: Legitimidad — afiliación IEEE + stats de comunidad.
 *
 * FLOW
 *   Hero institucional → Misión editorial → Pilares → Valores → Historia → Legitimidad
 */

import { useScrollReveal } from '../hooks/useScrollReveal'
import { timeline } from '../data'
import mascotaImg from '../../public/mascotaWhos.png'
import FebreroTime from '../../public/febrero2026.jpg'
import { Target, Cpu, Globe, Terminal, Zap, Users, Lightbulb, ArrowUpRight } from 'lucide-react'

// ─── Datos ────────────────────────────────────────────────────

const pillars = [
  {
    icon: Target,
    tag: 'VISION',
    title: 'Visión 2026',
    desc: 'Liderar la vanguardia técnica estudiantil en computación a nivel regional.',
  },
  {
    icon: Globe,
    tag: 'NETWORK',
    title: 'Red Global',
    desc: 'Conexión directa con los estándares y profesionales de IEEE Computer Society.',
  },
  {
    icon: Cpu,
    tag: 'R&D',
    title: 'I+D+i UNI',
    desc: 'Investigación aplicada que sale del aula y genera impacto medible.',
  },
  {
    icon: Terminal,
    tag: 'STACK',
    title: 'Full-Stack Mindset',
    desc: 'Dominio técnico desde hardware embebido hasta arquitecturas en la nube.',
  },
]

const values = [
  {
    icon: Zap,
    title: 'Excelencia técnica',
    desc: 'No resolvemos el problema — buscamos la solución más eficiente, elegante y mantenible.',
  },
  {
    icon: Users,
    title: 'Comunidad primero',
    desc: 'El conocimiento individual es limitado. Construimos en equipo y compartimos sin reservas.',
  },
  {
    icon: Lightbulb,
    title: 'Adaptabilidad',
    desc: 'El stack cambia. Los principios sólidos no. Aprendemos rápido y construimos sobre bases.',
  },
]

const legitimacy = [
  { value: 'IEEE', label: 'Organización madre', note: 'Institute of Electrical and Electronics Engineers' },
  { value: 'UNI', label: 'Casa de estudios', note: 'Universidad Nacional de Ingeniería — Lima' },
  { value: '12k+', label: 'Comunidad global', note: 'IEEE Computer Society worldwide members' },
  { value: '2025', label: 'Año de fundación', note: 'Capítulo estudiantil activo' },
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

function PillarCard({ icon: Icon, tag, title, desc, index }) {
  return (
    <div className="group flex gap-5 p-7 rounded-2xl border border-white/[0.06] bg-white/[0.015]
                    hover:border-sky-500/25 hover:bg-sky-500/[0.03] transition-all duration-300">
      <span className="flex-shrink-0 font-mono text-[10px] text-gray-700 pt-1 w-4 text-right select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/10
                      flex items-center justify-center
                      group-hover:bg-sky-500/15 group-hover:border-sky-500/30 transition-all">
        <Icon className="w-4 h-4 text-sky-400" />
      </div>
      <div>
        <span className="font-mono text-[9px] text-sky-500/50 uppercase tracking-widest">{tag}</span>
        <h4 className="font-bold text-sm text-white mt-1 mb-1.5 leading-snug">{title}</h4>
        <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function ValueCard({ icon: Icon, title, desc }) {
  return (
    <div className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01]
                    hover:border-sky-500/20 hover:bg-sky-500/[0.02] transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/10
                      flex items-center justify-center mb-6
                      group-hover:bg-sky-500/15 group-hover:border-sky-500/30 transition-all">
        <Icon className="w-4 h-4 text-sky-400" />
      </div>
      <h4 className="font-bold text-base text-white mb-3 tracking-tight">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function TimelineItem({ item, index, isFeatured, photo }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 pb-16 group">
      {/* Dot marker */}
      <div className="absolute -left-[37px] top-1 w-[18px] h-[18px] rounded-full
                      bg-[#020617] border-2 border-sky-500/40
                      group-hover:border-sky-500 transition-colors duration-300 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-sky-500/60 group-hover:bg-sky-400 transition-colors" />
      </div>

      <div>
        <span className="font-mono text-[10px] tracking-[0.25em] text-sky-500/60 uppercase block mb-2">
          {item.year}
        </span>
        <h4 className="font-bold text-lg text-white mb-2 tracking-tight">{item.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed max-w-lg">{item.desc}</p>
      </div>

      {/* Foto solo para el item featured (evita repetición obvia) */}
      {isFeatured && photo && (
        <div className="relative w-full h-28 rounded-xl overflow-hidden border border-white/[0.06] flex-shrink-0 group/photo">
          <img
            src={photo}
            alt="Trayectoria IEEE CS UNI"
            className="w-full h-full object-cover grayscale group-hover/photo:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  )
}

// ─── Página principal ──────────────────────────────────────────

export default function NosotrosPage() {
  useScrollReveal()

  return (
    <main className="pt-16 bg-[#020617] text-white">

      {/* ══ HERO ══════════════════════════════════════════════
          Dos columnas: copy institucional + mascota limpia.
          Dot grid del mismo sistema que la HomePage.
      ═════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center px-6 md:px-20 overflow-hidden">

        {/* Dot grid — consistente con HomePage */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 via-transparent to-[#020617]/70 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center py-24">

          {/* Copy */}
          <div className="reveal">
            <Badge>IEEE Computer Society · UNI</Badge>

            <h1 className="mt-6 font-black tracking-tighter leading-[0.85] text-[clamp(52px,7vw,86px)]">
              <span className="text-white">Quiénes</span>
              <br />
              <span className="text-sky-500">somos.</span>
            </h1>

            <div className="mt-8 mb-6 flex items-center gap-4">
              <div className="w-8 h-px bg-sky-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase">
                Capítulo estudiantil · Lima, Perú · Est. 2025
              </span>
            </div>

            <p className="max-w-md text-base text-gray-400 leading-relaxed">
              El capítulo estudiantil de IEEE Computer Society en la Universidad Nacional
              de Ingeniería. Convertimos rigor académico en capacidad técnica de nivel industria.
            </p>
          </div>

          {/* Mascota — sin glitch, sin scan, sin triple capa.
              Una imagen limpia proyecta más confianza que tres capas de efectos. */}
          <div className="reveal reveal-delay-2 flex justify-center lg:justify-end">
            <div className="relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80">
              {/* Halo ambiental muy sutil */}
              <div className="absolute w-48 h-48 rounded-full bg-sky-500/8 blur-[80px]" />
              <img
                src={mascotaImg}
                alt="Mascota IEEE CS UNI"
                className="relative z-10 w-full h-full object-contain select-none"
                style={{ filter: 'drop-shadow(0 8px 32px rgba(14,165,233,0.18))' }}
                draggable={false}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ══ MISSION STATEMENT ═════════════════════════════════
          Una sola oración de impacto, tipografía grande.
          El tipo editorial más poderoso que cualquier card.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto reveal">
          <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/50 uppercase block mb-8">
            Misión
          </span>
          <blockquote className="font-black tracking-tight leading-[0.88] text-[clamp(32px,5vw,64px)] max-w-5xl">
            <span className="text-white">Empoderamos a los mejores estudiantes de ingeniería de la UNI con </span>
            <span className="text-sky-500">conocimiento técnico de élite, </span>
            <span className="text-white">comunidad global </span>
            <span className="text-white/20 italic">y proyectos que trascienden el aula.</span>
          </blockquote>
        </div>
      </section>

      {/* ══ PILARES ═══════════════════════════════════════════
          2x2 grid con índice numérico + icono + texto.
          Color único: sky. Sin desviaciones cromáticas.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <SectionMeta tag="Fundamentos" title={<>Lo que nos<br />define.</>} />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
              Cuatro ejes que estructuran nuestra identidad como organización técnica.
            </p>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <PillarCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALORES ═══════════════════════════════════════════
          Tres columnas limpias. Acento único sky-500.
          Sin gradientes de fondo inline.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-28 px-6 md:px-20 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-14">
            <SectionMeta tag="Valores" title={<>Código que<br />nos guía.</>} />
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v) => (
              <ValueCard key={v.title} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ HISTORIA ══════════════════════════════════════════
          Timeline vertical limpio. Foto solo en el primer
          item — honesto, no repetitivo.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="reveal mb-16">
            <SectionMeta tag="Historia" title={<>Nuestra<br />trayectoria.</>} />
          </div>

          <div className="relative pl-9">
            {/* Línea vertical de timeline */}
            <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-sky-500/40 via-sky-500/10 to-transparent" />

            {timeline.map((item, i) => (
              <TimelineItem
                key={item.year || i}
                item={item}
                index={i}
                isFeatured={i === 0}
                photo={FebreroTime}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ LEGITIMIDAD ═══════════════════════════════════════
          Sección nueva. Ancla institucional: muestra la
          afiliación IEEE, la casa de estudios y la red.
          El equivalente al "As seen in" de startups serias.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-20 px-6 md:px-20 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12 text-center">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase">
              Parte de una red mayor
            </span>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-0">
            {legitimacy.map((item, i) => (
              <div
                key={item.label}
                className={`py-10 px-8 flex flex-col gap-2 text-center
                  ${i < legitimacy.length - 1 ? 'border-r border-white/[0.06]' : ''}
                  ${i < 2 ? 'border-b md:border-b-0 border-white/[0.06]' : ''}
                `}
              >
                <div className="font-black text-3xl md:text-4xl tracking-tight text-white leading-none">
                  {item.value}
                </div>
                <p className="text-[11px] font-bold text-sky-500/70 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-[10px] text-gray-600 leading-snug mt-0.5">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════
          Cierre limpio. Invita a la acción sin forzarla.
      ═════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto reveal flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <h3 className="font-black text-4xl md:text-5xl tracking-tight leading-[0.9] text-white mb-4">
              ¿Listo para<br />
              <span className="text-sky-500">construir con nosotros?</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Buscamos estudiantes de la UNI con hambre técnica y visión de impacto.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm
                         bg-sky-500 hover:bg-sky-400 text-white transition-all duration-200
                         hover:shadow-[0_0_24px_rgba(14,165,233,0.35)]"
            >
              Únete al capítulo
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/proyectos"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10
                         hover:border-white/20 hover:bg-white/[0.04]
                         rounded-xl font-bold text-sm transition-all duration-200"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}