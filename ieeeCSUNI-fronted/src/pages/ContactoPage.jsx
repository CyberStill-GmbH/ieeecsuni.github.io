import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import { 
  Mail, 
  MapPin, 
  Clock, 
  Linkedin, 
  Instagram, 
  Github, 
  MessageSquare, 
  Send,
  Loader2,
  ChevronRight
} from 'lucide-react'

export default function ContactoPage() {
  useScrollReveal()
  const { showToast } = useToast()
  
  // Estado inicial limpio para Laravel
  const [form, setForm] = useState({ 
    nombre: '', 
    email: '', 
    carrera: '', 
    ciclo: '', 
    mensaje: '' 
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Conexión a laravel:
      // const res = await fetch('api/v1/solicitud', { ... })
      
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación
      
      showToast('✓ Solicitud enviada correctamente.')
      setForm({ nombre: '', email: '', carrera: '', ciclo: '', mensaje: '' })
    } catch (error) {
      showToast('× Error al enviar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-16">
      <section className="relative flex flex-col justify-center px-10 md:px-20 overflow-hidden min-h-[45vh] pt-20 pb-16">
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
             style={{ background: 'radial-gradient(circle, rgba(0,180,255,0.1), transparent 70%)' }} />
        
        <div className="max-w-4xl">
          <HeroTag>Join the Community</HeroTag>
          <h1 className="font-black leading-[.92] tracking-[-0.03em] mb-7 text-[clamp(42px,6vw,80px)]">
            <span style={{ color: 'var(--fg)' }}>Haz crecer tu</span>
            <span className="block" style={{ color: 'var(--c1)' }}>potencial.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed opacity-80" style={{ color: 'var(--fg2)' }}>
            Únete al capítulo que está redefiniendo la computación en la UNI. 
            Buscamos mentes curiosas, desde sistemas hasta ciberseguridad.
          </p>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />

      <section className="py-24 px-10 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
          
          {/* Formulario */}
          <div className="reveal">
            <SectionLabel>Inscripción</SectionLabel>
            <SectionTitle className="mb-2">Envía tu solicitud.</SectionTitle>
            <p className="text-sm mb-10 opacity-70">Revisamos nuevas solicitudes cada semana.</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Nombre completo</label>
                  <input 
                    name="nombre"
                    className="field-input focus:border-sky-500/50 transition-all" 
                    type="text" 
                    placeholder="Ej. Cesar Adrian Guevara Salcedo" 
                    required 
                    value={form.nombre} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="group flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Correo institucional</label>
                  <input 
                    name="email"
                    className="field-input focus:border-sky-500/50 transition-all" 
                    type="email" 
                    placeholder="usuario@uni.edu.pe" 
                    required 
                    value={form.email} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Carrera</label>
                  <select name="carrera" className="field-input" required value={form.carrera} onChange={handleChange}>
                    <option value="">Selecciona carrera</option>
                    <option>Ingeniería de Ciberseguridad</option>
                    <option>Ingeniería de Sistemas</option>
                    <option>Ingeniería de Software</option>
                    <option>Ingeniería Electrónica</option>
                    <option>Otras facultades</option>
                  </select>
                </div>
                <div className="group flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Ciclo Académico</label>
                  <select name="ciclo" className="field-input" required value={form.ciclo} onChange={handleChange}>
                    <option value="">Selecciona ciclo</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}° Ciclo</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-widest opacity-60">Intereses o Mensaje</label>
                <textarea
                  name="mensaje"
                  className="field-input min-h-[120px] resize-none"
                  placeholder="¿En qué áreas te gustaría destacar? (Ej. CTFs, Web Dev, IA...)"
                  value={form.mensaje}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="btn-primary mt-4 flex items-center justify-center gap-3 py-4 px-8 w-full sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Enviar solicitud <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="flex flex-col gap-6">
            <div className="card-base p-8 border-sky-500/10 bg-sky-500/[0.02]">
              <h4 className="font-bold text-sm mb-6 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-500" /> Canales oficiales
              </h4>
              <div className="space-y-6">
                {[
                  { icon: <Mail />, label: 'Email', val: 'ieeecs@uni.edu.pe' },
                  { icon: <MapPin />, label: 'Ubicación', val: 'FIEE - UNI, Pabellón Q' },
                  { icon: <Clock />, label: 'Horario', val: 'Lun – Vie, 17:00 – 20:00' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-sky-500 w-5">{item.icon}</div>
                    <div>
                      <p className="text-[10px] uppercase tracking-tighter opacity-50 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium leading-tight">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RRSS con mejor UX */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Linkedin />, color: '#0077b5', href: '#' },
                { icon: <Instagram />, color: '#e4405f', href: '#' },
                { icon: <Github />, color: '#333', href: '#' },
              ].map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.href}
                  className="card-base flex items-center justify-center p-4 hover:border-sky-500/50 transition-all duration-300"
                >
                  <div className="w-5 h-5 opacity-70">{soc.icon}</div>
                </a>
              ))}
            </div>

            {/* FAQ resumida */}
            <div className="p-2">
              <h5 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-40">FAQ Rápida</h5>
              <div className="space-y-4">
                <details className="group cursor-pointer">
                  <summary className="text-[13px] font-medium flex items-center justify-between list-none">
                    ¿Cualquier carrera puede unirse? <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-[12px] opacity-60 mt-2 leading-relaxed">Sí, valoramos la multidisciplinariedad. Todos los estudiantes UNI son bienvenidos.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}