import { useState, useEffect, useRef } from 'react'
import { projects } from '../data/data'
import ProjectCard from '../components/ui/ProjectCard'
import { Orb } from '../components/ui/HeroElements'
import { Github, ExternalLink, X, Users as UsersIcon, ArrowUpRight, Layers, ChevronRight } from 'lucide-react'
import MascotaImg from '../../public/codenixLogo.png'

/* ─── Noise Texture SVG (depth) ─── */
const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.035] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
)

/* ─── Grid Pattern ─── */
const GridPattern = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />
)

/* ─── Stat Pill ─── */
const StatPill = ({ label, value }) => (
  <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm">
    <span className="text-2xl font-black text-white tabular-nums">{value}</span>
    <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-sky-500/70 mt-0.5">{label}</span>
  </div>
)

/* ─── Modal ─── */
const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl"
        onClick={onClose}
        style={{ animation: 'fadeIn 200ms ease forwards' }}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-5xl flex flex-col md:flex-row overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        style={{
          background: 'linear-gradient(135deg, #0d1829 0%, #0b1120 50%, #070e1a 100%)',
          animation: 'modalIn 280ms cubic-bezier(0.34,1.56,0.64,1) forwards'
        }}
      >
        {/* Accent glow top-left */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-gray-400 hover:text-white hover:bg-red-500/80 hover:border-red-500/50 transition-all duration-200 active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── LEFT: Image ── */}
        <div className="md:w-[55%] relative overflow-hidden min-h-[260px] md:min-h-0">
          <img
            src={project.image}
            className="absolute inset-0 w-full h-full object-cover"
            alt={project.title}
            style={{ filter: 'brightness(0.6) saturate(0.8)' }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0b1120]/80 md:to-[#0b1120]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          {/* Tags bottom */}
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {project.tags?.map(t => (
              <span
                key={t}
                className="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border border-sky-500/40 bg-sky-500/10 text-sky-300 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Info ── */}
        <div className="md:w-[45%] p-8 md:p-10 flex flex-col relative">
          {/* Index number watermark */}
          <span className="absolute top-8 right-10 text-[80px] font-black text-white/[0.03] leading-none select-none pointer-events-none tabular-nums">
            {String(projects.findIndex(p => p.id === project.id) + 1).padStart(2, '0')}
          </span>

          <div className="flex-1">
            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-3 h-3 text-sky-500" />
              <span className="text-[9px] font-black tracking-[0.3em] uppercase text-sky-500">
                {project.category ?? 'IEEE CS UNI'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black leading-[0.95] uppercase text-white mb-5 tracking-tight">
              {project.title}
            </h2>

            <div className="w-12 h-[2px] bg-sky-500 mb-6 rounded-full" />

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Core Team */}
            {project.members?.length > 0 && (
              <div className="mb-8">
                <h4 className="flex items-center gap-2 text-[9px] font-black text-sky-500/80 uppercase tracking-[0.25em] mb-4">
                  <UsersIcon className="w-3.5 h-3.5" /> Core Team
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.members.map(member => (
                    <div
                      key={member}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-gray-300 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:border-sky-500/30 hover:text-white transition-all duration-200"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.09] text-gray-300 hover:text-white transition-all duration-200 group"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Repositorio
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest bg-sky-600 hover:bg-sky-500 text-white transition-all duration-200 shadow-lg shadow-sky-900/40 group"
            >
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Demo Live
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════ */
export default function ProyectosPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const allTags = ['all', ...new Set(projects.flatMap(p => p.tags ?? []))]
  const filtered = filter === 'all' ? projects : projects.filter(p => p.tags?.includes(filter))

  return (
    <main className="relative pt-24 bg-[#020617] min-h-screen text-white pb-32 overflow-x-hidden">
      <NoiseBg />

      {/* Background orbs */}
      <Orb className="top-[-10%] left-[-15%] w-[700px] h-[700px] opacity-[0.07]" />
      <Orb className="bottom-[20%] right-[-10%] w-[500px] h-[500px] opacity-[0.05]" />

      {/* ── HERO ── */}
      <section className="relative z-10 px-6 md:px-20 pt-8">
        <div className="max-w-7xl mx-auto">
          <GridPattern />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 mb-20">

            {/* Left: Copy */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1 relative z-10">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/[0.08] border border-sky-500/20 text-sky-400 text-[9px] font-black tracking-[0.35em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Engineering Hub
              </div>

              <h1 className="font-black tracking-tighter leading-[0.85] mb-6">
                <span className="block text-5xl md:text-7xl text-white">PROYECTOS</span>
                <span className="block text-5xl md:text-7xl text-sky-500">_LAB</span>
              </h1>

              <p className="text-gray-500 max-w-sm font-medium uppercase text-[10px] tracking-[0.2em] leading-loose mb-10">
                Soluciones tecnológicas desarrolladas por{' '}
                <span className="text-gray-300">IEEE Computer Society UNI</span>.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <StatPill label="Proyectos" value={projects.length} />
                <StatPill label="Tecnologías" value={allTags.length - 1} />
                <StatPill label="Miembros" value="20+" />
              </div>
            </div>

            {/* Right: Mascot */}
            <div className="relative flex items-center justify-center w-60 h-60 md:w-[900px] md:h-[380px] order-1 md:order-2 flex-shrink-0">
              {/* Ring decorations */}
              <div className="absolute inset-0 rounded-full border border-sky-500/[0.12] animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 rounded-full border border-sky-500/[0.07] animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

              {/* Sparks */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="spark bg-sky-400 absolute rounded-full shadow-[0_0_8px_#38bdf8]"
                  style={{
                    width: '3px', height: '3px',
                    left: `${15 + Math.random() * 70}%`,
                    bottom: `${20 + Math.random() * 40}%`,
                    animationDelay: `${(i * 0.35).toFixed(2)}s`,
                  }}
                />
              ))}

              <img
                src={MascotaImg}
                alt="Mascota IEEE CS"
                className="relative z-10 w-[75%] h-auto object-contain drop-shadow-[0_0_40px_rgba(14,165,233,0.35)] animate-ultra-fire"
              />
              <div className="absolute inset-0 bg-sky-500/[0.08] blur-[80px] rounded-full -z-10 animate-pulse" />
            </div>
          </div>

          {/* ── FILTER BAR ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 border ${
                  filter === tag
                    ? 'bg-sky-600 border-sky-500/60 text-white shadow-lg shadow-sky-900/30'
                    : 'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:bg-white/[0.07] hover:text-gray-200 hover:border-white/[0.15]'
                }`}
              >
                {tag === 'all' ? 'Todos' : tag}
              </button>
            ))}
          </div>

          {/* ── PROJECT GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.id ?? i}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-sky-500/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'brightness(0.7) saturate(0.75)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

                  {/* Index */}
                  <span className="absolute top-4 left-4 text-[10px] font-black tracking-[0.2em] text-white/30 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Arrow icon on hover */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-500/0 group-hover:bg-sky-500 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags?.slice(0, 3).map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[8px] font-black uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-black uppercase leading-tight text-white mb-2 group-hover:text-sky-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                    <div className="flex -space-x-1.5">
                      {project.members?.slice(0, 4).map((m, mi) => (
                        <div
                          key={mi}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-600 to-blue-800 border-2 border-[#020617] flex items-center justify-center text-[7px] font-black text-white"
                          title={m}
                        >
                          {m.charAt(0)}
                        </div>
                      ))}
                      {(project.members?.length ?? 0) > 4 && (
                        <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#020617] flex items-center justify-center text-[7px] font-bold text-gray-400">
                          +{project.members.length - 4}
                        </div>
                      )}
                    </div>

                    <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-sky-500/70 group-hover:text-sky-400 transition-colors">
                      Ver más <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <Layers className="w-10 h-10 text-white/10 mb-4" />
              <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">Sin proyectos para este filtro</p>
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL ── */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  )
}