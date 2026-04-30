import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resources } from '../data'
import { ResourceCard } from '../components/ui/ResourceCard'
import { Search, X, ArrowUpRight, ArrowRight } from 'lucide-react'

// ─── Filtros ───────────────────────────────────────────────────

const CATEGORIES = ['Todo', 'IEEE Xplore', 'Guía de Carrera', 'Competencias', 'Tutoriales']

// ─── Mosaico del hero — fotos curadas de Unsplash ─────────────
// 6 imágenes tech dispuestas en un grid asimétrico

const MOSAIC_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=75',
    alt: 'Código colorido en pantalla',
    className: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=75',
    alt: 'Ciberseguridad',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=75',
    alt: 'Circuit board',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=75',
    alt: 'Hackathon equipo',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=75',
    alt: 'Data research',
    className: '',
  },
]

// ─── Componentes locales ───────────────────────────────────────

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10
                     text-[11px] font-mono font-medium tracking-widest text-gray-500 uppercase">
      {children}
    </span>
  )
}

function SectionMeta({ tag, title, className = '' }) {
  return (
    <div className={className}>
      <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/60 uppercase">{tag}</span>
      <h2 className="mt-2 font-black tracking-tight leading-[0.88] text-white text-4xl md:text-5xl">
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
          : 'border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/[0.14]'
      }`}
    >
      {label}
    </button>
  )
}

function EmptyState({ query, onClear }) {
  return (
    <div className="col-span-full py-24 flex flex-col items-center text-center
                    border border-dashed border-white/[0.06] rounded-2xl">
      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06]
                      flex items-center justify-center mb-5">
        <Search className="w-5 h-5 text-gray-700" />
      </div>
      <h3 className="font-bold text-sm text-gray-400 mb-2">
        Sin resultados {query ? `para "${query}"` : 'en esta categoría'}
      </h3>
      <p className="text-gray-600 text-xs max-w-xs leading-relaxed mb-5">
        Prueba con otra categoría o ajusta tu búsqueda.
      </p>
      {query && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono
                     text-sky-500/60 hover:text-sky-400 transition-colors"
        >
          <X className="w-3 h-3" /> Limpiar búsqueda
        </button>
      )}
    </div>
  )
}

// ─── Página ────────────────────────────────────────────────────

export default function RecursosPage() {
  useScrollReveal()
  const [activeCat, setActiveCat]     = useState('Todo')
  const [searchQuery, setSearchQuery] = useState('')

  const featured = useMemo(() => {
    const f = resources.filter(r => r.featured)
    return f.length >= 2 ? f.slice(0, 3) : resources.slice(0, 3)
  }, [])

  const filtered = useMemo(() => {
    return resources.filter(r => {
      const matchesCat    = activeCat === 'Todo' || r.category === activeCat
      const matchesSearch = !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [activeCat, searchQuery])

  const isSearching = searchQuery.length > 0 || activeCat !== 'Todo'

  return (
    <main className="pt-16 bg-[#020617] min-h-screen text-white">

      {/* ══ HERO CON MOSAICO ══════════════════════════════════
          Dos columnas: copy + search izquierda,
          mosaico de fotos tech derecha.
          El mosaico reemplaza el vacío del hero anterior
          sin necesitar assets propios.
      ═════════════════════════════════════════════════════ */}
      <section className="relative px-6 md:px-20 overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 items-center py-16">

          {/* Copy + Search */}
          <div className="reveal">
            <Badge>IEEE CS UNI · Learning Hub</Badge>

            <h1 className="mt-6 font-black tracking-tighter leading-[0.85] text-[clamp(48px,7vw,84px)]">
              <span className="text-white">Recursos</span>
              <br />
              <span className="text-sky-500">&amp; Aprendizaje</span>
            </h1>

            <div className="mt-6 mb-5 flex items-center gap-4">
              <div className="w-8 h-px bg-sky-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase">
                Guías · Papers · Tools · Cursos
              </span>
            </div>

            <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-md">
              Base de conocimiento curada por el equipo de IEEE CS UNI. Desde
              fundamentos hasta investigación avanzada.
            </p>

            <div className="relative group max-w-xl">
              <div className="absolute inset-0 rounded-xl bg-sky-500/5 opacity-0
                              group-focus-within:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />
              <div className="relative flex items-center gap-3 bg-white/[0.03] border border-white/[0.08]
                              group-focus-within:border-sky-500/40 rounded-xl px-5 py-3.5 transition-all duration-200">
                <Search className="w-4 h-4 text-sky-500/60 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar recursos técnicos..."
                  className="bg-transparent outline-none w-full text-sm placeholder:text-gray-700 text-white"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}
                          className="text-gray-700 hover:text-gray-400 transition-colors flex-shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mosaico de imágenes tech ─────────────────────────
              Grid de 3 columnas con alturas variables.
              Todas las imágenes tienen grayscale leve para
              mantener coherencia con el dark mode.
              Hover quita el grayscale individualmente.
          ─────────────────────────────────────────────────── */}
          <div className="reveal reveal-delay-2 hidden lg:grid grid-cols-2 grid-rows-2 gap-3 h-[420px]">

            {/* Imagen grande izquierda — row-span-2 */}
            <div className="relative rounded-2xl overflow-hidden row-span-2 group">
              <img
                src={MOSAIC_IMAGES[0].src}
                alt={MOSAIC_IMAGES[0].alt}
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0
                           group-hover:scale-105 transition-all duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  Software Eng.
                </span>
              </div>
            </div>

            {/* 4 imágenes pequeñas en grid 2x2 derecha */}
            {MOSAIC_IMAGES.slice(1).map((img, i) => {
              const labels = ['Ciberseguridad', 'Hardware', 'Competitive', 'Research']
              return (
                <div key={i} className="relative rounded-xl overflow-hidden group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0
                               group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                      {labels[i]}
                    </span>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>

      {/* ══ FEATURED ══════════════════════════════════════════ */}
      {!isSearching && featured.length > 0 && (
        <>
          <div className="border-t border-white/[0.05]" />
          <section className="py-20 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="reveal flex items-end justify-between gap-6 mb-10">
                <SectionMeta tag="Curado por el equipo" title={<>Recursos<br />destacados.</>} />
              </div>

              <div className="reveal grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
                {featured[0] && <ResourceCard resource={featured[0]} featured />}
                <div className="flex flex-col gap-5">
                  {featured.slice(1, 3).map(r => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══ EXPLORER ══════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">

          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              {isSearching ? (
                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/60 uppercase block mb-2">
                    Resultados
                  </span>
                  <h2 className="font-black text-2xl text-white">
                    {filtered.length} {filtered.length === 1 ? 'recurso' : 'recursos'} encontrados
                  </h2>
                </div>
              ) : (
                <SectionMeta tag="Biblioteca" title={<>Base de<br />conocimiento.</>} />
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <FilterChip key={c} label={c} isActive={activeCat === c}
                            onClick={() => setActiveCat(c)} />
              ))}
            </div>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length > 0 ? (
              filtered.map(r => <ResourceCard key={r.id} resource={r} />)
            ) : (
              <EmptyState query={searchQuery}
                          onClear={() => { setSearchQuery(''); setActiveCat('Todo') }} />
            )}
          </div>
        </div>
      </section>

      {/* ══ CTA MENTOR ════════════════════════════════════════ */}
      <div className="border-t border-white/[0.05]" />
      <section className="py-20 px-6 md:px-20 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto reveal">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-lg">
              <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/50 uppercase block mb-4">
                Orientación técnica
              </span>
              <h2 className="font-black text-3xl md:text-4xl tracking-tight leading-[0.9] text-white mb-4">
                ¿No encuentras<br />
                <span className="text-sky-500">lo que necesitas?</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nuestros miembros senior pueden orientarte hacia la documentación,
                paper o recurso correcto para tu nivel y objetivo actual.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
              <div className="space-y-2.5 mb-2">
                {['Orientación personalizada 1:1', 'Recomendación por área técnica', 'Acceso a recursos internos del capítulo'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-500">
                    <div className="w-1 h-1 rounded-full bg-sky-500/60 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/equipo"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                           bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm
                           transition-all duration-200 hover:shadow-[0_0_24px_rgba(14,165,233,0.3)]"
              >
                Contactar a un mentor
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}