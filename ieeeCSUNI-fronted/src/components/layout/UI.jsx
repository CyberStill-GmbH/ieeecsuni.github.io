// src/components/layout/UI.jsx
// ============================================================
// Primitivas de UI compartidas entre todas las zonas.
// Importa lo que necesites:
//   import { GlassCard, StatCard, Badge, PageHeader } from '../layout/UI'
// ============================================================

// ── GlassCard ──────────────────────────────────────────────
// Contenedor principal glassmorphism
// Props: children, className, onClick, hover (bool)
export function GlassCard({ children, className = '', onClick, hover = false, style = {} }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl transition-all duration-200 ${hover ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        ...(hover ? {} : {}),
        ...style,
      }}
      onMouseEnter={hover ? e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'
      } : undefined}
      onMouseLeave={hover ? e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
      } : undefined}
    >
      {children}
    </div>
  )
}

// ── StatCard ───────────────────────────────────────────────
// Tarjeta de métrica (número grande + label + tendencia)
// Props: label, value, sublabel, accent ('blue'|'green'|'amber'|'red'), icon
const ACCENT_MAP = {
  blue:  { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.25)',  text: '#3b82f6' },
  green: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', text: '#4ade80' },
  amber: { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', text: '#fbbf24' },
  red:   { bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.25)',text: '#f87171' },
}

export function StatCard({ label, value, sublabel, accent = 'blue', icon }) {
  const a = ACCENT_MAP[accent] || ACCENT_MAP.blue
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </span>
        {icon && (
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold tracking-tight" style={{ color: '#e8edf5' }}>{value}</p>
      {sublabel && (
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{sublabel}</p>
      )}
    </GlassCard>
  )
}

// ── Badge ──────────────────────────────────────────────────
// Estados de solicitudes/tareas
// Props: status ('pending'|'in_progress'|'done'|'approved'|'rejected')
const STATUS_MAP = {
  pending:     { label: 'Pendiente',    bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', color: '#fbbf24' },
  in_progress: { label: 'En progreso',  bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.3)',  color: '#3b82f6' },
  done:        { label: 'Completado',   bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80' },
  approved:    { label: 'Aprobado',     bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', color: '#4ade80' },
  rejected:    { label: 'Rechazado',    bg: 'rgba(248,113,113,0.12)',border: 'rgba(248,113,113,0.25)',color: '#f87171' },
}

export function Badge({ status, customLabel }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0" style={{ background: s.color }} />
      {customLabel || s.label}
    </span>
  )
}

// ── PageHeader ─────────────────────────────────────────────
// Encabezado de página con título, subtítulo y slot de acción
// Props: title, subtitle, action (ReactNode)
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-7">
      <div>
        <p className="text-xs font-mono tracking-widest uppercase mb-1.5" style={{ color: 'rgba(59,130,246,0.8)' }}>
          // IEEE CS UNI
        </p>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#e8edf5' }}>{title}</h1>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ── PrimaryButton ──────────────────────────────────────────
export function PrimaryButton({ children, onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${className}`}
      style={{
        background: disabled ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.18)',
        color: disabled ? 'rgba(59,130,246,0.4)' : '#3b82f6',
        border: `1px solid ${disabled ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.35)'}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  )
}

// ── GhostButton ────────────────────────────────────────────
export function GhostButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${className}`}
      style={{
        background: 'transparent',
        color: 'rgba(255,255,255,0.45)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
    >
      {children}
    </button>
  )
}

// ── EmptyState ─────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="text-4xl mb-4 opacity-40">{icon}</div>}
      <h3 className="text-base font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{title}</h3>
      {description && <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>{description}</p>}
      {action}
    </div>
  )
}

// ── GlassInput ─────────────────────────────────────────────
export function GlassInput({ label, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#e8edf5',
          fontFamily: 'var(--font-sans)',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  )
}

export function GlassSelect({ label, value, onChange, options = [] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
        style={{
          background: 'rgba(10,15,30,0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#e8edf5',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
