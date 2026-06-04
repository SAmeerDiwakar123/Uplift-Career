// main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'   // ← missing
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'  // ← persistor missing
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)