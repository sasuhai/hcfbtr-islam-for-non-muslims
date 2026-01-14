import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './firebase/AuthContext'
import { OrganizationProvider } from './context/OrganizationContext'
import { AnalyticsProvider } from './context/AnalyticsContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <OrganizationProvider>
          <BrowserRouter>
            <AnalyticsProvider>
              <App />
            </AnalyticsProvider>
          </BrowserRouter>
        </OrganizationProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
