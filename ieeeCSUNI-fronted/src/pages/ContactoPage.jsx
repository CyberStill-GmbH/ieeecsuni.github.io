import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { HeroTag, Orb } from '../components/ui/HeroElements'
import { SectionLabel, SectionTitle } from '../components/ui/SectionHeader'
import mascotaUniImg from '../../public/mascotaUNI.png'
import { 
  Mail, MapPin, Clock, Linkedin, Instagram, Github, 
  MessageSquare, Send, Loader2, ChevronRight,
  UserPlus, Calendar, GraduationCap, Sparkles
} from 'lucide-react'

export default function ContactoPage() {
  useScrollReveal()
  const { showToast } = useToast()
  
  // Tab activa para los formularios secundarios
  const [activeTab, setActiveTab] = useState('miembro') 
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({ 
    nombre: '', email: '', carrera: '', ciclo: '', 
    tipoEvento: '', fechaProbable: '', areaExperticia: '', mensaje: '' 
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) 
      showToast(`✓ Solicitud enviada correctamente.`)
      setForm({ nombre: '', email: '', carrera: '', ciclo: '', tipoEvento: '', fechaProbable: '', areaExperticia: '', mensaje: '' })
    } catch (error) {
      showToast('× Error al procesar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-16 bg-[#020617] text-white min-h-screen">
      {/* ── HERO CON LA MASCOTA UNI ── */}
      <section className="relative px-10 md:px-20 overflow-hidden min-h-[50vh] pt-20 pb-16 flex items-center border-b border-white/5">
        <Orb className="top-[-200px] right-[-100px] w-[600px] h-[600px]"
             style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15), transparent 70%)' }} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <HeroTag>Join the Community</HeroTag>
            <h1 className="font-black leading-[.92] tracking-[-0.03em] mb-7 text-[clamp(42px,6vw,80px)]">
              <span>Haz crecer tu</span><br />
              <span className="text-sky-500">potencial.</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-400">
              Únete al capítulo que está redefiniendo la computación en la UNI. 
              Buscamos mentes curiosas, desde sistemas hasta ciberseguridad.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end reveal">
            <img src={mascotaUniImg} alt="Mascota UNI" className="fenix-uni w-full max-w-[380px] object-contain select-none" />
          </div>
        </div>
      </section>

      {/* ── SECCIÓN PRINCIPAL: FORMULARIOS + SIDEBAR ── */}
      <section className="py-24 px-10 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
          
          <div className="flex flex-col gap-12">
            {/* TABS SELECTOR */}
            <div className="flex flex-wrap gap-4 border-b border-white/5 pb-6 reveal">
              {[
                { id: 'miembro', label: 'Ser Miembro', icon: <UserPlus className="w-4 h-4" /> },
                { id: 'evento', label: 'Proponer Evento', icon: <Calendar className="w-4 h-4" /> },
                { id: 'mentor', label: 'Ser Mentor', icon: <GraduationCap className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === tab.id 
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/40 translate-y-[-2px]' 
                    : 'bg-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* FORMULARIO DINÁMICO */}
            <div className="reveal">
              <SectionLabel>Inscripción / Propuesta</SectionLabel>
              <SectionTitle className="mb-8">
                {activeTab === 'miembro' && "Envía tu solicitud de miembro"}
                {activeTab === 'evento' && "Propón una nueva iniciativa"}
                {activeTab === 'mentor' && "Postula como mentor guía"}
              </SectionTitle>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                {/* Nombre y Correo (Siempre visibles) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Nombre Completo</label>
                    <input name="nombre" className="bg-[#020617] border border-white/10 p-4 rounded-xl focus:border-sky-500/50 outline-none transition-all" type="text" placeholder="Ej. César Adrian" required value={form.nombre} onChange={handleChange} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Correo Institucional</label>
                    <input name="email" className="bg-[#020617] border border-white/10 p-4 rounded-xl focus:border-sky-500/50 outline-none transition-all" type="email" placeholder="usuario@uni.edu.pe" required value={form.email} onChange={handleChange} />
                  </div>
                </div>

                {/* Renderizado Condicional por Tab */}
                {activeTab === 'miembro' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Carrera</label>
                      <select name="carrera" className="bg-[#020617] border border-white/10 p-4 rounded-xl outline-none" required value={form.carrera} onChange={handleChange}>
                        <option value="">Selecciona carrera</option>
                        <option>Ingeniería de Ciberseguridad</option>
                        <option>Ingeniería de Sistemas</option>
                        <option>Ingeniería de Software</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Ciclo Académico</label>
                      <select name="ciclo" className="bg-[#020617] border border-white/10 p-4 rounded-xl outline-none" required value={form.ciclo} onChange={handleChange}>
                        <option value="">Selecciona ciclo</option>
                        {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}° Ciclo</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'evento' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Tipo de Evento</label>
                      <select name="tipoEvento" className="bg-[#020617] border border-white/10 p-4 rounded-xl outline-none" value={form.tipoEvento} onChange={handleChange}>
                        <option>Workshop Técnico</option>
                        <option>Charla / Webinar</option>
                        <option>CTF / Competencia</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Fecha Tentativa</label>
                      <input name="fechaProbable" type="date" className="bg-[#020617] border border-white/10 p-4 rounded-xl outline-none text-gray-400" value={form.fechaProbable} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {activeTab === 'mentor' && (
                  <div className="flex flex-col gap-2 animate-in zoom-in-95 duration-500">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Área de Especialidad</label>
                    <input name="areaExperticia" className="bg-[#020617] border border-white/10 p-4 rounded-xl outline-none" placeholder="Ej: Cloud, Forensics, Web Dev..." value={form.areaExperticia} onChange={handleChange} />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Mensaje o Intereses</label>
                  <textarea name="mensaje" className="bg-[#020617] border border-white/10 p-4 rounded-xl min-h-[140px] resize-none outline-none focus:border-sky-500/50 transition-all" placeholder="Escribe aquí tus detalles..." value={form.mensaje} onChange={handleChange} />
                </div>

                <button type="submit" disabled={loading} className="bg-sky-600 hover:bg-sky-500 text-white font-black py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-sky-900/20">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Enviar Solicitud <Send className="w-4 h-4" /></>}
                </button>
              </form>
            </div>
          </div>

          {/* ── SIDEBAR (CANALES OFICIALES) ── */}
          <aside className="flex flex-col gap-8 reveal">
            {/* Info Cards */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-8">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-sky-400">
                <MessageSquare className="w-4 h-4" /> Canales Oficiales
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
                      <p className="text-[10px] uppercase tracking-tighter text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-white">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RRSS */}
            <div className="grid grid-cols-3 gap-3">
              {[<Linkedin />, <Instagram />, <Github />].map((icon, i) => (
                <a key={i} href="#" className="bg-white/5 border border-white/10 flex items-center justify-center p-4 rounded-2xl hover:border-sky-500/50 transition-all text-gray-400 hover:text-sky-400">
                  <div className="w-5 h-5">{icon}</div>
                </a>
              ))}
            </div>

            {/* FAQ resumida */}
            <div className="bg-sky-500/5 border border-sky-500/10 p-6 rounded-2xl">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-sky-500/50">FAQ Rápida</h5>
              <details className="group cursor-pointer">
                <summary className="text-[13px] font-medium flex items-center justify-between list-none text-gray-300">
                  ¿Es necesario ser de FIEE? <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">No, recibimos estudiantes de todas las facultades de la UNI interesados en computación.</p>
              </details>
            </div>
          </aside>

        </div>
      </section>
    </main>
  )
}