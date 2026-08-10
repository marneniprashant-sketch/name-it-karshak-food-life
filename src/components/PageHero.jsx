import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './PageHero.css'

const PAGE_SLIDES = {
  about: [
    { url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1600&q=85', position: 'center' },
  ],
  quality: [
    { url: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=85', position: 'center' },
  ],
  sourcing: [
    { url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1612257997964-44e71a6c2bdf?w=1600&q=85', position: 'center' },
  ],
  infrastructure: [
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1612257997964-44e71a6c2bdf?w=1600&q=85', position: 'center' },
  ],
  sustainability: [
    { url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=85', position: 'center' },
  ],
  contact: [
    { url: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
  ],
  products: [
    { url: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1612257997964-44e71a6c2bdf?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1600&q=85', position: 'center' },
  ],
  // Product category pages
  'dry-fruits': [
    { url: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1600&q=85', position: 'center' },
  ],
  'edible-seeds': [
    { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1597462280862-b6fcac4efc8b?w=1600&q=85', position: 'center' },
  ],
  pulses: [
    { url: 'https://images.unsplash.com/photo-1612257997964-44e71a6c2bdf?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=1600&q=85', position: 'center' },
  ],
  spices: [
    { url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=85', position: 'center' },
  ],
  'herbal-powders': [
    { url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=85', position: 'center' },
  ],
  grains: [
    { url: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&q=85', position: 'center' },
    { url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=85', position: 'center' },
  ],
}

const OVERLAYS = {
  about:          'linear-gradient(90deg,rgba(10,30,18,0.82)0%,rgba(10,30,18,0.55)45%,rgba(10,30,18,0.2)100%)',
  quality:        'linear-gradient(90deg,rgba(20,10,5,0.85)0%,rgba(20,10,5,0.58)45%,rgba(20,10,5,0.15)100%)',
  sourcing:       'linear-gradient(90deg,rgba(8,24,14,0.84)0%,rgba(8,24,14,0.56)45%,rgba(8,24,14,0.15)100%)',
  infrastructure: 'linear-gradient(90deg,rgba(12,20,10,0.83)0%,rgba(12,20,10,0.55)45%,rgba(12,20,10,0.15)100%)',
  sustainability: 'linear-gradient(90deg,rgba(6,24,14,0.84)0%,rgba(6,24,14,0.56)45%,rgba(6,24,14,0.15)100%)',
  contact:        'linear-gradient(90deg,rgba(10,18,12,0.86)0%,rgba(10,18,12,0.58)45%,rgba(10,18,12,0.18)100%)',
  products:       'linear-gradient(90deg,rgba(10,28,16,0.84)0%,rgba(10,28,16,0.56)45%,rgba(10,28,16,0.15)100%)',
  'dry-fruits':   'linear-gradient(90deg,rgba(30,15,5,0.85)0%,rgba(30,15,5,0.60)45%,rgba(30,15,5,0.12)100%)',
  'edible-seeds': 'linear-gradient(90deg,rgba(5,20,12,0.84)0%,rgba(5,20,12,0.56)45%,rgba(5,20,12,0.12)100%)',
  pulses:         'linear-gradient(90deg,rgba(10,22,8,0.86)0%,rgba(10,22,8,0.58)45%,rgba(10,22,8,0.12)100%)',
  spices:         'linear-gradient(90deg,rgba(20,8,2,0.88)0%,rgba(20,8,2,0.62)45%,rgba(20,8,2,0.12)100%)',
  'herbal-powders':'linear-gradient(90deg,rgba(8,24,14,0.87)0%,rgba(8,24,14,0.60)45%,rgba(8,24,14,0.12)100%)',
  grains:         'linear-gradient(90deg,rgba(12,18,6,0.86)0%,rgba(12,18,6,0.58)45%,rgba(12,18,6,0.12)100%)',
}

export default function PageHero({ page, badge, headline, subtext }) {
  const slides = PAGE_SLIDES[page] || PAGE_SLIDES.about
  const overlay = OVERLAYS[page] || OVERLAYS.about

  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)
  const touchStart = useRef(null)

  const goTo = useCallback((i) => { setActive(i); setAnimKey(k => k + 1) }, [])
  const next = useCallback(() => goTo((active + 1) % slides.length), [active, goTo, slides.length])
  const prev = useCallback(() => goTo((active - 1 + slides.length) % slides.length), [active, goTo, slides.length])

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  const onTouchStart = e => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = e => {
    if (!touchStart.current) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStart.current = null
  }

  return (
    <div
      className="page-hero"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div className="ph-bg">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`ph-slide${i === active ? ' active' : ''}`}
            style={{ backgroundImage: `url(${s.url})`, backgroundPosition: s.position }}
          />
        ))}
        <div className="ph-overlay" style={{ background: overlay }} />
      </div>

      {/* Content */}
      <div className="ph-content container" key={animKey}>
        {badge && <div className="ph-badge">{badge}</div>}
        <h1 className="ph-headline">{headline}</h1>
        {subtext && <p className="ph-sub">{subtext}</p>}
      </div>

      {/* Arrows */}
      <button className="ph-arrow ph-prev" onClick={prev} aria-label="Previous"><ChevronLeft size={22}/></button>
      <button className="ph-arrow ph-next" onClick={next} aria-label="Next"><ChevronRight size={22}/></button>

      {/* Dots */}
      <div className="ph-dots">
        {slides.map((_, i) => (
          <button key={i} className={`ph-dot${i === active ? ' active' : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>

      {/* Progress */}
      <div className="ph-progress" key={`${animKey}-p`} />
    </div>
  )
}
