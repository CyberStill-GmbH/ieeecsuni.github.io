import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { IEEECSLogo } from '../assets/IEEECSLogo'
import { Orb } from '../components/ui/HeroElements'
import { Mail, Lock, User, BookOpen, GraduationCap, ArrowRight, Loader2 } from 'lucide-react'

// --- BOTÓN DE GOOGLE (Componente reutilizable) ---
const GoogleButton = ({ onClick, text }) => (
  <button 
    type="button"
    onClick={onClick}
    className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
  >
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.712s.102-1.173.282-1.712V4.956H.957a8.996 8.996 0 000 8.088l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.454 0 2.38 2.05 1.252 5.044L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
    </svg>
    <span className="text-sm">{text} con Google</span>
  </button>
)

// --- LOGIN FORM ---
function LoginForm({ onSuccess }) {
  const { login } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    
    try {
      // Llamada real a Sanctum (login)
      const user = await login(form) 
      showToast('✓ Sesión iniciada correctamente.')
      onSuccess(user.role === 'admin' ? '/admin' : '/user')
    } catch (err) {
      // Manejo de errores de Laravel Sanctum
      setErrors(err.response?.data?.errors || { general: [err.message] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 text-center">{errors.general}</div>}
      
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-sky-500 transition-colors" />
        <input 
          name="email" type="email" placeholder="Correo Institucional" required 
          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-sky-500/50 outline-none transition-all"
          onChange={e => setForm({...form, email: e.target.value})}
        />
        {errors.email && <span className="text-[10px] text-red-500 mt-1 ml-2">{errors.email[0]}</span>}
      </div>

      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-sky-500 transition-colors" />
        <input 
          name="password" type="password" placeholder="Contraseña" required 
          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-sky-500/50 outline-none transition-all"
          onChange={e => setForm({...form, password: e.target.value})}
        />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-sky-600 hover:bg-sky-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Ingresar al Sistema <ArrowRight size={16}/></>}
      </button>
    </form>
  )
}

// --- REGISTER FORM ---
function RegisterForm({ onSuccess }) {
  const { register } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', career: '', cycle: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    try {
      await register(form)
      showToast('✓ Registro exitoso. ¡Bienvenido!')
      onSuccess('/user')
    } catch (err) {
      setErrors(err.response?.data?.errors || { general: [err.message] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input placeholder="Nombre" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-sky-500/50" 
                 onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input placeholder="Correo UNI" type="email" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-sky-500/50"
                 onChange={e => setForm({...form, email: e.target.value})} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs outline-none focus:border-sky-500/50"
                onChange={e => setForm({...form, career: e.target.value})}>
          <option value="">Carrera</option>
          <option value="Sistemas">Sistemas</option>
          <option value="Software">Software</option>
          <option value="Ciberseguridad">Ciberseguridad</option>
        </select>
        <select className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs outline-none focus:border-sky-500/50"
                onChange={e => setForm({...form, cycle: e.target.value})}>
          <option value="">Ciclo</option>
          <option value="1">I - II</option>
          <option value="3">III - IV</option>
          <option value="5">V+</option>
        </select>
      </div>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input type="password" placeholder="Contraseña" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-sky-500/50"
               onChange={e => setForm({...form, password: e.target.value})} />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-sky-600 hover:bg-sky-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Crear mi Perfil'}
      </button>
    </form>
  )
}

// --- MAIN PAGE ---
export default function LoginPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')

  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden text-white">
      {/* Fondos Decorativos */}
      <Orb className="top-[-10%] left-[-10%] w-[600px] h-[600px] opacity-10" style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 70%)' }} />
      <Orb className="bottom-[-10%] right-[-10%] w-[500px] h-[500px] opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />

      <div className="w-full max-w-lg relative z-10 bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        
        {/* Header con Logo */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="p-4 bg-sky-500/10 rounded-[2rem] border border-sky-500/20 mb-6">
            <IEEECSLogo size={48} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 italic">
            {tab === 'login' ? 'CORE_ACCESS' : 'NEW_MEMBER'}
          </h1>
          <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">
            IEEE Computer Society UNI
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-black/40 p-1 rounded-2xl mb-8 border border-white/5">
          {['login', 'register'].map(t => (
            <button 
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${
                tab === t ? 'bg-sky-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t === 'login' ? 'Identificarse' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* Formularios */}
        <div className="mb-8">
          {tab === 'login' ? <LoginForm onSuccess={path => navigate(path)} /> : <RegisterForm onSuccess={path => navigate(path)} />}
        </div>

        {/* Separador */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] font-mono text-gray-600">OR_SOCIAL</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Google Auth */}
        <GoogleButton 
          text={tab === 'login' ? 'Entrar' : 'Registrarme'} 
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
        />

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link to="/" className="text-[10px] font-bold text-gray-500 hover:text-sky-400 transition-colors uppercase tracking-widest">
            ← Volver a la base de datos pública
          </Link>
        </div>
      </div>
    </main>
  )
}