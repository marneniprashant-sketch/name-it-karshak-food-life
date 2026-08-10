import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import './Auth.css'
import './AdminLogin.css'

const ADMIN_EMAIL = 'Avinashchowdary1223ra@gmail.com'
const ADMIN_PASS  = 'Avinash@1223'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASS) {
        sessionStorage.setItem('kfl_admin', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid admin credentials.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="auth-page admin-login-page">
      <div className="admin-login-left">
        <img src="https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=900&q=85" alt="Admin" />
        <div className="auth-left-overlay">
          <img src="/logo.png" alt="Karshak Food Life" className="auth-logo" />
          <h2>Admin Panel</h2>
          <p>Karshak Food Life — Restricted Access</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-head">
            <div className="auth-icon" style={{background:'linear-gradient(135deg,#176B3A,#C99A3D)'}}>
              <ShieldCheck size={22}/>
            </div>
            <h1>Admin Login</h1>
            <p>Karshak Food Life — Authorised Access Only</p>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={submit} className="auth-form">
            <div className="auth-field">
              <label>Admin Email</label>
              <input name="email" type="email" placeholder="Admin email" value={form.email} onChange={handle} required autoFocus />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <div className="pw-wrap">
                <input name="password" type={showPw ? 'text' : 'password'} placeholder="Admin password" value={form.password} onChange={handle} required />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Sign In as Admin'}
            </button>
          </form>
          <p style={{textAlign:'center', marginTop:'16px', fontSize:'12px', color:'#aaa'}}>
            This page is restricted to authorised personnel only.
          </p>
        </div>
      </div>
    </div>
  )
}
