import { useScrollReveal } from '../hooks/useScrollReveal'
import { timeline } from '../data'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import mascotaImg from '../../public/mascotaWhos.png'
import FebreroTime from '../../public/febrero2026.jpg'

import { 
  Target, 
  Cpu, 
  Globe, 
  Zap, 
  Users, 
  Code2, 
  Lightbulb, 
  Image as ImageIcon,
  Terminal
} from 'lucide-react'

const pillars = [
  { icon: <Target className="w-6 h-6 text-sky-400" />, title: 'Visión 2026', desc: 'Liderar la vanguardia técnica estudiantil en computación a nivel regional.' },
  { icon: <Globe className="w-6 h-6 text-blue-500" />, title: 'Red Global', desc: 'Conexión directa con los estándares y profesionales de IEEE Computer Society.' },
  { icon: <Cpu className="w-6 h-6 text-cyan-400" />, title: 'I+D+i UNI', desc: 'Fomentar la investigación y desarrollo desde las aulas de nuestra facultad.' },
  { icon: <Terminal className="w-6 h-6 text-indigo-400" />, title: 'Full-Stack Mindset', desc: 'Dominio de tecnologías emergentes, desde hardware hasta la nube.' },
]

export default function NosotrosPage() {
  useScrollReveal()

  return (
    <main className="pt-16">
      {/* Hero con espacio para Mascota */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden"
        style={{ minHeight: '70vh', paddingTop: 80, paddingBottom: 60 }}
      >
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
              style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)' }} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div>
            <HeroTag>IEEE Computer Society · UNI</HeroTag>
            <h1
              className="font-black leading-[.92] tracking-[-0.03em] mb-7"
              style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
            >
              <span style={{ color: 'var(--fg)' }}>Quiénes</span>
              <span className="block" style={{ color: 'var(--c1)' }}>somos.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--fg2)' }}>
              El capítulo estudiantil de computación más influyente de la UNI. 
              Transformamos el entusiasmo académico en capacidad técnica profesional.
            </p>
          </div>

          {/* ESPACIO PARA LA MASCOTA */}
          <div className="relative flex justify-center items-center aspect-square w-full max-w-[380px] select-none">

            <img 
              src={mascotaImg} 
              alt="Mascota del capítulo codeando para revivirlo jajajaj"
              className="relative max-w-[480x] h-full object-contain p-6 z-10 drop-shadow-[0_0_8px_rgba(0,180,255,0.7)]"
            />
            <div className="absolute -z-10 w-64 h-64 bg-sky-500/10 blur-[480px] rounded-full" />
            <img 
              src={mascotaImg} 
              alt="" 
              className="absolute max-w-[480px] h-full object-contain p-6 text-cyan-500 mix-blend-screen opacity-70 animate-glitch-agresivo z-0"
              style={{ filter: 'drop-shadow(0 0 5px currentColor)', translate: '-2px 1px', '--delay': '0.2s' }}
            />
            <img 
              src={mascotaImg} 
              alt="" 
              className="absolute max-w-[480px] h-full object-contain p-6 text-magenta-500 mix-blend-screen opacity-70 animate-glitch-agresivo z-0"
              style={{ filter: 'drop-shadow(0 0 5px currentColor)', translate: '2px -1px', '--delay': '0.4s' }}
            />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80 animate-scan-agresivo z-20 pointer-events-none" />
            <div className="absolute -z-10 w-64 h-64 bg-sky-600/10 blur-[90px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Misión y Pilares */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <SectionLabel>Misión</SectionLabel>
            <SectionTitle className="reveal mb-6">
              Ingeniería,<br />comunidad<br />e innovación.
            </SectionTitle>
            <p className="text-base leading-[1.8] mb-4" style={{ color: 'var(--fg2)' }}>
              Somos el núcleo de la **IEEE Computer Society** en la UNI. Nuestra misión es empoderar 
              a los estudiantes mediante el acceso a conocimiento técnico de élite y proyectos colaborativos.
            </p>
            <div className="flex gap-4 mt-8">
               <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 font-mono text-xs">#CS_UNI</div>
               <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 font-mono text-xs">#IEEE_Org</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div key={p.title} className={`card-base p-6 reveal reveal-delay-${i + 1} hover:border-sky-500/30 transition-all`}>
                <div className="mb-4">{p.icon}</div>
                <h4 className="font-bold mb-1.5 text-[15px]">{p.title}</h4>
                <p className="text-[13px] leading-relaxed opacity-70" style={{ color: 'var(--fg2)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,80,120,0.1), transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Valores</SectionLabel>
          <SectionTitle className="reveal mb-10">Código que nos guía.</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: 'Excelencia técnica', desc: 'No solo resolvemos problemas, buscamos la solución más eficiente y elegante.' },
              { icon: <Users className="w-8 h-8 text-sky-400" />, title: 'Colaboración', desc: 'El conocimiento se multiplica cuando se comparte. Somos una comunidad, no una competencia.' },
              { icon: <Lightbulb className="w-8 h-8 text-green-400" />, title: 'Crecimiento', desc: 'Adaptabilidad ante el cambio tecnológico constante. El aprendizaje es nuestro estado base.' },
            ].map((v, i) => (
              <div key={v.title} className={`card-base p-8 reveal reveal-delay-${i + 1}`}>
                <div className="mb-6">{v.icon}</div>
                <h4 className="font-bold text-lg mb-3">{v.title}</h4>
                <p className="text-sm leading-relaxed opacity-70" style={{ color: 'var(--fg2)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia con espacio para fotos */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Historia</SectionLabel>
          <SectionTitle className="reveal mb-12">Nuestra trayectoria.</SectionTitle>

          <div className="relative" style={{ paddingLeft: 32 }}>
            <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, var(--c1), var(--c3), transparent)' }} />

            {timeline.map((item, i) => (
              <div key={item.year} className={`relative pb-20 reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="absolute flex items-center justify-center" style={{ left: -37, top: 4, width: 20, height: 20, borderRadius: '50%', background: 'var(--b)', border: '2px solid var(--c1)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--c1)' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8">
                  <div>
                    <div className="font-mono text-[11px] tracking-[.1em] mb-1.5 text-sky-400">{item.year}</div>
                    <div className="text-xl font-bold mb-2">{item.title}</div>
                    <div className="text-sm leading-relaxed opacity-70 mb-4" style={{ color: 'var(--fg2)' }}>{item.desc}</div>
                  </div>
                  
                  <div className="relative w-44 h-28 shrink-0 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden group">
                    <img 
                      src={FebreroTime} 
                      alt="Trayectoria IEEE CS UNI"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay sutil solo para dar contraste al texto de al lado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}