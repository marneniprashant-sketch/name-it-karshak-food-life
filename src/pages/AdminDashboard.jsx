import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard, Package, FileText, Users,
  Settings, LogOut, Bell, TrendingUp,
  ShieldCheck, Eye, ChevronRight, Menu, X, Edit3
} from 'lucide-react'
import { products, categories } from '../data/products'
import { useProducts } from '../context/ProductContext'
import { fetchEnquiries, updateEnquiryStatus } from '../data/productStore'
import './AdminDashboard.css'

const NAV = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'products',  icon: Package,         label: 'Products' },
  { id: 'enquiries', icon: FileText,         label: 'Enquiries' },
  { id: 'users',     icon: Users,            label: 'Users' },
  { id: 'settings',  icon: Settings,         label: 'Settings' },
]

const DEMO_ENQUIRIES = [
  { id: 'ENQ-001', name: 'Ravi Kumar',    product: 'Almonds',         qty: '500 kg', status: 'pending',   date: '28 Jul 2026', email: 'ravi@example.com' },
  { id: 'ENQ-002', name: 'Priya Sharma',  product: 'Turmeric Powder', qty: '200 kg', status: 'responded', date: '25 Jul 2026', email: 'priya@example.com' },
  { id: 'ENQ-003', name: 'Ali Hassan',    product: 'Chia Seeds',      qty: '100 kg', status: 'closed',    date: '18 Jul 2026', email: 'ali@example.com' },
  { id: 'ENQ-004', name: 'Meena Pillai',  product: 'Cashews',         qty: '300 kg', status: 'pending',   date: '30 Jul 2026', email: 'meena@example.com' },
  { id: 'ENQ-005', name: 'Sameer Qureshi',product: 'Black Pepper',    qty: '50 kg',  status: 'responded', date: '27 Jul 2026', email: 'sameer@example.com' },
]

const STATUS_COLORS = {
  pending:   { color: '#e67e00', bg: '#fff8f0' },
  responded: { color: '#176B3A', bg: '#f0f9f4' },
  closed:    { color: '#888',    bg: '#f5f5f5' },
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.pending
  return <span className="adm-badge" style={{color:s.color,background:s.bg}}>{status}</span>
}

function AdminGuard({ children }) {
  const navigate = useNavigate()
  const isAdmin = sessionStorage.getItem('kfl_admin') === 'true'
  useEffect(() => { if (!isAdmin) navigate('/admin') }, [isAdmin, navigate])
  if (!isAdmin) return null
  return children
}

export default function AdminDashboard() {
  const { products, categories } = useProducts()
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(false)
  const [enquiries, setEnquiries] = useState([])
  const [enqLoading, setEnqLoading] = useState(true)

  useEffect(() => {
    fetchEnquiries().then(data => { setEnquiries(data); setEnqLoading(false) })
  }, [])

  const handleStatusChange = async (id, status) => {
    await updateEnquiryStatus(id, status)
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
  }

  const logout = () => {
    sessionStorage.removeItem('kfl_admin')
    navigate('/admin')
  }

  return (
    <AdminGuard>
      <div className="adm-layout">

        {/* ── SIDEBAR ── */}
        <aside className={`adm-sidebar${sideOpen ? ' open' : ''}`}>
          <div className="adm-logo">
            <img src="/logo.png" alt="KFL" />
            <div>
              <strong>Karshak Food Life</strong>
              <span>Admin Panel</span>
            </div>
          </div>
          <nav className="adm-nav">
            {NAV.map(n => {
              const Icon = n.icon
              return (
                <button key={n.id} className={`adm-nav-item${tab===n.id?' active':''}`}
                  onClick={() => { setTab(n.id); setSideOpen(false) }}>
                  <Icon size={17}/>
                  {n.label}
                </button>
              )
            })}
          </nav>
          <button className="adm-logout" onClick={logout}><LogOut size={16}/> Sign Out</button>
        </aside>

        {/* ── MAIN ── */}
        <div className="adm-main">
          {/* Topbar */}
          <div className="adm-topbar">
            <button className="adm-hamburger" onClick={() => setSideOpen(!sideOpen)}>
              {sideOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
            <h2 className="adm-page-title">
              {NAV.find(n=>n.id===tab)?.label}
            </h2>
            <div className="adm-topbar-right">
              <button className="adm-icon-btn"><Bell size={18}/></button>
              <div className="adm-avatar">AC</div>
            </div>
          </div>

          <div className="adm-content">

            {/* DASHBOARD */}
            {tab === 'dashboard' && (
              <>
                <div className="adm-stats">
                  <div className="adm-stat-card">
                    <div className="adm-stat-icon green"><Package size={22}/></div>
                    <div><span className="adm-stat-num">{products.length}</span><span className="adm-stat-label">Total Products</span></div>
                  </div>
                  <div className="adm-stat-card">
                    <div className="adm-stat-icon gold"><FileText size={22}/></div>
                    <div><span className="adm-stat-num">{enquiries.length}</span><span className="adm-stat-label">Total Enquiries</span></div>
                  </div>
                  <div className="adm-stat-card">
                    <div className="adm-stat-icon orange"><TrendingUp size={22}/></div>
                    <div><span className="adm-stat-num">{enquiries.filter(e=>e.status==='pending').length}</span><span className="adm-stat-label">Pending</span></div>
                  </div>
                  <div className="adm-stat-card">
                    <div className="adm-stat-icon blue"><Users size={22}/></div>
                    <div><span className="adm-stat-num">{categories.length}</span><span className="adm-stat-label">Categories</span></div>
                  </div>
                </div>

                <h3 className="adm-section-title">Recent Enquiries</h3>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead><tr><th>ID</th><th>Name</th><th>Product</th><th>Qty</th><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {enqLoading ? (
                        <tr><td colSpan={6} style={{textAlign:'center',padding:'20px',color:'#888'}}>Loading enquiries...</td></tr>
                      ) : enquiries.length === 0 ? (
                        <tr><td colSpan={6} style={{textAlign:'center',padding:'20px',color:'#aaa'}}>No enquiries yet</td></tr>
                      ) : enquiries.slice(0,4).map(e=>(
                        <tr key={e.id}>
                          <td className="adm-id">{e.id}</td>
                          <td>{e.name}</td>
                          <td>{e.product || e.category || '—'}</td>
                          <td>{e.quantity || '—'}</td>
                          <td>{e.date}</td>
                          <td><StatusBadge status={e.status || 'pending'}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="adm-section-title">Product Categories</h3>
                <div style={{marginBottom:'14px'}}>
                  <Link to="/admin/products" className="adm-view-btn" style={{display:'inline-flex'}}>
                    <Edit3 size={14}/> Manage &amp; Edit Products
                  </Link>
                </div>
                <div className="adm-cat-grid">
                  {categories.map(c=>(
                    <div key={c.id} className="adm-cat-card">
                      <img src={c.image} alt={c.label}/>
                      <div>
                        <strong>{c.label}</strong>
                        <span>{products.filter(p=>p.category===c.id).length} products</span>
                      </div>
                      <ChevronRight size={16} className="adm-cat-arrow"/>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* PRODUCTS */}
            {tab === 'products' && (
              <>
                <div className="adm-toolbar">
                  <input className="adm-search" placeholder="Search products..." />
                  <Link to="/admin/products" className="adm-view-btn">
                    <Edit3 size={14}/> Edit Products
                  </Link>
                  <Link to="/products" target="_blank" className="adm-view-btn" style={{background:'var(--gold)'}}>
                    <Eye size={14}/> View Live
                  </Link>
                </div>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead><tr><th>#</th><th>Product</th><th>Local Name</th><th>Category</th><th>Applications</th></tr></thead>
                    <tbody>
                      {products.map(p=>(
                        <tr key={p.id}>
                          <td className="adm-id">{p.id}</td>
                          <td><strong>{p.name}</strong></td>
                          <td>{p.localName || '—'}</td>
                          <td><span className="adm-cat-tag">{categories.find(c=>c.id===p.category)?.label}</span></td>
                          <td>{p.applications?.slice(0,2).join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ENQUIRIES */}
            {tab === 'enquiries' && (
              <>
                <div className="section-head-row" style={{marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontSize:'13px',color:'#888'}}>{enquiries.length} enquir{enquiries.length !== 1 ? 'ies' : 'y'} total</span>
                  <button
                    onClick={() => { setEnqLoading(true); fetchEnquiries().then(d => { setEnquiries(d); setEnqLoading(false) }) }}
                    style={{background:'var(--green)',color:'white',border:'none',padding:'7px 14px',borderRadius:'7px',fontFamily:'var(--font-head)',fontWeight:600,fontSize:'12px',cursor:'pointer'}}
                  >
                    ↻ Refresh
                  </button>
                </div>
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Product</th><th>Qty</th><th>Date</th><th>Status</th><th>Reply</th></tr></thead>
                    <tbody>
                      {enqLoading ? (
                        <tr><td colSpan={7} style={{textAlign:'center',padding:'24px',color:'#888'}}>Loading...</td></tr>
                      ) : enquiries.length === 0 ? (
                        <tr><td colSpan={7} style={{textAlign:'center',padding:'24px',color:'#aaa'}}>No enquiries received yet. They will appear here when users submit the contact form.</td></tr>
                      ) : enquiries.map(e=>(
                        <tr key={e.id}>
                          <td className="adm-id">{e.id}</td>
                          <td>
                            <strong>{e.name}</strong>
                            {e.company && <div style={{fontSize:'11px',color:'#aaa'}}>{e.company}</div>}
                          </td>
                          <td className="adm-email">{e.email}</td>
                          <td>
                            {e.product || e.category || '—'}
                            {e.quantity && <div style={{fontSize:'11px',color:'#aaa'}}>{e.quantity}</div>}
                          </td>
                          <td style={{maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                            {e.message ? e.message.slice(0,50) : (e.phone || '—')}
                          </td>
                          <td>{e.date}</td>
                          <td>
                            <select
                              value={e.status || 'pending'}
                              onChange={ev => handleStatusChange(e.id, ev.target.value)}
                              style={{fontSize:'11px',padding:'3px 6px',borderRadius:'6px',border:'1px solid #ddd',cursor:'pointer'}}
                            >
                              <option value="pending">Pending</option>
                              <option value="responded">Responded</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td>
                            {e.email && e.email !== 'test@test.com' && (
                              <a
                                href={`mailto:${e.email}?subject=Re: Your Enquiry — Karshak Food Life&body=Dear ${e.name},%0A%0AThank you for reaching out to Karshak Food Life.%0A%0ARegarding your enquiry about ${e.product || e.category || 'our products'}:%0A%0A[Your response here]%0A%0ABest regards,%0AKarshak Food Life Team%0A+91 89194 99446`}
                                style={{
                                  display:'inline-flex', alignItems:'center', gap:'4px',
                                  background:'var(--green)', color:'white',
                                  padding:'5px 10px', borderRadius:'6px',
                                  fontSize:'11px', fontFamily:'var(--font-head)',
                                  fontWeight:600, textDecoration:'none',
                                  whiteSpace:'nowrap'
                                }}
                                onClick={() => handleStatusChange(e.id, 'responded')}
                              >
                                ✉ Reply
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* USERS */}
            {tab === 'users' && (
              <div className="adm-empty">
                <Users size={48}/>
                <h3>User Management</h3>
                <p>User accounts will appear here once a backend database is connected.</p>
              </div>
            )}

            {/* SETTINGS */}
            {tab === 'settings' && (
              <div className="adm-settings">
                <div className="adm-settings-card">
                  <div className="adm-settings-icon"><ShieldCheck size={22}/></div>
                  <div>
                    <h3>Admin Account</h3>
                    <p>Email: Avinashchowdary1223ra@gmail.com</p>
                    <p>Role: Super Admin</p>
                  </div>
                </div>
                <div className="adm-settings-card">
                  <div className="adm-settings-icon"><Package size={22}/></div>
                  <div>
                    <h3>Product Catalog</h3>
                    <p>{products.length} products across {categories.length} categories</p>
                    <Link to="/products" target="_blank" className="adm-link">View live catalog →</Link>
                  </div>
                </div>
                <div className="adm-settings-card">
                  <div className="adm-settings-icon" style={{background:'#fff3f3'}}><LogOut size={22} style={{color:'#e53935'}}/></div>
                  <div>
                    <h3>Sign Out</h3>
                    <p>End your admin session securely.</p>
                    <button className="adm-logout-btn" onClick={logout}>Sign Out</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
