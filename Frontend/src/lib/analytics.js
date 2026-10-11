const GA_MEASUREMENT_ID = "G-P14EPLHEXB"
const PRODUCTION_HOSTNAME = "trishaktidevalayam.netlify.app"
const SCRIPT_ID = "trishakti-google-analytics"
const INITIALIZED_KEY = "__trishaktiGoogleAnalyticsInitialized"

export function initializeGoogleAnalytics() {
  if (
    !import.meta.env.PROD
    || typeof window === "undefined"
    || window.location.hostname !== PRODUCTION_HOSTNAME
    || window[INITIALIZED_KEY]
    || document.getElementById(SCRIPT_ID)
  ) {
    return false
  }

  window[INITIALIZED_KEY] = true
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  const script = document.createElement("script")
  script.id = SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag("js", new Date())
  window.gtag("config", GA_MEASUREMENT_ID)

  return true
}
