import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash in the URL (like #about), don't scroll to top
    // so that the browser can handle the anchor scroll if needed.
    // Otherwise, scroll to top on every route change.
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
