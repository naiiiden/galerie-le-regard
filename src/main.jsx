import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { OpenCartProvider } from './context/OpenCartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <OpenCartProvider>
          <App/>
        </OpenCartProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
