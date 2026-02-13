import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Cuisines from './pages/Cuisines'
import FamousChefs from './pages/FamousChefs'
import AboutUs from './pages/AboutUs'
import LoginModal from './components/LoginModal'

export default function App() {
  const [active, setActive] = useState('home')
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vibe_user')) } catch { return null }
  })
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { root: null, rootMargin: '-35% 0px -35% 0px', threshold: 0.1 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function handleLogin(u) {
    setUser(u)
    localStorage.setItem('vibe_user', JSON.stringify(u))
    setLoginOpen(false)
  }

  function handleLogout() {
    setUser(null)
    localStorage.removeItem('vibe_user')
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="site-title">Food Diary</a>
          <nav className="site-nav">
            <a href="#home" className={active === 'home' ? 'active' : ''}>Home</a>
            <a href="#recipes" className={active === 'recipes' ? 'active' : ''}>Recipes</a>
            <a href="#cuisines" className={active === 'cuisines' ? 'active' : ''}>Cuisines</a>
            <a href="#chefs" className={active === 'chefs' ? 'active' : ''}>Famous Chefs</a>
            <a href="#about" className={active === 'about' ? 'active' : ''}>About Us</a>
            {user ? (
              <button className="btn-ghost" onClick={handleLogout}>Hi, {user.name} — Logout</button>
            ) : (
              <button className="btn-primary" onClick={() => setLoginOpen(true)}>Sign in</button>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Home />
        <Cuisines />
        <FamousChefs />
        <AboutUs />
      </main>

      <footer className="site-footer">© 2026 Food Diary</footer>

      {loginOpen && (
        <React.Suspense fallback={null}>
          {/* lazy-ready modal: component is local so import isn't necessary */}
          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
        </React.Suspense>
      )}
    </div>
  )
}
