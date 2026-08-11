import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Quality from './pages/Quality'
import Sourcing from './pages/Sourcing'
import Infrastructure from './pages/Infrastructure'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Owner from './pages/Owner'
import Cart from './pages/Cart'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import AllProducts from './pages/AllProducts'

const AUTH_ROUTES = ['/login', '/register', '/admin', '/admin/dashboard', '/admin/products']

export default function App() {
  const location = useLocation()
  const isAuth = AUTH_ROUTES.includes(location.pathname)
  const isOwner = location.pathname === '/kfl-owner-ac2024'

  // Site-wide lockout — if locked flag set and not on owner page, show lock screen
  const [siteLocked] = useState(() => localStorage.getItem('kfl_site_locked') === 'true')

  if (siteLocked && !isOwner) {
    return (
      <div style={{
        minHeight:'100vh', background:'#0f0a1a', display:'flex',
        alignItems:'center', justifyContent:'center', flexDirection:'column',
        gap:'16px', fontFamily:'Manrope, sans-serif', padding:'24px', textAlign:'center'
      }}>
        <div style={{fontSize:'48px'}}>🔒</div>
        <h1 style={{color:'white', fontSize:'24px', fontWeight:800}}>Access Restricted</h1>
        <p style={{color:'rgba(255,255,255,0.5)', fontSize:'14px', maxWidth:'360px', lineHeight:1.7}}>
          This browser has been locked due to security violations.
          Contact the website owner for assistance.
        </p>
        <a href="/kfl-owner-ac2024" style={{color:'#C99A3D', fontSize:'13px', fontWeight:600}}>
          Owner Access →
        </a>
      </div>
    )
  }

  return (
    <>
      {!isAuth && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/sourcing" element={<Sourcing />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/kfl-owner-ac2024" element={<Owner />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<CategoryPage />} />
          <Route path="/products/:category/:slug" element={<ProductDetail />} />
        </Routes>
      </main>
      {!isAuth && <Footer />}
      {!isAuth && <WhatsAppButton />}
    </>
  )
}
