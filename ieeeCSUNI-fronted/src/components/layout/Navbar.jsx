import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { useAuth } from '../../context/AuthContext'
import { navLinks } from '../../data'

export function Navbar() {
  const { user, logout } = useAuth()
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

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  //-----Eliminar navbar al entrar al login-form------
  
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] h-16 flex items-center justify-between px-10 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,15,28,0.98)' : 'rgba(10,15,28,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Brand */}
        <Link 
          to="/" 
          className="flex items-center gap-3 no-underline group"
          onClick={() => window.scrollTo(0, 0)}
          >
          <IEEECSLogo size={36} />
          <div>
            <div className="text-[13px] font-bold" style={{ color: 'var(--fg)', lineHeight: 1.2 }}>
              IEEE Computer Society
            </div>
            <div
              className="font-mono text-[10px] tracking-[.12em] uppercase"
              style={{ color: 'var(--fg3)' }}
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
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 no-underline"
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
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              background: 'var(--fg2)',
              transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
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
