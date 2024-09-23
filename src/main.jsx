import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/App/index.jsx"
import "./pages/App/App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
