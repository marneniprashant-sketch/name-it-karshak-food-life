import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Package, FileText, Settings, LogOut, Bell, MapPin, Phone, Mail, Edit3, ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const TABS = [
  { id: 'overview',   icon: User,      label: 'Overview' },
  { id: 'enquiries',  icon: FileText,  label: 'My Enquiries' },
  { id: 'orders',     icon: Package,   label: 'My Orders' },
  { id: 'settings',   icon: Settings,  label: 'Profile Settings' },
]

// Demo data
const DEMO_ENQUIRIES = [
  { id: 'ENQ-001', product: 'Almonds (Badam)', category: 'Dry Fruits', qty: '500 kg', status: 'pending',    date: '28 Jul 2026' },
  { id: 'ENQ-002', product: 'Turmeric Powder', category: 'Spices',     qty: '200 kg', status: 'responded',  date: '25 Jul 2026' },
  { id: 'ENQ-003', product: 'Chia Seeds',      category: 'Seeds',      qty: '100 kg', status: 'closed',     date: '18 Jul 2026' },
]
const DEMO_ORDERS = [
  { id: 'ORD-001', product: 'Cashews (Kaju)', qty: '250 kg', amount: '—', status: 'processing', date: '27 Jul 2026' },
  { id: 'ORD-002', product: 'Black Pepper',   qty: '50 kg',  amount: '—', status: 'dispatched', date: '20 Jul 2026' },
]

function StatusBadge({ status }) {
  const map = {
    pending:    { color: '#e67e00', bg: '#fff8f0', label: 'Pending' },
    responded:  { color: '#176B3A', bg: '#f0f9f4', label: 'Responded' },
    closed:     { color: '#888',    bg: '#f5f5f5', label: 'Closed' },
    processing: { color: '#1565C0', bg: '#e8f1ff', label: 'Processing' },
    dispatched: { color: '#176B3A', bg: '#f0f9f4', label: 'Dispatched' },
  }
  const s = map[status] || map.pending
  return (
    <span className="status-badge" style={{ color: s.color, background: s.bg }}>
      {status === 'pending' && <AlertCircle size={11} />}
      {(status === 'responded' || status === 'dispatched') && <CheckCircle size={11} />}
      {status === 'processing' && <Clock size={11} />}
      {s.label}
    </span>
  )
}

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: '',
    city: '',
    state: '',
  })

  if (!user) {
    return (
      <div className="profile-gate">
        <div className="profile-gate-card">
          <User size={48} />
          <h2>Please sign in</h2>
          <p>You need to be logged in to view your profile.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    )
  }

  const handleLogout = () => { logout(); navigate('/') }
  const handleProfileSave = e => { e.preventDefault(); setEditMode(false) }

  const initials = user.name.slice(0, 2).toUpperCase()

  return (
    <div className="profile-page">
      {/* ── TOP BANNER ── */}
      <div className="profile-banner">
        <div className="profile-banner-inner container">
          <div className="profile-avatar-lg">{initials}</div>
          <div className="profile-banner-info">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span className="profile-member-badge">Member · Karshak Food Life</span>
          </div>
          <button className="profile-logout-btn" onClick={handleLogout}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="container profile-body">
        {/* Sidebar tabs */}
        <aside className="profile-sidebar">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                className={`profile-tab${tab === t.id ? ' active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <Icon size={16} />
                {t.label}
              </button>
            )
          })}
          <div className="profile-tab-divider" />
          <Link to="/contact" className="profile-tab-cta">
            <FileText size={16} /> New Enquiry <ArrowRight size={13} />
          </Link>
          <Link to="/products" className="profile-tab-link">
            <Package size={16} /> Browse Products
          </Link>
        </aside>

        {/* Main content */}
        <div className="profile-content">

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div className="profile-section">
              <h2>Account Overview</h2>
              <div className="overview-stats">
                <div className="ov-stat">
                  <span className="ov-num">{DEMO_ENQUIRIES.length}</span>
                  <span className="ov-label">Enquiries Sent</span>
                </div>
                <div className="ov-stat">
                  <span className="ov-num">{DEMO_ORDERS.length}</span>
                  <span className="ov-label">Orders Placed</span>
                </div>
                <div className="ov-stat">
                  <span className="ov-num">1</span>
                  <span className="ov-label">Pending Response</span>
                </div>
              </div>

              <h3 className="profile-subsection">Recent Enquiries</h3>
              <div className="enquiry-list">
                {DEMO_ENQUIRIES.slice(0, 2).map(e => (
                  <div key={e.id} className="enquiry-row">
                    <div className="eq-id">{e.id}</div>
                    <div className="eq-info">
                      <strong>{e.product}</strong>
                      <span>{e.category} · {e.qty}</span>
                    </div>
                    <div className="eq-date">{e.date}</div>
                    <StatusBadge status={e.status} />
                  </div>
                ))}
              </div>
              <button className="profile-view-all" onClick={() => setTab('enquiries')}>
                View All Enquiries →
              </button>

              <h3 className="profile-subsection" style={{marginTop:'32px'}}>Quick Links</h3>
              <div className="quick-links">
                <Link to="/products/dry-fruits" className="ql-card">🥜 Dry Fruits</Link>
                <Link to="/products/spices" className="ql-card">🌶 Spices</Link>
                <Link to="/products/pulses" className="ql-card">🫘 Pulses</Link>
                <Link to="/products/edible-seeds" className="ql-card">🌱 Seeds</Link>
                <Link to="/products/herbal-powders" className="ql-card">🌿 Herbal</Link>
                <Link to="/products/grains" className="ql-card">🌾 Grains</Link>
              </div>
            </div>
          )}

          {/* ENQUIRIES */}
          {tab === 'enquiries' && (
            <div className="profile-section">
              <div className="section-head-row">
                <h2>My Enquiries</h2>
                <Link to="/contact" className="btn-primary" style={{fontSize:'13px',padding:'9px 18px'}}>
                  + New Enquiry
                </Link>
              </div>
              {DEMO_ENQUIRIES.length === 0 ? (
                <div className="empty-state">
                  <FileText size={40} />
                  <p>No enquiries yet. Browse products and submit your first enquiry.</p>
                  <Link to="/products" className="btn-primary">Browse Products</Link>
                </div>
              ) : (
                <div className="enquiry-list">
                  {DEMO_ENQUIRIES.map(e => (
                    <div key={e.id} className="enquiry-row">
                      <div className="eq-id">{e.id}</div>
                      <div className="eq-info">
                        <strong>{e.product}</strong>
                        <span>{e.category} · Qty: {e.qty}</span>
                      </div>
                      <div className="eq-date">{e.date}</div>
                      <StatusBadge status={e.status} />
                    </div>
                  ))}
                </div>
              )}
              <div className="enquiry-note">
                <Bell size={14} />
                <span>Our team typically responds within 1–2 business days.</span>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div className="profile-section">
              <h2>My Orders</h2>
              {DEMO_ORDERS.length === 0 ? (
                <div className="empty-state">
                  <Package size={40} />
                  <p>No orders placed yet.</p>
                  <Link to="/contact" className="btn-primary">Request a Quote</Link>
                </div>
              ) : (
                <div className="enquiry-list">
                  {DEMO_ORDERS.map(o => (
                    <div key={o.id} className="enquiry-row">
                      <div className="eq-id">{o.id}</div>
                      <div className="eq-info">
                        <strong>{o.product}</strong>
                        <span>Qty: {o.qty}</span>
                      </div>
                      <div className="eq-date">{o.date}</div>
                      <StatusBadge status={o.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {tab === 'settings' && (
            <div className="profile-section">
              <div className="section-head-row">
                <h2>Profile Settings</h2>
                {!editMode && (
                  <button className="edit-btn" onClick={() => setEditMode(true)}>
                    <Edit3 size={14} /> Edit
                  </button>
                )}
              </div>
              <form onSubmit={handleProfileSave} className="settings-form">
                <div className="settings-grid">
                  <div className="settings-field">
                    <label><User size={13}/> Full Name</label>
                    <input value={profileForm.name} disabled={!editMode}
                      onChange={e => setProfileForm({...profileForm, name: e.target.value})} />
                  </div>
                  <div className="settings-field">
                    <label><Mail size={13}/> Email</label>
                    <input value={profileForm.email} disabled
                      type="email" />
                  </div>
                  <div className="settings-field">
                    <label><Phone size={13}/> Phone</label>
                    <input value={profileForm.phone} disabled={!editMode} placeholder="Your phone number"
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})} />
                  </div>
                  <div className="settings-field">
                    <label><Package size={13}/> Company / Business</label>
                    <input value={profileForm.company} disabled={!editMode} placeholder="Company name (optional)"
                      onChange={e => setProfileForm({...profileForm, company: e.target.value})} />
                  </div>
                  <div className="settings-field">
                    <label><MapPin size={13}/> City</label>
                    <input value={profileForm.city} disabled={!editMode} placeholder="Your city"
                      onChange={e => setProfileForm({...profileForm, city: e.target.value})} />
                  </div>
                  <div className="settings-field">
                    <label><MapPin size={13}/> State</label>
                    <input value={profileForm.state} disabled={!editMode} placeholder="Your state"
                      onChange={e => setProfileForm({...profileForm, state: e.target.value})} />
                  </div>
                </div>
                {editMode && (
                  <div className="settings-actions">
                    <button type="submit" className="btn-primary">Save Changes</button>
                    <button type="button" className="edit-btn" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                )}
              </form>
              <div className="danger-zone">
                <h3>Account Actions</h3>
                <button className="profile-logout-btn" onClick={handleLogout}>
                  <LogOut size={14}/> Sign Out of Account
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
