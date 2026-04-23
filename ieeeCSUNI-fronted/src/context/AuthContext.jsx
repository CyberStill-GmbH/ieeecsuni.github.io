import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
const API = 'http://localhost:8000'
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Persistencia de la sesión
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${API}/api/user`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data);
        }
      } catch (err) {
        console.error("Error checking user:", err);
      }
    }
    checkUser()
  }, [])

  // Pedir CSRF
  const getCSRF = async () => {
    await fetch(`${API}/sanctum/csrf-cookie`, {
      credentials: "include"
    })
  }

  // Obtener cookie
  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1]
  }

  // Login
  const login = async ({ email, password }) => {
    await getCSRF()

    const res = await fetch(`${API}/login`, {        
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      throw new Error("Credenciales incorrectas.")
    }

    const userRes = await fetch(`${API}/api/user`, {
      headers: { 'Accept': 'application/json' },
      credentials: "include",
    })

    if (!userRes.ok) {
      throw new Error("No se pudo obtener el usuario.")
    }
    const userData = await userRes.json()
    setUser(userData)

    return userData
  }

  // Register
  const register = async ({ nombre, email, password, carrera, ciclo, confirm }) => {
    await getCSRF()

    const res = await fetch(`${API}/register`, {     // ← sin http://localhost:8000
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN") || ""),
      },
      credentials: "include",
      body: JSON.stringify({
        name: nombre,
        email,
        carrera,
        ciclo,
        password,
        password_confirmation: confirm,
      }),
    })

    if (!res.ok) {
      throw new Error("Error al registrarse.")
    }

    return await login({ email, password })
  }

  // Logout
  const logout = async () => {
    await fetch(`${API}/logout`, {                   // ← sin http://localhost:8000
      method: "POST",
      credentials: "include",
    })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)