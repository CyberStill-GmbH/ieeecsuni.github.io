import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { team } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { MemberCard } from '../components/ui/MemberCard'
import mascotaImg from '../../public/mascotaFormal.png'
import { 
  UserPlus, 
  Lightbulb, 
  ShieldCheck, 
  Award, 
  Trophy,
  Mail
} from 'lucide-react'

export default function EquipoPage() {
  useScrollReveal()

  return (
    <main className="pt-16 bg-[#020617] text-white min-h-screen">
      {/* ── HERO: CORE CON MASCOTA POSICIONADA ── */}
      <section
        className="relative flex items-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: '80vh', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-100px] left-[-100px] w-[700px] h-[700px] opacity-20"
             style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LADO IZQUIERDO: TEXTO */}
          <div className="reveal">
            <HeroTag>Human Capital</HeroTag>
            <h1 className="font-black leading-[0.85] tracking-tighter mb-8 text-[clamp(45px,7vw,90px)]">
              <span className="text-white">Las mentes</span><br />
              <span className="text-sky-500">detrás del bit.</span>
            </h1>
            <p className="max-w-xl text-xl text-gray-400 leading-relaxed">
              Somos una fuerza colectiva de estudiantes de la UNI dedicados a 
              democratizar el acceso a la tecnología de vanguardia y la ciberseguridad.
            </p>
          </div>

          {/* LADO DERECHO: MASCOTA FORMAL */}
          <div className="flex justify-center lg:justify-end items-center reveal">
            <div className="relative w-full max-w-[450px] aspect-square flex justify-center items-center">
              {/* Resplandor de fondo para dar profundidad */}
              <div className="absolute w-72 h-72 bg-sky-600/20 blur-[120px] rounded-full animate-pulse" />
              
              <img 
                src={mascotaImg} 
                alt="Mascota IEEE CS UNI Formal" 
                className="fenix-formal relative z-10 w-full h-full object-contain select-none"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── DIRECTIVA ACTUAL ── */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="reveal">
              <SectionLabel>Leadership</SectionLabel>
              <SectionTitle>Directiva 2026</SectionTitle>
            </div>
            <p className="text-gray-500 max-w-xs text-sm border-l border-sky-500/50 pl-4">
              Liderando la reactivación y el crecimiento técnico del capítulo IEEE Computer Society.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={m.name} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <MemberCard member={m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN: BÚSQUEDA DE ASESORES ── */}
      <section className="py-32 px-6 md:px-20 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute inset-0 bg-sky-500/[0.02] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <SectionLabel>Faculty Advisors</SectionLabel>
              <SectionTitle className="mb-8">Buscamos mentores <br />que desafíen el status quo.</SectionTitle>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Estamos en proceso de reactivación y buscamos docentes e investigadores de la UNI 
                apasionados por la computación para guiar nuestras iniciativas académicas e institucionales.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Lightbulb />, title: "Asesoría Académica", desc: "Guía proyectos de investigación y workshops técnicos." },
                  { icon: <ShieldCheck />, title: "Respaldo Institucional", desc: "Conecta al capítulo con la facultad y convenios externos." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="text-sky-500">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <a href="mailto:tu-correo@uni.edu.pe" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-sky-500 hover:text-white transition-all group">
                  Postular como asesor <Mail className="w-4 h-4 group-hover:scale-110" />
                </a>
              </div>
            </div>

            <div className="relative reveal">
              <div className="absolute inset-0 bg-sky-500 blur-[100px] opacity-10 animate-pulse" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-square rounded-[2.5rem] bg-[#0b1120] border border-white/10 p-8 flex flex-col justify-center items-center text-center">
                     <Award className="w-10 h-10 text-sky-500 mb-4" />
                     <span className="text-xs font-bold uppercase tracking-tighter text-gray-400">Networking Internacional</span>
                  </div>
                  <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-sky-600/20 to-transparent border border-sky-500/20 p-8 flex flex-col justify-end">
                     <span className="text-3xl font-black mb-2 italic">Mentor</span>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Role available</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-8 flex flex-col justify-center items-center text-center">
                     <Trophy className="w-12 h-12 text-yellow-500/50 mb-4" />
                     <span className="text-xs font-bold uppercase tracking-tighter text-gray-400">Impacto en la Comunidad UNI</span>
                  </div>
                  <div className="aspect-square rounded-[2.5rem] bg-[#0b1120] border border-white/10 p-8 flex flex-col justify-center items-center text-center">
                     <UserPlus className="w-10 h-10 text-gray-600" />
                     <span className="text-xs font-bold uppercase tracking-tighter text-gray-600">Join the Board</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA: ÚNETE A LA DIRECTIVA ── */}
      <section className="py-40 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center reveal">
          <div className="inline-flex p-4 rounded-full bg-sky-500/10 text-sky-400 mb-8 animate-bounce">
            <UserPlus className="w-8 h-8" />
          </div>
          <SectionTitle className="mb-6">¿Tienes lo que se necesita <br />para liderar?</SectionTitle>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Buscamos a los próximos coordinadores de Logística, Marketing y Proyectos Técnicos. 
            No necesitas ser un experto, solo tener ganas de cambiar la facultad.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacto" className="px-10 py-4 bg-sky-600 rounded-2xl font-bold hover:bg-sky-500 transition-all shadow-xl shadow-sky-900/20">
              Postular como SuperVoluntario
            </Link>
            <Link to="/proyectos" className="px-10 py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all">
              Ver beneficios
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}