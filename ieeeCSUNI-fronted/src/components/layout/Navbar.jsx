import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { navLinks } from '../../data'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] h-16 flex items-center justify-between px-10 transition-all duration-300
          ${scrolled ? "bg-[#0a0f1c]/95 border-b border-white/10 backdrop-blur-md" : "bg-[#0a0f1c]/80 border-white/5 backdrop-blur-md"}`}
        
      >
        {/* Brand */}
        <Link 
          to="/" 
          className="flex items-center gap-3 no-underline group"
          onClick={() => window.scrollTo(0, 0)}
          >
          <IEEECSLogo size={36} />
          <div>
            <div 
              className="text-[13px] font-semibold text-white" 
            >
              IEEE Computer Society
            </div>
            <div
              className="text-[10px] tracking-[0.15em] uppercase text-gray-400"
            >
              UNI Student Chapter
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => window.scrollTo(0, 0)}
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 hover:bg-white/5 hover:scale-[1.03]"
                style={{
                  color: location.pathname === to ? 'var(--c1)' : 'var(--fg2)',
                  background: location.pathname === to ? 'rgba(0,170,255,0.08)' : 'transparent',
                  border: location.pathname === to ? '1px solid var(--border2)' : '1px solid transparent',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer border-none bg-transparent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span
            className={`fixed top-16 left-0 right-0 z-[199] md:hidden py-4 px-6 flex flex-col gap-1 transition-all duration-300 origin-top
              ${menuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              background: 'var(--fg2)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              background: 'var(--fg2)',
              transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-[199] md:hidden py-4 px-6 flex flex-col gap-1"
          style={{
            background: 'rgba(10,15,28,0.98)',
            borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => window.scrollTo(0, 0)}
              className="py-3 px-4 rounded-lg text-sm font-medium no-underline transition-all duration-200"
              style={{
                color: location.pathname === to ? 'var(--c1)' : 'var(--fg2)',
                background: location.pathname === to ? 'rgba(0,170,255,0.08)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
