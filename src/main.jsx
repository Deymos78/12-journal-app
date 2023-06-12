import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Colocamos en un punto alto el provider del store para que cualquier archivo pueda acceder directamente a los metodos de los reducer */}
    <Provider store={store}>
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
    
  </React.StrictMode>
)
