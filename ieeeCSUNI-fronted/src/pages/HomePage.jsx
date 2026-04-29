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
  Globe,
  ArrowRight,
  Zap,
  Network,
} from 'lucide-react'

const heroStats = [
  { number: '9', suffix: '+', label: 'Miembros activos' },
  { number: '1',  suffix: '+', label: 'Eventos realizados' },
  { number: '1',   suffix: '°', label: 'Años de historia' },
  { number: '12',  suffix: 'k', label: 'Comunidad IEEE' },
]

const specializations = [
  {
    icon: Code2,
    tag: 'SWE',
    title: 'Software Engineering',
    desc: 'Arquitectura de sistemas, Backend avanzado y frameworks de producción.',
    accent: 'sky',
  },
  {
    icon: Cpu,
    tag: 'HW',
    title: 'Hardware & Embedded',
    desc: 'IoT, Robótica de bajo nivel y sistemas en tiempo real.',
    accent: 'skt',
  },
  {
    icon: Terminal,
    tag: 'CP',
    title: 'Competitive Programming',
    desc: 'Algoritmos Avanzados, ICPC e IEEE Xtreme.',
    accent: 'sky',
  },
  {
    icon: Network,
    tag: 'NET',
    title: 'Networking',
    desc: 'Protocolos, Enrutamiento, Cisco CCNA y Seguridad de Redes.',
    accent: 'sky',
  },
]

//  ─── Sub-componentes locales ───────────────────────────────────

/** Badege pequeño tipo pill - solo borde, sin color de fondo */
function Badge({ children }){
  return (
    <span 
    className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono font-medium tracking-widest text-gray-400 uppercase'>
      {children}
    </span>
  )
}

/** Separador de sección con label opcional */
function Divider( { label}) {
  return (
    <div className='flex items-center gap-4 mb-6'>
      <div className='h-px flex-1 bg-white/5' />
      {label && (
        <span 
          className='text-[10px] font-mono tracking-[0.25em] text-gray-600 uppercase'
        >{label}  </span>
      )}
      <div className='h-px flex-1 bg-white/5' />
    </div>
  )
}

/** Card de especialización — horizontal pill con icono y texto */
function SpecCard({ icon: Icon, tag, title, desc, index }) {
  return (
    <div
      className="group flex gap-6 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.015]
                 hover:border-sky-500/25 hover:bg-sky-500/[0.03] transition-all duration-300"
    >
      {/* Número de índice — funciona como ancla visual */}
      <div className="flex-shrink-0 font-mono text-[10px] text-gray-700 pt-1 w-5 text-right select-none">
        {String(index + 1).padStart(2, '0')}
      </div>
 
      {/* Icono */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/10
                      flex items-center justify-center text-sky-400
                      group-hover:bg-sky-500/15 group-hover:border-sky-500/30 transition-all">
        <Icon className="w-4 h-4" />
      </div>
 
      {/* Texto */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-[9px] text-sky-500/60 uppercase tracking-widest">{tag}</span>
        </div>
        <h4 className="font-bold text-sm text-white mb-1 leading-snug">{title}</h4>
        <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

// ─── Componente principal ──────────────────────────────────────

export default function HomePage() {
  useScrollReveal()
 
  return (
    <main className="pt-16 bg-[#020617] text-white">
      <section className="relative min-h-[92vh] flex items-center px-6 md:px-20 overflow-hidden">
 
        {/* Dot grid — mucho más refinado que un orb genérico */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Vignette para que el grid se desvanezca en los bordes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-[#020617]/80 pointer-events-none" />
 
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16 items-center py-24">
 
          {/* ── Columna izquierda: copy ── */}
          <div className="reveal">
            <Badge>Universidad Nacional de Ingeniería · Lima, Perú</Badge>
 
            {/* 
              El headline ahora tiene tres niveles claros:
              - "Computer Society" = marca principal, mayor impacto
              - "IEEE CS UNI" = subtexto técnico / institucional
              El tamaño es ligeramente más contenido para no pelear
              con el peso del layout.
            */}
            <h1 className="mt-6 font-black tracking-tighter leading-[0.85] text-[clamp(56px,7.5vw,88px)]">
              <span className="text-white">Computer</span>
              <br />
              <span
                className="text-sky-500"
                style={{ WebkitTextStroke: '0px' }}
              >
                Society
              </span>
              <span className="text-white/[0.12] italic font-black ml-4 text-[0.6em] align-baseline">
                IEEE · UNI
              </span>
            </h1>
 
            {/* Línea decorativa — respira antes del cuerpo */}
            <div className="mt-8 mb-6 flex items-center gap-4">
              <div className="w-8 h-px bg-sky-500" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase">
                Est. 2025 · Lima, Perú
              </span>
            </div>
 
            <p className="max-w-md text-base text-gray-400 leading-relaxed mb-10">
              Impulsamos el estándar de la ingeniería en computación. No solo
              estudiamos tecnología —&nbsp;<span className="text-white">la construimos desde la base.</span>
            </p>
 
            {/* CTAs: primario sólido, secundario ghost limpio */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contacto"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm
                           bg-sky-500 hover:bg-sky-400 text-white
                           transition-all duration-200
                           shadow-[0_0_0_0_rgba(14,165,233,0.4)]
                           hover:shadow-[0_0_24px_rgba(14,165,233,0.35)]"
              >
                Únete ahora
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/proyectos"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10
                           hover:border-white/20 hover:bg-white/[0.04]
                           rounded-xl font-bold text-sm transition-all duration-200"
              >
                Ver proyectos
              </Link>
            </div>
          </div>
 
          {/* ── Columna derecha: foto ── */}
          <div className="reveal reveal-delay-2 relative">
            {/*
              Simplificamos los bordes decorativos.
              Antes había 4 capas de efectos peleando;
              ahora tenemos UN borde sutil + UN corner accent.
              El hover effect se vuelve el protagonista.
            */}
            <div className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
 
              {/* Borde exterior único, limpio */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10
                              group-hover:ring-sky-500/40 transition-all duration-500 z-20 pointer-events-none" />
 
              {/* Corner accent — solo superior derecha */}
              <div className="absolute top-0 right-0 w-16 h-16 z-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px bg-sky-400/50" />
                <div className="absolute top-0 right-0 h-full w-px bg-sky-400/50" />
              </div>
 
              <img
                src={JuntaDirectiva}
                alt="Equipo IEEE CS UNI"
                className="w-full h-full object-cover
                           grayscale group-hover:grayscale-0
                           scale-100 group-hover:scale-[1.03]
                           transition-all duration-700 ease-out"
              />
 
              {/* Overlay gradient bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent z-10" />
 
              {/* Badge limpio — sin fondo opaco */}
              <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2
                              bg-black/50 backdrop-blur-md border border-white/10
                              px-3.5 py-2 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[11px] font-mono font-medium tracking-widest text-white/70 uppercase">
                  Active Core 2026
                </span>
              </div>
            </div>
          </div>
 
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════
          STATS BAR
          Rediseñado como strip horizontal editorial.
          Grandes numerales con separadores finos —
          mucho más Vercel que "university dashboard".
      ══════════════════════════════════════════════ */}
      <div className="border-y border-white/[0.06] bg-white/[0.015] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className={`py-10 px-8 flex flex-col gap-2
                  ${i < heroStats.length - 1 ? 'border-r border-white/[0.06]' : ''}
                  ${i < 2 ? 'border-b md:border-b-0 border-white/[0.06]' : ''}
                `}
              >
                {/* Numeral grande — este es el protagonista */}
                <div className="font-black text-4xl md:text-5xl tracking-tight text-white leading-none">
                  {stat.number}
                  <span className="text-sky-500 text-3xl">{stat.suffix}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* ══════════════════════════════════════════════
          MISIÓN & VISIÓN
          Eliminé la mascota de aquí — distrae y baja
          la percepción de profesionalismo.
          Ahora es una sección 50/50 editorial limpia
          con un accent vertical en el borde izquierdo.
      ══════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
 
          {/* Columna izquierda: Intro copy */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-px h-16 bg-sky-500" />
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-sky-500/60 uppercase block">
                  Sobre el capítulo
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-gray-700 uppercase">
                  IEEE Computer Society · UNI
                </span>
              </div>
            </div>
 
            <SectionTitle className="text-5xl md:text-6xl mb-8">
              Elevando el ADN<br />
              tecnológico<br />
              <span className="text-white/20 italic">de la UNI.</span>
            </SectionTitle>
 
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Somos el capítulo estudiantil de IEEE Computer Society en la
              Universidad Nacional de Ingeniería. Conectamos el rigor
              académico con la práctica real de la ingeniería de software.
            </p>
          </div>
 
          {/* Columna derecha: Misión + Visión como pares de info */}
          <div className="reveal reveal-delay-1 space-y-6 pt-2 lg:pt-24">
            {/* Misión */}
            <div className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                            hover:border-sky-500/20 hover:bg-sky-500/[0.02] transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/10
                                flex items-center justify-center flex-shrink-0
                                group-hover:bg-sky-500/15 group-hover:border-sky-500/30 transition-all">
                  <Target className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-2 tracking-tight">Nuestra Misión</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Fomentar la excelencia técnica y el liderazgo profesional a través
                    de la investigación aplicada y el desarrollo de proyectos disruptivos.
                  </p>
                </div>
              </div>
            </div>
 
            {/* Visión */}
            <div className="group p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                            hover:border-sky-500/20 hover:bg-sky-500/[0.02] transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/10
                                flex items-center justify-center flex-shrink-0
                                group-hover:bg-sky-500/15 group-hover:border-sky-500/30 transition-all">
                  <Eye className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-2 tracking-tight">Nuestra Visión</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Ser el referente tecnológico estudiantil líder en el Perú, conectando
                    el talento de la UNI con la industria global.
                  </p>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════
          MASCOTA — Sección propia, contenida y playful
          La sacamos de "misión" para que no choque
          con el tono serio. Aquí tiene contexto:
          es un momento de "personalidad del equipo".
      ══════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-20 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="relative flex-shrink-0">
            <img
              src={MascotaImg}
              alt="Mascota CS"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
              style={{ filter: 'drop-shadow(0 0 16px rgba(234,88,12,0.25))' }}
            />
          </div>
          <div className="text-center md:text-left">
            <span className="font-mono text-[10px] tracking-[0.3em] text-orange-500/50 uppercase">
              Mascota Oficial
            </span>
            <h3 className="font-bold text-xl text-white mt-1 mb-2">
              El espíritu del capítulo
            </h3>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              Detrás de cada commit, cada algoritmo y cada evento, hay un equipo que devolvió vida a este capítulo. Nuestro fénix representa ese renacer: la resiliencia de reconstruir, la pasión por innovar y la determinación de volver más fuertes que antes.
            </p>
          </div>
        </div>
      </section>
 
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
 
          {/* Header de sección — alineado a la izquierda, más editorial */}
          <div className="reveal mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Badge>Ecosistema</Badge>
              <SectionTitle className="mt-4 text-5xl md:text-6xl">
                Áreas de<br />Especialización
              </SectionTitle>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed md:text-right">
              Cuatro ramas técnicas donde nuestros miembros
              desarrollan expertise de nivel industria.
            </p>
          </div>
 
          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal">
            {specializations.map((item, i) => (
              <SpecCard key={i} {...item} index={i} />
            ))}
          </div>
 
        </div>
      </section>

      <section className="relative py-40 px-6 md:px-20 overflow-hidden">
 
        {/* 
          Fondo: grid ortogonal estático, muy sutil.
          Mucho más sofisticado que el marquee binario.
          Da sensación de "blueprint técnico" sin gritar
          porque se veía pesada la versión anterior, creo que
          la había hecho muy llena ah, próxima generación solo
          intenten hacer modificaciones sin añadir muchos efectos
          hover; algo liviano, simple y que proyecte identidad es mucho
          mejor.
        */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />
 
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
 
            {/* ── Copy ── */}
            <div className="reveal">
              {/*
                El pill de status antes tenía ping + texto
                muy largo. Ahora: simple, legible, breath.
              */}
              <div className="inline-flex items-center gap-2 mb-8
                              px-3 py-1.5 rounded-full
                              border border-orange-500/20 bg-orange-500/5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-orange-500/70 uppercase">
                  Initializing · Phase 0
                </span>
              </div>
 
              <SectionTitle className="text-7xl md:text-8xl mb-6">
                CODE<span className="text-orange-500">NIX</span>
              </SectionTitle>
 
              <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
                Nuestra propia forja de código. Una plataforma de{' '}
                <span className="text-white font-semibold">IEEE CS UNI</span> para
                centralizar el entrenamiento en algoritmos y elevar el nivel
                competitivo del capítulo desde la base.
              </p>
 
              {/* Tags de temas — más limpios, sin #prefix redundante */}
              <div className="flex flex-wrap gap-2 mb-10">
                {['Dynamic Programming', 'Graph Theory', 'Bitmask', 'Segment Trees'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-orange-400/50 border border-orange-500/15
                               bg-orange-500/[0.04] px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
 
              {/* Metadata del estado real */}
              <div className="space-y-4">
                {/* Barra de progreso — honesta, sin drama */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
                      Build progress
                    </span>
                    <span className="font-mono text-[10px] text-orange-500/60">1%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_8px_rgba(234,88,12,0.5)]"
                      style={{ width: '1%' }}
                    />
                  </div>
                </div>
 
                <div className="h-px w-full bg-white/[0.04]" />
 
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span className="font-mono text-[10px] text-gray-700 uppercase tracking-widest">
                    Access: Core members only
                  </span>
                </div>
              </div>
            </div>
 
            {/* ── Terminal ── */}
            <div className="reveal reveal-delay-2 relative group">
              {/*
                El glow ahora es un elemento posicionado
                de forma más precisa. Antes era -inset-1
                demasiado agresivo. Ahora es sutil.
              */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
                              bg-gradient-to-br from-orange-500/20 to-sky-500/20
                              blur-md transition-opacity duration-700 pointer-events-none" />
 
              <div className="relative bg-[#080f1e] border border-white/[0.08] rounded-2xl
                              overflow-hidden shadow-2xl">
 
                {/* Header del terminal */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-600 ml-2">
                    codenix_core.cpp
                  </span>
                  {/* Status indicator a la derecha */}
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="font-mono text-[9px] text-orange-500/50">BUILDING</span>
                  </div>
                </div>
 
                {/* Código */}
                <div className="p-6 font-mono text-sm space-y-1">
                  <CodeLine num="01" tokens={[
                    { t: '#include', c: 'text-pink-400' },
                    { t: ' <uni_talent.h>', c: 'text-orange-300' },
                  ]} />
                  <CodeLine num="02" tokens={[{ t: '', c: '' }]} />
                  <CodeLine num="03" tokens={[
                    { t: 'int', c: 'text-blue-400' },
                    { t: ' main', c: 'text-yellow-400' },
                    { t: '() {', c: 'text-white/60' },
                  ]} />
                  <CodeLine num="04" tokens={[
                    { t: '  auto ', c: 'text-blue-400' },
                    { t: 'students', c: 'text-white' },
                    { t: ' = ', c: 'text-white/40' },
                    { t: 'getUNIElite', c: 'text-yellow-400' },
                    { t: '();', c: 'text-white/40' },
                  ]} />
                  <CodeLine num="05" tokens={[{ t: '', c: '' }]} />
                  <CodeLine num="06" tokens={[
                    { t: '  while', c: 'text-pink-400' },
                    { t: '(status == ', c: 'text-white/60' },
                    { t: '"EVOLVING"', c: 'text-orange-300' },
                    { t: ') {', c: 'text-white/60' },
                  ]} />
                  <CodeLine num="07" tokens={[
                    { t: '    codenix', c: 'text-green-400' },
                    { t: '.push_limits(', c: 'text-white/60' },
                    { t: 'students', c: 'text-white' },
                    { t: ');', c: 'text-white/60' },
                  ]} />
                  <CodeLine num="08" tokens={[{ t: '  }', c: 'text-white/60' }]} />
                  <CodeLine num="09" tokens={[
                    { t: '  return ', c: 'text-pink-400' },
                    { t: '0', c: 'text-sky-400' },
                    { t: ';', c: 'text-white/60' },
                  ]} />
                  <CodeLine num="10" tokens={[{ t: '}', c: 'text-white/60' }]} />
 
                  {/* Prompt */}
                  <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                    <span className="text-orange-500 font-bold">$</span>
                    <span className="text-gray-500 text-xs">initializing waitlist</span>
                    <span className="w-1.5 h-4 bg-gray-500 animate-pulse rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
 
          </div>
        </div>
      </section>
 
    </main>
  )
}
 
// ─── Helper: línea de código ───────────────────────────────────
 
/**
 * Renderiza una línea del terminal con número y tokens coloreados.
 * Extraer esto como componente local evita repetir el flex layout.
 */
function CodeLine({ num, tokens }) {
  return (
    <div className="flex gap-4">
      <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">{num}</span>
      <span>
        {tokens.map((token, i) => (
          <span key={i} className={token.c}>{token.t}</span>
        ))}
      </span>
    </div>
  )
}