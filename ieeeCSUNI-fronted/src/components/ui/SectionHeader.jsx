export function SectionLabel({ children }) {
  return (
    <div className="sec-label">
      <span>{children}</span>
    </div>
  )
}

/** Título con jerarquía clara */
export function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`font-black tracking-tight leading-[0.9] text-white ${className}`}
    >
      {children}
    </h2>
  )
}

