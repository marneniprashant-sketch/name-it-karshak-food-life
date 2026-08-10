import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = login(form.email, form.password)
    setLoading(false)
    if (result.success) navigate('/')
    else setError(result.error)
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <img src="https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=900&q=85" alt="Premium products" />
        <div className="auth-left-overlay">
          <img src="/logo.png" alt="Karshak Food Life" className="auth-logo" />
          <h2>Nature's Bounty,<br />Ethically Sourced.</h2>
          <p>Premium dry fruits, seeds, pulses, spices, grains and herbal products.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-head">
            <div className="auth-icon"><LogIn size={22} /></div>
            <h1>Sign In</h1>
            <p>Welcome back to Karshak Food Life</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={submit} className="auth-form">
            <div className="auth-field">
              <label>Email Address</label>
              <input
                name="email" type="email"
                placeholder="you@example.com"
                value={form.email} onChange={handle} required
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <div className="pw-wrap">
                <input
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password} onChange={handle} required
                />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <div className="social-btns">
            <a
              href="https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=http://localhost:5174/auth/callback&response_type=code&scope=openid%20email%20profile"
              className="social-btn google-btn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </a>
            <a
              href="https://www.facebook.com/v18.0/dialog/oauth?client_id=YOUR_FACEBOOK_APP_ID&redirect_uri=http://localhost:5174/auth/callback&scope=email,public_profile"
              className="social-btn facebook-btn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Continue with Facebook
            </a>
          </div>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
          <p className="auth-switch" style={{marginTop:'8px'}}>
            <Link to="/" style={{color:'#888', fontSize:'13px'}}>← Continue without signing in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
