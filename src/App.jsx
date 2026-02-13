import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Cuisines from './pages/Cuisines'
import FamousChefs from './pages/FamousChefs'
import AboutUs from './pages/AboutUs'
import LoginModal from './components/LoginModal'
import BackToTop from './components/BackToTop'
import { initScrollAnimations, cleanupScrollAnimations } from './utils/scrollAnimations'

export default function App() {
  const [active, setActive] = useState('home')
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vibe_user')) } catch { return null }
  })
  const [loginOpen, setLoginOpen] = useState(false)

  // Theme state - check localStorage first, then system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Toggle theme function
  function toggleTheme() {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Initialize scroll animations
  useEffect(() => {
    const observer = initScrollAnimations()
    return () => cleanupScrollAnimations(observer)
  }, [])

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
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {user ? (
              <button className="btn-ghost" onClick={handleLogout}>Hi, {user.name} — Logout</button>
            ) : (
              <button className="btn-primary" onClick={() => setLoginOpen(true)}>Sign in</button>
            )}
          </nav>
        </div>
      </header>

      {/* Infinite Scrolling Marquee Banner */}
      <div className="marquee-banner">
        <div className="marquee-banner-content">
          <span>FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • </span>
          <span>FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • FOOD DIARY • </span>
        </div>
      </div>

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

      <BackToTop />
    </div>
  )
}
