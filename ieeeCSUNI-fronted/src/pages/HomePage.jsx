import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events, achievements } from '../data'
import { HeroTag, StatBar, ScrollHint, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { EventCard } from '../components/ui/EventCard'
import MascotaImg from '../../public/mascotaWhere.png'
import { 
  Terminal, 
  Code2, 
  Rocket, 
  Users, 
  ChevronRight, 
  Target, 
  Eye, 
  Cpu,
  Globe
} from 'lucide-react'

const heroStats = [
  { number: '150', suffix: '+', label: 'Miembros activos' },
  { number: '40',  suffix: '+', label: 'Eventos realizados' },
  { number: '8',   suffix: '°', label: 'Años de historia' },
  { number: '12',  suffix: 'k', label: 'Comunidad IEEE' },
]

export default function HomePage() {
  const canvasRef = useRef(null)
  useScrollReveal()

  return (
    <main className="pt-16 bg-[#020617] text-white">
      {/* ── HERO CON FOTO DEL EQUIPO ── */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-20 overflow-hidden">
        <Orb className="top-[-100px] right-[-100px] w-[800px] h-[800px] opacity-20"
             style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)' }} />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Columna Izquierda: Texto */}
          <div className="reveal">
            <HeroTag>Universidad Nacional de Ingeniería · Lima, Perú</HeroTag>
            <h1 className="font-black leading-[0.85] tracking-tighter mb-8 text-[clamp(45px,8vw,95px)]">
              <span className="text-white">Computer</span><br />
              <span className="text-sky-500">Society</span> <span className="text-white/20 italic">UNI</span>
            </h1>
            <p className="max-w-lg text-lg text-gray-400 mb-10 leading-relaxed">
              Impulsamos el estándar de la ingeniería en computación. No solo estudiamos tecnología, la construimos desde la base.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contacto" className="btn-primary px-10 py-4 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                Unirse ahora
              </Link>
              <Link to="/proyectos" className="px-10 py-4 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all backdrop-blur-sm">
                Proyectos
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Foto del Capítulo con efecto Tech */}
          <div className="relative reveal reveal-delay-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden group">
              {/* Bordes decorativos animados */}
              <div className="absolute inset-0 border-2 border-sky-500/30 rounded-2xl z-20 pointer-events-none group-hover:border-sky-500 transition-colors" />
              <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-sky-400 z-30 opacity-50" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-sky-400 z-30 opacity-50" />
              
              {/* Foto (Aquí pones la ruta de la foto de ustedes) */}
              <img 
                src="/foto-capitulo.jpg" 
                alt="Equipo IEEE CS UNI" 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Overlay de color */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10" />
              
              {/* Badge de "Active Team" */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-sky-600/90 backdrop-blur-md px-4 py-2 rounded-lg">
                <Users className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-widest">Active Core 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR (SEPARADOR) ── */}
      <div className="px-6 md:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <StatBar stats={heroStats} />
        </div>
      </div>

      {/* ── SECCIÓN: MASCOTA Y FILOSOFÍA ── */}
      <section className="py-32 px-6 md:px-20 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-20 items-center">
          {/* Mascota con efecto continuo (Lado izquierdo ahora) */}
          <div className="relative flex justify-center group order-2 lg:order-1">
            <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
              
              {/* Chispas Naranja/Rojo (Sutiles) */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="spark bg-orange-500 shadow-[0_0_8px_#ff4500]"
                  style={{
                    left: `${20 + Math.random() * 60}%`, // Posición aleatoria horizontal
                    bottom: '20%',
                    animationDelay: `${Math.random() * 2}s`, // Delay para que fluyan
                    animationDuration: `${1.5 + Math.random()}s`
                  }}
                />
              ))}

              {/* La Mascota con un brillo suave de energía */}
              <img 
                src={MascotaImg} 
                alt="Mascota CS" 
                className="relative z-10 w-64 h-auto object-contain"
                style={{ animation: 'soft-glow 3s infinite ease-in-out' }}
              />

              {/* Resplandor base muy tenue */}
              <div className="absolute w-40 h-40 bg-orange-600/5 blur-[60px] rounded-full" />
              
            </div>
          </div>

          {/* Misión y Visión */}
          <div className="reveal order-1 lg:order-2">
            <SectionLabel>Sobre el capítulo</SectionLabel>
            <SectionTitle className="mb-12 text-5xl">Elevando el ADN<br/>tecnológico de la UNI.</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 transition-all">
                <Target className="w-10 h-10 text-sky-500 mb-6" />
                <h4 className="text-xl font-bold mb-4">Nuestra Misión</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Fomentar la excelencia técnica y el liderazgo profesional a través de la investigación aplicada y el desarrollo de proyectos disruptivos.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 transition-all">
                <Eye className="w-10 h-10 text-sky-500 mb-6" />
                <h4 className="text-xl font-bold mb-4">Nuestra Visión</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ser el referente tecnológico estudiantil líder en el Perú, conectando el talento de la UNI con la industria global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ HACEMOS (EXTENDIDO) ── */}
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel className="mx-auto">Ecosistema</SectionLabel>
            <SectionTitle>Áreas de Especialización</SectionTitle>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Code2 />, title: "Software Eng", desc: "Arquitectura, Backend y Frameworks modernos." },
              { icon: <Cpu />, title: "Hard & Embedded", desc: "IoT, Robótica y sistemas de bajo nivel." },
              { icon: <Globe />, title: "Net & Security", desc: "Ciberseguridad, Redes y Cloud Computing." },
              { icon: <Terminal />, title: "Comp. Prog.", desc: "Algoritmos avanzados y preparación Xtreme." }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-sky-500/[0.05] transition-all text-center">
                <div className="inline-flex p-4 rounded-2xl bg-sky-500/10 text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold text-lg mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CODENIX (LA JOYA REFINADA) ── */}
      <section className="relative py-40 px-6 md:px-20 bg-[#050914] overflow-hidden">
        {/* Animated Background Code Snippets (Efecto sutil) */}
        <div className="absolute inset-0 font-mono text-[10px] text-sky-500/5 select-none overflow-hidden opacity-40 leading-tight">
          {Array(20).fill("const codenix = (u) => u.evolve(); if(user.isUni()) join(); ").map((t, i) => <div key={i} className="whitespace-nowrap">{t.repeat(10)}</div>)}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-orange-500 blur-[60px] opacity-20 animate-pulse" />
            <img src="./codenixLogo.png" alt="CODENIX" className="w-32 h-32 relative z-10 drop-shadow-[0_0_20px_#e55d17]" />
          </div>
          
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
            CODENIX
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-medium tracking-wide">
            LA PLATAFORMA DE ENTRENAMIENTO <span className="text-orange-500">EXCLUSIVA UNI</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <span className="px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest">Competitive Coding</span>
            <span className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">Cyber Labs</span>
            <span className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">Ranking UNI</span>
          </div>

          <button className="px-12 py-5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(229,93,23,0.3)]">
            ACCESO BETA →
          </button>
        </div>
      </section>
    </main>
  )
}