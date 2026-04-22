import { CalendarDays, MapPin, Zap, Users } from 'lucide-react'

export function EventCard({ event }) {
  const { type, title, date, time, location, description, tag, gradient, spotsLeft, spots } = event
  const isFull = spotsLeft === 0
  const urgency = spotsLeft > 0 && spotsLeft <= 5
  
  // Definimos el color de estado
  const spotsColor = isFull
    ? 'text-amber-400'
    : urgency
      ? 'text-amber-400'
      : 'var(--fg3)'

  return (
    <div className="card-base overflow-hidden group cursor-pointer hover:shadow-[0_16px_48px_rgba(0,130,200,0.15)]">
      <div className="p-6 relative overflow-hidden h-36 flex flex-col justify-end" style={{ background: gradient }}>
        <div className="absolute -top-4 -right-2 text-[120px] font-extrabold text-white/10 select-none leading-none tracking-tighter z-0">
          {type?.charAt(0)}
        </div>
        <div className="relative z-10">
          <span className='px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm tect-[10px] font-bold font-mono tracking-widest uppercase text-white border border-white/10'>
            {type}
          </span>
        </div>
        <h3 className="text-xl font-extrabold leading-tight text-white drop-shadow-md">{title}</h3>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg2)' }}>
            <CalendarDays className="w-4 h-4 text-sky-500" strokeWidth={2} />
            <span className='font-medium'>{date}{time ? ` · ${time}` : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg2)' }}>
            <MapPin className="w-4 h-4 text-sky-500" strokeWidth={2} />
            <span className='font-medium truncate'>{location}</span>
          </div>
        </div>
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--fg2)' }}>
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="inline-flex px-3 py-1 rounded-full text-[11px] font-mono"
            style={{ 
              background: 'rgba(0,200,255,0.08)', 
              border: '1px solid rgba(0,200,255,0.2)', 
              color: 'var(--c1)' 
            }}
          >
            {tag}
          </span>
          {spotsLeft !== undefined && (
            <div className={`flex items-center gap-1.5 text-[11px] font-bold font-mono ${spotsColor}`}>
                {isFull ? (
                  <>
                    <Users className='w-3.5 h-3.5' />
                    <span>LLENO</span>
                  </>
                ) : urgency ? (
                  <>
                    <Zap className='w-3.5 h-3.5 animate-pulse' />
                    <span>{spotsLeft} CUPOS</span>
                  </>
                ) : (
                  <>
                    <Users className='w-3.5 h-3.5 opacity-70' />
                    <span className='opacity-80'>{spotsLeft}/{spots} PLAZAS</span>
                  </>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}