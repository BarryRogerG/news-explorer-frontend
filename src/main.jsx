import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App/App.jsx'
import { getApiKeyStatus, isApiKeyConfigured } from './utils/config'

// Expose API key status helper to window for debugging in console
// Only in development mode
if (import.meta.env.DEV) {
  window.checkApiKey = () => {
    const status = getApiKeyStatus()
    console.log('🔑 API Key Status:', status.message)
    console.log('   Configured:', status.configured)
    console.log('   Key Length:', status.keyLength)
    if (status.configured) {
      console.log('   Key Preview:', status.keyPreview)
    }
    return status
  }
  
  window.isApiKeySet = () => {
    const configured = isApiKeyConfigured()
    console.log('🔑 API Key is', configured ? '✅ CONFIGURED' : '❌ NOT CONFIGURED')
    return configured
  }
  
  console.log('%c💡 Debug Helpers Available:', 'color: #4CAF50; font-weight: bold;')
  console.log('   - checkApiKey() - Get detailed API key status')
  console.log('   - isApiKeySet() - Quick check if API key is configured')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
