import { useState, useRef, useCallback } from 'react'
import { Github, ArrowUpRight, ChevronLeft, ChevronRight, Users, ImageOff } from 'lucide-react'

/**
 * ProjectCard — IEEE CS UNI Design System
/* ── Fallback placeholder ── */
const PLACEHOLDER = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'

/* ── Avatar inicial ── */
const Avatar = ({ name, index }) => {
  const hues = [200, 220, 190, 210, 230]
  const hue = hues[index % hues.length]
  return (
    <div
      title={name}
      className="w-6 h-6 rounded-full border-2 border-[#030712] flex items-center justify-center text-[7px] font-black text-white select-none flex-shrink-0"
      style={{ background: `hsl(${hue}, 70%, 40%)` }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}
/* Project Card */
export default function ProjectCard({ project, onClick, index = 0 }) {
  const { title, description, tags, github, link, image, images, members, category } = project

  /* Normaliza a array de imágenes */
  const gallery = images?.length ? images : image ? [image] : [PLACEHOLDER]

  const [imgIdx, setImgIdx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(null)

  /* Navegar imágenes */
  const prev = useCallback((e) => {
    e.stopPropagation()
    setImgIdx(i => (i - 1 + gallery.length) % gallery.length)
  }, [gallery.length])

  const next = useCallback((e) => {
    e.stopPropagation()
    setImgIdx(i => (i + 1) % gallery.length)
  }, [gallery.length])

  /* Swipe touch/mouse */
  const onPointerDown = (e) => { dragStart.current = e.clientX; setIsDragging(false) }
  const onPointerMove = (e) => { if (dragStart.current !== null && Math.abs(e.clientX - dragStart.current) > 5) setIsDragging(true) }
  const onPointerUp = (e) => {
    if (dragStart.current === null) return
    const delta = e.clientX - dragStart.current
    if (Math.abs(delta) > 40) delta < 0 ? next(e) : prev(e)
    dragStart.current = null
  }

  const handleClick = () => { if (!isDragging) onClick?.() }

  const hasMultiple = gallery.length > 1

  return (
    <article
      onClick={handleClick}
      className="group relative flex flex-col bg-[#0b1120] border border-white/[0.07] rounded-[1.75rem] overflow-hidden cursor-pointer transition-all duration-300 hover:border-sky-500/30 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
    >
      {/* ── INDEX WATERMARK ── */}
      <span className="absolute top-3 left-5 z-20 text-[10px] font-black tracking-[0.2em] text-white/20 tabular-nums pointer-events-none select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ══ IMAGE CAROUSEL ══ */}
      <div
        className="relative h-52 overflow-hidden flex-shrink-0 select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${imgIdx * 100}%)`, width: `${gallery.length * 100}%` }}
        >
          {gallery.map((src, i) => (
            <div key={i} className="relative h-full flex-shrink-0" style={{ width: `${100 / gallery.length}%` }}>
              <img
                src={src}
                alt={`${title} — imagen ${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ filter: 'brightness(0.65) saturate(0.8)' }}
                onError={e => { e.currentTarget.src = PLACEHOLDER }}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/30 to-transparent pointer-events-none" />

        {/* Category badge */}
        {category && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-gray-300">
              {category}
            </span>
          </div>
        )}

        {/* ── Carousel controls (solo si hay > 1 imagen) ── */}
        {hasMultiple && (
          <>
            {/* Flechas — aparecen al hover */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-sky-600 hover:border-sky-500 active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-sky-600 hover:border-sky-500 active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i) }}
                  className={`rounded-full transition-all duration-300 ${
                    i === imgIdx
                      ? 'w-4 h-1.5 bg-sky-400'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[8px] font-black text-white/50 tabular-nums opacity-0 group-hover:opacity-100 transition-opacity">
              {imgIdx + 1} / {gallery.length}
            </span>
          </>
        )}

        {/* Arrow action (click to open modal) */}
        <div className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-sky-500/0 group-hover:bg-sky-500 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="flex flex-col flex-1 p-6">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-lg bg-sky-500/[0.08] border border-sky-500/20 text-sky-400 text-[8px] font-black uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
          {(tags?.length ?? 0) > 3 && (
            <span className="px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-500 text-[8px] font-black uppercase tracking-widest">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-black uppercase leading-tight text-white mb-2 group-hover:text-sky-100 transition-colors tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 flex-1 mb-5">
          {description}
        </p>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">

          {/* Member avatars */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {members?.slice(0, 4).map((m, i) => (
                <Avatar key={m} name={m} index={i} />
              ))}
              {(members?.length ?? 0) > 4 && (
                <div className="w-6 h-6 rounded-full bg-white/[0.08] border-2 border-[#030712] flex items-center justify-center text-[7px] font-bold text-gray-400">
                  +{members.length - 4}
                </div>
              )}
            </div>
            {members?.length > 0 && (
              <span className="text-[9px] text-gray-600 font-bold">{members.length} devs</span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all"
                title="Repositorio"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-sky-500/[0.1] border border-sky-500/20 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"
                title="Demo live"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  )
}