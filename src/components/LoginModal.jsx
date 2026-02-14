import React, { useEffect } from 'react'

export default function LoginModal({ open, onClose, onLogin }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function submit(e) {
    e.preventDefault()
    // lightweight client-only auth mock
    const name = email.split('@')[0] || 'Guest'
    onLogin({ name, email })
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login-modal" role="dialog" aria-modal="true">
      <div className="login-backdrop" onClick={onClose} />
      <div className="login-panel">
        <button className="login-close" onClick={onClose} aria-label="Close">×</button>
        <h3>Sign in</h3>
        <form onSubmit={submit} className="login-form">
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <div className="login-actions">
            <button type="submit" className="btn-primary">Sign in</button>
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
