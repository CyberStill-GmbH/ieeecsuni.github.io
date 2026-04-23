import { useState } from 'react'
import { Mail, Check, ExternalLink, Instagram, Linkedin, Github } from 'lucide-react'

export function MemberCard({ member }) {
  const { initials, name, role, bio, gradient, email, photo, social } = member
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    if (!email) return
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group p-[1px] rounded-[2.5rem] bg-white/5 hover:bg-gradient-to-br hover:from-sky-500 hover:to-purple-600 transition-all duration-700">
      
      {/* Contenedor Principal */}
      <div className="bg-[#030712] rounded-[2.4rem] p-6 text-center h-full flex flex-col items-center relative overflow-hidden">
        
        {/* Efecto de Escaneo Láser Vertical */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-sky-400 shadow-[0_0_20px_#0ea5e9] animate-scan-agresivo" />
        </div>

        {/* Contenedor de Imagen/Avatar */}
        <div className="relative w-full aspect-square max-w-[180px] mb-6 px-2">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-white/5 group-hover:border-sky-500/50 transition-colors duration-500 shadow-2xl">
            
            {photo ? (
              <>
                {/* Imagen con filtro de color sutil que se limpia al hover */}
                <img 
                  src={photo} 
                  alt={name} 
                  className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                {/* Overlay de gradiente sobre la foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
              </>
            ) : (
              /* Fallback si no hay foto */
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ background: gradient }}
              >
                <span className="text-4xl font-black text-white">{initials}</span>
              </div>
            )}
          </div>
          
          {/* Badge de "Status" en la esquina de la foto */}
          <div className="absolute -bottom-2 -right-1 bg-sky-600 text-[8px] font-black px-3 py-1 rounded-lg shadow-lg border border-sky-400 z-10">
            UNI_CERTIFIED
          </div>
        </div>

        {/* Info del Integrante */}
        <div className="mb-4">
          <h3 className="text-xl font-black text-white leading-tight mb-1 group-hover:text-sky-400 transition-colors">
            {name}
          </h3>
          <p className="font-mono text-[10px] tracking-[0.2em] text-sky-500 uppercase font-bold">
            {role}
          </p>
        </div>

        {/* Bio con estilo de terminal */}
        <div className="relative mb-6 flex-1">
          <p className="text-[11px] leading-relaxed text-gray-500 italic px-4">
            <span className="text-sky-500/50 mr-1 font-mono"> {">"} </span>
            {bio}
          </p>
        </div>

        {/* Redes Sociales Rápidas */}
        <div className="flex gap-4 mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
            <Github size={16} className="cursor-pointer hover:text-white" />
            <Linkedin size={16} className="cursor-pointer hover:text-sky-400" />
            <Instagram size={16} className="cursor-pointer hover:text-pink-500" />
        </div>

        {/* Botón de Contacto Interactivo */}
        <button 
          onClick={handleCopyEmail}
          className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 border ${
            copied 
            ? 'bg-green-600 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-sky-600 hover:border-sky-400'
          }`}
        >
          {copied ? (
            <>
              <Check size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Copiado al portapapeles</span>
            </>
          ) : (
            <>
              <Mail size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Obtener Gmail</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}