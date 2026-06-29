import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DesignTest from './DesignTest.tsx'

const isDesignTest = window.location.pathname === '/design-test'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDesignTest ? <DesignTest /> : <App />}
  </StrictMode>,
)
