import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource/noto-sans-telugu/400.css"
import "@fontsource/noto-sans-telugu/600.css"
import "@fontsource/noto-sans-telugu/700.css"
import "./index.css"
import App from "./App"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
