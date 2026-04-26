import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { resources } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { Search, Compass, ArrowUpRight, Zap } from 'lucide-react'

const categories = ['Todo', 'IEEE Xplore', 'Guía de Carrera', 'Competencias', 'Tutoriales']

export default function RecursosPage() {
  useScrollReveal()
  const [activeCat, setActiveCat] = useState('Todo')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const matchesCat = activeCat === 'Todo' || r.category === activeCat
      const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [activeCat, searchQuery])

  return (
    <main className="pt-16 bg-[#020617] min-h-screen text-white">
      {/* ── HERO ── */}
      <section className="relative px-6 md:px-20 pt-24 pb-16 overflow-hidden">
        <Orb className="top-[-150px] right-[-100px] w-[800px] h-[800px] opacity-15"
             style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)' }} />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <HeroTag className="mx-auto">IEEE CS UNI Hub</HeroTag>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Recursos <span className="text-sky-500">&</span> Enlaces
          </h1>
          
          <div className="relative max-w-2xl mx-auto mt-12 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-900 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
            <div className="relative bg-[#0b1120] border border-white/10 rounded-xl flex items-center px-5 py-4">
              <Search className="w-5 h-5 text-sky-500 mr-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en la base de datos técnica..."
                className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-gray-600 text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORADOR ── */}
      <section className="py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          {/* CATEGORÍAS */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => { setActiveCat(c); setSearchQuery(''); }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
                  activeCat === c 
                  ? 'bg-sky-600 text-white border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                  : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* GRID DE CARDS SIN EMPAQUETADO */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.length > 0 ? (
              filteredResources.map((r, i) => (
                <a 
                  key={r.id || i}  
                  href={r.url || r.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="reveal group block h-full"
                >
                  <div className="relative h-full bg-[#030712] border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-sky-500/50 hover:bg-[#050a18] hover:-translate-y-2 flex flex-col">
                    
                    {/* Header: Categoría y Estado */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em]">
                        {r.category}
                      </span>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Live</span>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sky-400 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                      {r.excerpt || r.description || "Recurso técnico especializado del capítulo IEEE CS UNI."}
                    </p>

                    {/* Footer Simple */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-2 text-gray-600 group-hover:text-sky-500 transition-colors">
                        <Compass className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                          {r.buttonText || "Explorar recurso"}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                <p className="text-gray-500 italic">No se encontraron resultados para tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MENTORÍA CTA ── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto p-12 rounded-[2.5rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 italic">¿Buscas algo específico?</h3>
          <p className="text-gray-500 text-sm mb-8">Nuestros miembros senior pueden ayudarte a encontrar la documentación que necesitas.</p>
          <Link 
            to="/Equipo" 
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block px-10 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-lg shadow-sky-900/20 active:scale-95">
            Contactar mentor
          </Link>
        </div>
      </section>
    </main>
  )
}