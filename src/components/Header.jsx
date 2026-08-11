import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, User, LogIn, UserPlus, LogOut, ChevronDown, ShoppingCart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Header.css'

export default function Header() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQ.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQ.trim())}`)
      setSearchOpen(false)
      setSearchQ('')
    }
  }

  const handleLogout = () => { logout(); setProfileOpen(false) }

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Karshak Food Life" className="logo-img" />
          <div>
            <span className="logo-name">Karshak Food Life</span>
            <span className="logo-tag">Nature's Bounty, Ethically Sourced.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desk-nav">
          <NavLink to="/" className={({isActive})=>isActive?'nav-link active':'nav-link'}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?'nav-link active':'nav-link'}>About Us</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive?'nav-link active':'nav-link'}>Products</NavLink>
          <NavLink to="/quality" className={({isActive})=>isActive?'nav-link active':'nav-link'}>Quality</NavLink>
          <NavLink to="/sourcing" className={({isActive})=>isActive?'nav-link active':'nav-link'}>Sourcing</NavLink>
          <NavLink to="/sustainability" className={({isActive})=>isActive?'nav-link active':'nav-link'}>Sustainability</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?'nav-link active':'nav-link'}>Contact Us</NavLink>
        </nav>

        <div className="header-actions">
          {/* Search */}
          <button className="icon-btn" onClick={()=>setSearchOpen(!searchOpen)} aria-label="Search">
            <Search size={20} />
          </button>

          {/* Cart */}
          <Link to="/cart" className="cart-icon-btn" aria-label="Cart">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* Profile / Login */}
          <div className="profile-wrap" ref={profileRef}>
            <button
              className={`profile-btn${profileOpen ? ' open' : ''}`}
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Account"
            >
              <div className="profile-avatar">
                <User size={18} />
              </div>
              <span className="profile-label">{user ? user.name : 'Login'}</span>
              <ChevronDown size={13} className={profileOpen ? 'profile-chev open' : 'profile-chev'} />
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                {!user ? (
                  <>
                    <div className="pd-header">
                      <p className="pd-title">Welcome!</p>
                      <p className="pd-sub">Sign in to manage your enquiries</p>
                    </div>
                    <div className="pd-actions">
                      <Link to="/login" className="pd-btn-primary" onClick={() => setProfileOpen(false)}>
                        <LogIn size={15} /> Sign In
                      </Link>
                      <Link to="/register" className="pd-btn-outline" onClick={() => setProfileOpen(false)}>
                        <UserPlus size={15} /> Create Account
                      </Link>
                    </div>
                    <div className="pd-divider" />
                    <Link to="/contact" className="pd-link" onClick={() => setProfileOpen(false)}>
                      Request a Quote without signing in →
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="pd-header">
                      <div className="pd-avatar-lg"><User size={22} /></div>
                      <p className="pd-title">{user.name}</p>
                      <p className="pd-sub">{user.email}</p>
                    </div>
                    <div className="pd-menu">
                      <Link to="/profile" className="pd-menu-item" onClick={() => setProfileOpen(false)}>My Enquiries</Link>
                      <Link to="/profile" className="pd-menu-item" onClick={() => setProfileOpen(false)}>Request Quote</Link>
                      <Link to="/profile" className="pd-menu-item" onClick={() => setProfileOpen(false)}>Profile Settings</Link>
                    </div>
                    <div className="pd-divider" />
                    <button className="pd-logout" onClick={handleLogout}>
                      <LogOut size={14} /> Sign Out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="icon-btn mob-only" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="search-bar">
          <form onSubmit={handleSearch} className="container search-form">
            <input
              autoFocus
              value={searchQ}
              onChange={e=>setSearchQ(e.target.value)}
              placeholder="Search: Badam, Almonds, Turmeric, Rajma..."
            />
            <button type="submit" className="btn-primary">Search</button>
          </form>
        </div>
      )}

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="mobile-nav">
          <NavLink to="/" onClick={()=>setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={()=>setMobileOpen(false)}>About Us</NavLink>
          <NavLink to="/products" onClick={()=>setMobileOpen(false)}>Products</NavLink>
          <NavLink to="/quality" onClick={()=>setMobileOpen(false)}>Quality</NavLink>
          <NavLink to="/sourcing" onClick={()=>setMobileOpen(false)}>Sourcing</NavLink>
          <NavLink to="/sustainability" onClick={()=>setMobileOpen(false)}>Sustainability</NavLink>
          <NavLink to="/contact" onClick={()=>setMobileOpen(false)}>Contact Us</NavLink>
          <Link to="/contact" className="btn-primary" style={{marginTop:'8px', justifyContent:'center'}} onClick={()=>setMobileOpen(false)}>
            Request Quote
          </Link>
        </nav>
      )}
    </header>
  )
}
