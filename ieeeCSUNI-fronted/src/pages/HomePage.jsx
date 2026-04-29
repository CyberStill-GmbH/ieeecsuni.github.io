import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { events, achievements } from '../data'
import { HeroTag, StatBar, ScrollHint, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { EventCard } from '../components/ui/EventCard'
import MascotaImg from '../../public/mascotaWhere.png'
import JuntaDirectiva from '../../public/JuntaDirectiva.jpg'
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
  { number: '9', suffix: '+', label: 'Miembros activos' },
  { number: '1',  suffix: '+', label: 'Eventos realizados' },
  { number: '1',   suffix: '°', label: 'Años de historia' },
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
            <h1 className="font-black leading-[0.85] tracking-tighter mb-8 text-[clamp(66px,8vw,95px)]">
              <span className="text-white">Computer</span><br />
              <span className="text-sky-500">Society</span> <span className="text-white/20 italic">UNI</span>
            </h1>
            <p className="max-w-lg text-lg text-gray-400 mb-10 leading-relaxed">
              Impulsamos el estándar de la ingeniería en computación. No solo estudiamos tecnología, la construimos desde la base.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contacto"
                onClick={() => window.scrollTo(0, 0)} 
                className="btn-primary px-10 py-4 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
              >
                Unirse ahora
              </Link>
              <Link 
                to="/proyectos"
                onClick={() => window.scrollTo(0, 0)}  
                className="px-10 py-4 border border-white/10 hover:bg-white/5 rounded-xl font-bold transition-all backdrop-blur-sm"
              >
                Proyectos
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Foto del Capítulo con efecto Tech */}
          <div className="relative reveal reveal-delay-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden group">
              {/* Bordes decorativos animados */}
              <div className="absolute inset-0 border-2 border-sky-500/30 rounded-2xl z-20 pointer-events-none group-hover:border-sky-500 transition-colors" />
              <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-sky-400 z-30 opacity-50" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-sky-400 z-30 opacity-50" />
              
              {/* Foto (Aquí pones la ruta de la foto de ustedes) */}
              <img 
                src={JuntaDirectiva} 
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
                    left: `${20 + Math.random() * 60}%`, 
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
                className="relative z-10 w-64 md:w-80 h-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 20px rgba(234, 88, 12, 0.2))' }}
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

      {/* ── CODENIX (Próximamente) ── */}
      <section className="relative py-40 px-6 md:px-20 bg-[#020617] overflow-hidden">
        {/* Fondo: Código Binario / Marquee Animado */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none select-none">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="whitespace-nowrap font-mono text-[10px] text-orange-500 animate-marquee mb-2"
              style={{ animationDuration: `${30 + i * 2}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
            >
              {"01000011 01001111 01000100 01000101 01001110 01001001 01011000 ".repeat(20)}
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LADO IZQUIERDO: TEXTO Y HYPE */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                System Status: Initializing Phase 0
              </div>

              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white">
                CODE<span className="text-orange-500">NIX</span>
              </h2>
              
              <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                Nuestra propia forja de código. Una iniciativa de <span className="text-white font-bold italic">IEEE CS UNI</span> para centralizar el entrenamiento en algoritmos y elevar el nivel competitivo del capítulo desde la base.
              </p>

              <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <div className="h-[1px] w-8 bg-orange-500/50"></div>
                  <span>Exclusivo para estudiantes UNI</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Dynamic Programming', 'Graph Theory', 'Bitmask'].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-orange-500/60 border border-orange-500/20 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              
            
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-orange-500/10 rounded-full overflow-hidden border border-orange-500/20">
                    <div 
                      className="h-full bg-orange-500 shadow-[0_0_15px_#ea580c] animate-load-progress"
                      style={{ width: '1%' }} // El progreso real del equipo jaja
                    />
                  </div>
                  <span className="font-mono text-orange-500 text-sm animate-pulse">1% LOADED</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-red-500/60 font-mono text-xs uppercase tracking-tighter">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Access: RESTRICTED_TO_CORE_ONLY
                  </div>
                  <p className="text-gray-500 text-xs font-mono italic">
                    // Los algoritmos están siendo optimizados. <br />
                    // No intentes forzar el acceso al kernel.
                  </p>
                </div>

                <div className="pt-4">
                  <span className="text-[10px] text-gray-700 uppercase tracking-[0.3em] block mb-2">Internal Protocol</span>
                  <div className="h-[1px] w-full bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: SIMULADOR DE TERMINAL (Un día para hacer este diseño :( )) */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-sky-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header de la Terminal */}
                <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 ml-4">codenix_main_module.cpp</div>
                </div>
                
                {/* Cuerpo del Código */}
                <div className="p-6 font-mono text-sm sm:text-base text-left">
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">01</span>
                    <span className="text-pink-500">#include</span> <span className="text-orange-300">&lt;uni_talent.h&gt;</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">02</span>
                    <span><span className="text-blue-400">int</span> <span className="text-yellow-400">main</span>() {"{"} </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">03</span>
                    <span className="pl-4 text-blue-400">auto</span> students = <span className="text-yellow-400">getUNIElite</span>();
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">04</span>
                    <span><span className="pl-4 text-pink-500">while</span>(status == <span className="text-orange-400">"EVOLVING"</span>) {"{"} </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">05</span>
                    <span className="pl-8 text-green-400">codenix.push_limits(students);</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">06</span>
                    <span className="pl-4">{"}"}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">07</span>
                    <span className="pl-4 text-pink-500">return</span> <span className="text-sky-400">0</span>;
                  </div>
                  <div className="flex gap-4">
                    <span className="text-gray-600 select-none">08</span>
                    <span>{"}"}</span>
                  </div>
                  
                  {/* Cursor parpadeante */}
                  <div className="mt-4 flex gap-2 items-center">
                    <span className="text-orange-500">$</span>
                    <span className="text-gray-300 animate-pulse">_ initializing waitlist...</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent opacity-40"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}