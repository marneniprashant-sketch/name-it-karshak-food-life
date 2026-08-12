import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Lock, AlertTriangle, CheckCircle, Trash2, Eye, EyeOff } from 'lucide-react'
import './Owner.css'

// Passkey stored as base64 — not plain text in source
const _PK = 'MzAxMjIzMjY='
const PASSKEY = atob(_PK)
const MAX_ATTEMPTS = 3
const LS_ATTEMPTS = 'kfl_owner_attempts'
const LS_LOCKED = 'kfl_site_locked'
const LS_UNLOCKED = 'kfl_owner_unlocked'

export default function Owner() {
  const navigate = useNavigate()
  const [stage, setStage] = useState('gate') // gate | unlocked | locked | danger
  const [input, setInput] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const locked = localStorage.getItem(LS_LOCKED)
    const unlocked = sessionStorage.getItem(LS_UNLOCKED)
    const saved = parseInt(localStorage.getItem(LS_ATTEMPTS) || '0')

    if (locked === 'true') { setStage('locked'); return }
    if (unlocked === 'true') { setStage('unlocked'); return }
    setAttempts(saved)
    if (saved >= MAX_ATTEMPTS) setStage('danger')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSKEY) {
      localStorage.removeItem(LS_ATTEMPTS)
      sessionStorage.setItem(LS_UNLOCKED, 'true')
      setStage('unlocked')
    } else {
      const next = attempts + 1
      setAttempts(next)
      localStorage.setItem(LS_ATTEMPTS, String(next))
      if (next >= MAX_ATTEMPTS) {
        setStage('danger')
      } else {
        setError(`Wrong passkey. ${MAX_ATTEMPTS - next} attempt${MAX_ATTEMPTS - next === 1 ? '' : 's'} remaining.`)
        setInput('')
      }
    }
  }

  const handleLockSite = () => {
    localStorage.setItem(LS_LOCKED, 'true')
    localStorage.setItem(LS_ATTEMPTS, String(MAX_ATTEMPTS + 1))
    sessionStorage.removeItem(LS_UNLOCKED)
    setStage('locked')
  }

  const handleDeleteOwnerPage = () => {
    if (deleteConfirm !== 'DELETE') return
    setDeleting(true)
    // Wipe all localStorage & sessionStorage for this site
    localStorage.clear()
    sessionStorage.clear()
    // Redirect to home after clearing
    setTimeout(() => navigate('/'), 1500)
  }

  const handleUnlock = (e) => {
    e.preventDefault()
    if (input === PASSKEY) {
      localStorage.removeItem(LS_LOCKED)
      localStorage.removeItem(LS_ATTEMPTS)
      sessionStorage.setItem(LS_UNLOCKED, 'true')
      setStage('unlocked')
      setInput('')
      setError('')
    } else {
      setError('Wrong passkey.')
      setInput('')
    }
  }

  // ── LOCKED SCREEN ────────────────────────────────
  if (stage === 'locked') {
    return (
      <div className="owner-page locked-page">
        <div className="owner-card">
          <div className="owner-icon red"><Lock size={28}/></div>
          <h1>Site Locked</h1>
          <p>This browser has been locked due to multiple failed passkey attempts.</p>
          <p className="owner-sub">If you are the owner, enter your passkey to unlock.</p>
          <form onSubmit={handleUnlock} className="owner-form">
            <div className="owner-input-wrap">
              <input
                type={showKey ? 'text' : 'password'}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Enter passkey"
                autoFocus
              />
              <button type="button" className="show-btn" onClick={() => setShowKey(!showKey)}>
                {showKey ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {error && <p className="owner-error">{error}</p>}
            <button type="submit" className="owner-btn green">Unlock</button>
          </form>
          <Link to="/" className="owner-back">← Back to Website</Link>
        </div>
      </div>
    )
  }

  // ── DANGER SCREEN (3 failed attempts) ────────────
  if (stage === 'danger') {
    return (
      <div className="owner-page danger-page">
        <div className="owner-card danger-card">
          <div className="owner-icon red"><AlertTriangle size={32}/></div>
          <h1>⚠ Access Warning</h1>
          <p className="danger-msg">
            You have used all <strong>3 passkey attempts</strong>.
          </p>
          <p className="danger-sub">
            This browser session has been locked. Any further attempts will trigger
            a <strong>complete site data wipe</strong> for this browser.
          </p>
          <div className="danger-box">
            <p>If you are the owner, enter the correct passkey below to restore access.</p>
            <form onSubmit={handleUnlock} className="owner-form">
              <div className="owner-input-wrap">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Owner passkey"
                  autoFocus
                />
                <button type="button" className="show-btn" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              {error && <p className="owner-error">{error}</p>}
              <button type="submit" className="owner-btn green">Verify Identity</button>
            </form>
          </div>
          <button className="owner-btn red" onClick={handleLockSite}>
            <Lock size={14}/> Lock This Browser
          </button>
          <Link to="/" className="owner-back">← Back to Website</Link>
        </div>
      </div>
    )
  }

  // ── GATE SCREEN ───────────────────────────────────
  if (stage === 'gate') {
    return (
      <div className="owner-page gate-page">
        <div className="owner-card">
          <div className="owner-icon gold"><Shield size={28}/></div>
          <h1>Owner Access</h1>
          <p>This page is protected. Enter the passkey to continue.</p>
          <form onSubmit={handleSubmit} className="owner-form">
            <div className="owner-input-wrap">
              <input
                type={showKey ? 'text' : 'password'}
                value={input}
                onChange={e => { setInput(e.target.value); setError('') }}
                placeholder="Enter passkey"
                autoFocus
              />
              <button type="button" className="show-btn" onClick={() => setShowKey(!showKey)}>
                {showKey ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {error && <p className="owner-error">{error}</p>}
            <p className="attempts-left">
              Attempts remaining: <strong>{MAX_ATTEMPTS - attempts}</strong>
            </p>
            <button type="submit" className="owner-btn gold">Unlock</button>
          </form>
          <Link to="/" className="owner-back">← Back to Website</Link>
        </div>
      </div>
    )
  }

  // ── UNLOCKED / OWNER PANEL ────────────────────────
  return (
    <div className="owner-page unlocked-page">
      <div className="owner-card wide">
        <div className="owner-icon green"><CheckCircle size={28}/></div>
        <img src="/logo.png" alt="Karshak Food Life" className="owner-logo" />
        <h1>AvinashChowdary</h1>
        <p className="owner-credit">Built & Designed by Avinash Chowdary</p>
        <p className="owner-tag">Karshak Food Life © {new Date().getFullYear()}</p>

        <div className="owner-divider" />

        <div className="owner-actions">
          <div className="action-card">
            <Lock size={20}/>
            <h3>Lock This Browser</h3>
            <p>Prevents anyone on this device from accessing the owner page until unlocked with passkey.</p>
            <button className="owner-btn red" onClick={handleLockSite}>
              <Lock size={13}/> Lock Now
            </button>
          </div>

          <div className="action-card danger-action">
            <Trash2 size={20}/>
            <h3>Wipe Site Data</h3>
            <p>Clears all localStorage, sessionStorage and cached data for this browser. Type DELETE to confirm.</p>
            <input
              className="delete-input"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder='Type DELETE to confirm'
            />
            <button
              className="owner-btn red"
              onClick={handleDeleteOwnerPage}
              disabled={deleteConfirm !== 'DELETE' || deleting}
            >
              <Trash2 size={13}/> {deleting ? 'Wiping...' : 'Wipe Data'}
            </button>
          </div>
        </div>

        <div className="owner-divider" />
        <Link to="/" className="owner-back">← Back to Website</Link>
      </div>
    </div>
  )
}
