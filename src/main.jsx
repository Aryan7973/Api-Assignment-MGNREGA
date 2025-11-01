import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n/i18n.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log("service worker registered",registration);
      })
      .catch((error)=>{
        console.log("error in registration",error);
      })
  })
}