import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { EventCard } from '../components/ui/EventCard'
import { Calendar, Sparkles, PlusCircle, Play, Monitor } from 'lucide-react'
import tuVideo from '../../public/videoplayback.mp4'

const FILTERS = ['Todos', 'Taller', 'Competencia', 'Charla', 'Hackathon', 'Conferencia']

export default function EventosPage() {
  useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? events
    : events.filter(e => e.type === activeFilter)

  return (
    <main className="pt-16 bg-[#020617] text-white min-h-screen">
      
      {/* ── HERO SECTION WITH VIDEO/ANIMATION SLOT ── */}
      <section className="relative px-6 md:px-20 pt-20 pb-12 overflow-hidden">
        <Orb className="top-[-100px] right-[-50px] w-[800px] h-[800px] opacity-20"
             style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)' }} />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <HeroTag>IEEE CS UNI Live</HeroTag>
            <h1 className="font-black leading-[0.85] tracking-tighter mb-8 text-[clamp(45px,7vw,90px)] uppercase">
              <span className="text-white">Conecta,</span><br />
              <span className="text-sky-500 italic">Crea &</span><br />
              <span className="text-white">Compite.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-400 leading-relaxed mb-8">
              Desde hackathons épicas hasta workshops de ciberseguridad. 
              Tu próximo gran salto profesional empieza en uno de nuestros eventos.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Próximo evento en 3 días</span>
               </div>
            </div>
          </div>

          {/* ── CREATIVE MEDIA SLOT ── */}
          <div className="relative group reveal">
            {/* Decoración de Frame Tecnológico */}
            <div className="absolute -inset-4 border border-white/5 rounded-[2.5rem] pointer-events-none group-hover:border-sky-500/20 transition-colors duration-700" />
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-sky-500 rounded-tl-xl" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-sky-500 rounded-br-xl" />
            
            {/* Contenedor de Video/Animación */}
            <div className="relative aspect-video bg-[#0b1120] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-sky-500/10">
               {/* ESPACIO PARA TU VIDEO/ANIMACIÓN */}
               <video src={tuVideo} autoPlay loop muted className="w-full h-full object-cover" />
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-900/40 to-transparent">
                  <Play className="w-16 h-16 text-white/20 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-500" />
                  <span className="mt-4 text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase group-hover:text-sky-400/50">
                    [ Media_Stream_Active ]
                  </span>
               </div>
               
               {/* Overlay de Scanline */}
               <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] bg-[length:100%_2px,3px_100%]" />
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── EXPLORADOR DE EVENTOS ── */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="reveal">
              <SectionLabel>Timeline</SectionLabel>
              <SectionTitle>Próximas Actividades</SectionTitle>
            </div>

            {/* Chips de Filtro Mejorados */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-md">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === f 
                    ? 'bg-sky-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]' 
                    : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Principal */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(ev => (
                <div key={ev.id} className="reveal">
                  <EventCard event={ev} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] reveal">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Calendar className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-300">Nada programado en "{activeFilter}"</h3>
              <p className="text-gray-500 text-sm">Explora otras categorías para encontrar tu próxima aventura.</p>
            </div>
          )}

          {/* CTA Registro */}
          <div className="mt-20 p-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent rounded-full">
            <div className="text-center py-8">
              <p className="text-sm text-gray-400 mb-6 flex items-center justify-center gap-2">
                <Sparkles size={16} className="text-sky-500" />
                No te pierdas de nada. Únete a la comunidad oficial.
              </p>
              <Link to="/login" className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-sky-500 hover:text-white transition-all">
                Crear cuenta gratis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPOSE EVENT (BENTO STYLE) ── */}
      <section className="py-24 px-6 md:px-20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#0b1120] to-transparent border border-white/5 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <PlusCircle size={200} />
            </div>
            
            <div className="relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
               <div className="flex-1">
                  <SectionLabel>Collaborate</SectionLabel>
                  <SectionTitle className="text-3xl md:text-5xl mb-6">¿Quieres compartir <br />tus conocimientos?</SectionTitle>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Si tienes un tema que te apasiona o quieres dirigir un taller técnico, 
                    estamos listos para darte la plataforma y el apoyo logístico.
                  </p>
               </div>
               <div className="flex-shrink-0">
                  <Link to="/contacto" className="inline-flex items-center gap-3 px-8 py-4 border border-sky-500/50 text-sky-400 rounded-2xl font-bold hover:bg-sky-500 hover:text-white transition-all group">
                    Enviar propuesta <Monitor className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}