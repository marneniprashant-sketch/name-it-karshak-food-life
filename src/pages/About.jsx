import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Star, Shield, RefreshCw, ArrowRight, CheckCircle, Sprout, Globe, Heart } from 'lucide-react'
import PageHero from '../components/PageHero'
import './About.css'

const NAV_ITEMS = [
  { id: 'overview', icon: '🌿', label: 'KARSHAK FOOD LIFE' },
  { id: 'story',    icon: '◉',  label: 'OUR STORY' },
  { id: 'quality',  icon: '✓',  label: 'QUALITY & SOURCING' },
  { id: 'values',   icon: '◆',  label: 'OUR VALUES' },
]
const VALUES = [
  { icon: Star,      title: 'Quality',        desc: 'Careful product selection and consistent standards across every batch we supply.' },
  { icon: Shield,    title: 'Trust',           desc: 'Transparent and dependable business relationships with every partner.' },
  { icon: Leaf,      title: 'Responsibility',  desc: 'Respect for sourcing partners, natural products and the environment.' },
  { icon: RefreshCw, title: 'Consistency',     desc: 'Reliable quality across every order, every season, every market.' },
]

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function OverviewContent() {
  return (
    <>
      <div className="about-feature-img">
        <img src="https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1200&q=85" alt="Karshak Food Life products" />
      </div>
      <div className="about-section">
        <h2 className="about-company-name">Karshak Food Life</h2>
        <p>Karshak Food Life is focused on bringing carefully selected agricultural and natural food products from trusted sources to businesses and consumers who value quality, consistency and authenticity.</p>
        <p>Our portfolio brings together dry fruits, edible seeds, pulses, spices, herbal powders and grains under one trusted source. From responsible sourcing and careful selection to quality inspection, processing, packaging and distribution, our goal is to preserve the natural character and quality of every product we handle.</p>
        <p>We aim to build long-term relationships with customers by providing dependable products, transparent service and consistent quality.</p>
      </div>
      <MissionVision />
    </>
  )
}

function MissionVision() {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`mv-grid${visible ? ' visible' : ''}`}>
      <div className="mv-card">
        <div className="mv-label">Mission</div>
        <h3>Delivering Quality,<br />Building Trust.</h3>
        <p>To deliver carefully sourced agricultural food products with a consistent focus on quality, reliability and responsible business practices, while creating lasting value for our customers and sourcing partners.</p>
      </div>
      <div className="mv-card mv-card-alt">
        <div className="mv-label">Vision</div>
        <h3>A Trusted Name<br />in Agriculture.</h3>
        <p>To grow Karshak Food Life into a trusted name for quality agricultural products by connecting nature's finest ingredients with customers across markets through responsible sourcing and dependable service.</p>
      </div>
    </div>
  )
}

function StoryContent() {
  const stories = [
    { icon: Sprout, title: 'Where It All Began', color: '#176B3A', text: `Every great journey starts with a simple observation. Ours began at a local market, watching farmers sell their finest produce at a fraction of its true worth — while consumers in cities struggled to find genuinely natural, quality products. That gap between farm and table became the founding question of Karshak Food Life.` },
    { icon: Heart, title: 'The Name "Karshak"', color: '#C99A3D', text: `"Karshak" is a Sanskrit-rooted word meaning farmer — the backbone of our civilization, the quiet force that feeds the world. We chose this name deliberately. It is a tribute to every person who rises before the sun, tends to the earth, and trusts that their harvest will find worthy hands.` },
    { icon: Globe, title: 'Building a Better Supply Chain', color: '#176B3A', text: `The agricultural supply chain is long, fragmented, and often opaque. We set out to build a cleaner, shorter, more accountable supply chain — one where the origin of every product is known, quality is inspected rather than assumed, and both farmer and buyer can trust the process.` },
    { icon: CheckCircle, title: 'Our Promise to You', color: '#4F9E45', text: `Whether you are a distributor, food manufacturer, retailer, or someone who cares deeply about what goes into your food — our promise is the same. Karshak Food Life will always put product integrity first. We will tell you what we know and never compromise on quality.` },
  ]
  return (
    <>
      <div className="story-hero-img">
        <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=85" alt="Indian farmland" />
        <div className="story-img-caption"><span>🌾</span><p>The journey from a single farm to a trusted supply partner</p></div>
      </div>
      <div className="story-intro">
        <h2>The Karshak Story</h2>
        <p className="story-lead">Behind every premium product is a story of care, perseverance and purpose. This is ours.</p>
      </div>
      <div className="story-timeline">
        {stories.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={s.title} className={`story-card${i % 2 === 1 ? ' alt' : ''}`}>
              <div className="story-card-icon" style={{ background: s.color }}><Icon size={22} /></div>
              <div className="story-card-body"><h3>{s.title}</h3><p>{s.text}</p></div>
            </div>
          )
        })}
      </div>
      <div className="story-quote">
        <blockquote>"Nature provides abundantly. Our job is simply to carry that abundance with honesty, care, and respect — from the farm to your life."</blockquote>
        <cite>— Karshak Food Life</cite>
      </div>
    </>
  )
}

function QualityContent() {
  const steps = [
    { num: '01', title: 'Responsible Sourcing',    desc: 'We identify and partner with agricultural sources known for consistent quality.' },
    { num: '02', title: 'Careful Batch Selection',  desc: 'Each batch is assessed for size, colour, aroma, texture and grade.' },
    { num: '03', title: 'Hygienic Processing',       desc: 'Products are cleaned, sorted and processed in hygienic facilities.' },
    { num: '04', title: 'Quality Inspection',        desc: 'A structured inspection process checks each batch before packaging.' },
    { num: '05', title: 'Secure Packaging',          desc: 'Products are packed in appropriate formats designed to preserve shelf life.' },
    { num: '06', title: 'Reliable Dispatch',         desc: 'Orders are dispatched with care and full traceability records.' },
  ]
  return (
    <>
      <div className="about-feature-img">
        <img src="https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1200&q=85" alt="Quality dry fruits" />
      </div>
      <div className="about-section">
        <h2 className="about-company-name">Quality & Sourcing</h2>
        <p>At Karshak Food Life, quality is not a department or a checklist — it is the lens through which every decision is made.</p>
      </div>
      <div className="quality-steps">
        {steps.map(s => (
          <div key={s.num} className="quality-step">
            <div className="qs-num">{s.num}</div>
            <div className="qs-body"><h4>{s.title}</h4><p>{s.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="quality-note"><span>📋</span><p>Certification details will be displayed once formally verified.</p></div>
    </>
  )
}

function ValuesContent() {
  const extended = [
    { icon: Star,      color: '#C99A3D', title: 'Quality Above All',       story: `We built Karshak Food Life around a single commitment — that what you receive from us today will be exactly what you expect tomorrow.` },
    { icon: Shield,    color: '#176B3A', title: 'Trust Through Transparency', story: `We believe trust is built through honesty. If we do not yet have a certification, we will say so. We would rather lose a transaction than mislead a customer.` },
    { icon: Leaf,      color: '#4F9E45', title: 'Responsibility to the Source', story: `Our sourcing partners — farmers, growers, cooperatives — are not just vendors. They are the reason we exist. We treat these relationships with respect and fairness.` },
    { icon: RefreshCw, color: '#4B2E16', title: 'Consistency as a Culture',  story: `Consistency demands systems, discipline and a refusal to cut corners. We have built our processes around delivering the same standard across every order, every season.` },
  ]
  return (
    <>
      <div className="about-section">
        <h2 className="about-company-name">Our Values</h2>
        <p>Values are only meaningful when tested. These are the four principles that guide every decision at Karshak Food Life.</p>
      </div>
      <div className="extended-values">
        {extended.map(v => {
          const Icon = v.icon
          return (
            <div key={v.title} className="ev-card">
              <div className="ev-icon" style={{ background: v.color }}><Icon size={22} /></div>
              <div className="ev-body"><h3>{v.title}</h3><p>{v.story}</p></div>
            </div>
          )
        })}
      </div>
      <div className="values-closing">
        <h3>"The measure of a food company is not what it claims — it is what it consistently delivers."</h3>
        <Link to="/contact" className="btn-primary" style={{marginTop:'20px', display:'inline-flex'}}>Work With Us <ArrowRight size={15}/></Link>
      </div>
    </>
  )
}

export default function About() {
  const [activeNav, setActiveNav] = useState('overview')
  const [contentRef, contentVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  const renderContent = () => {
    switch (activeNav) {
      case 'story':   return <StoryContent />
      case 'quality': return <QualityContent />
      case 'values':  return <ValuesContent />
      default:        return <OverviewContent />
    }
  }

  return (
    <div className="about-page">
      <PageHero
        page="about"
        badge="About Us"
        headline="Rooted in Quality."
        subtext="Carefully sourced agricultural products from trusted sources to businesses and consumers who value authenticity."
      />

      <div className="about-body">
        <div className="about-container">
          <aside className="about-sidebar">
            {NAV_ITEMS.map((item, i) => (
              <button key={item.id} className={`sidebar-item${activeNav === item.id ? ' active' : ''}`}
                style={{ animationDelay: `${i * 80}ms` }} onClick={() => setActiveNav(item.id)}>
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                <ArrowRight size={14} className="sidebar-arrow" />
              </button>
            ))}
          </aside>
          <main ref={contentRef} key={activeNav} className={`about-card${contentVisible ? ' visible' : ''}`}>
            {renderContent()}
          </main>
        </div>
      </div>

      <div ref={ctaRef} className={`about-cta${ctaVisible ? ' visible' : ''}`}>
        <div className="about-cta-inner">
          <div className="about-cta-text">
            <p className="cta-eyebrow">Looking for quality agricultural products?</p>
            <h2>Talk to Karshak Food Life</h2>
            <p className="cta-sub">We'd love to hear from you.</p>
          </div>
          <div className="about-cta-btns">
            <Link to="/contact" className="btn-primary">Contact Us <ArrowRight size={15}/></Link>
            <Link to="/contact" className="about-cta-outline">Request Bulk Quote</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
