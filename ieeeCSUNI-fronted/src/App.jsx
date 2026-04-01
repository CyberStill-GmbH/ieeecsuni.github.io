import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import Layout from './Layout'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Layout />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App