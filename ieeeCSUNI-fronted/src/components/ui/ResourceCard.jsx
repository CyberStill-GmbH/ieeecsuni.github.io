import { Compass, ArrowUpRight, Calendar } from 'lucide-react'

export function ResourceCard({ resource }) {
  const { category, title, description, date, url, link } = resource

  return (
    <a 
      href={url || link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block h-full outline-none"
    >
      <div className="relative h-full bg-[#030712] border border-white/5 rounded-3xl p-7 transition-all duration-500 hover:border-sky-500/50 hover:bg-[#050a18] hover:-translate-y-2 flex flex-col shadow-2xl">
        
        {/* Header: Categoría e Indicador de Estado */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em]">
            {category}
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/5 border border-sky-500/10">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[9px] font-bold text-sky-400/80 uppercase tracking-tighter">Verified</span>
          </div>
        </div>

        {/* Cuerpo de la Card */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sky-400 transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-gray-500 text-[13px] leading-relaxed mb-8">
            {description || "Explora este recurso técnico seleccionado por el equipo de IEEE CS UNI para tu formación profesional."}
          </p>
        </div>

        {/* Footer: Fecha y Acción */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-400 transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono tracking-tight">{date}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-white transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest">Explorar</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Efecto de Glow en el Hover (Sutil) */}
        <div className="absolute inset-0 rounded-3xl bg-sky-500/0 group-hover:bg-sky-500/[0.02] transition-colors pointer-events-none" />
      </div>
    </a>
  )
}