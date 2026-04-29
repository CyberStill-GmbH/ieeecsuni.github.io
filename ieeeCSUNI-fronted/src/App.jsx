import { ToastProvider } from './context/ToastContext'
import Layout from './Layout'
import './globals.css' 

function App() {
  return (
    <ToastProvider>
      <Layout />
    </ToastProvider>
  )
}

export default App