import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import './Hero.css'

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=85',
    textSide: 'left',
    badge: 'Farm to Life',
    headline: ["Nature's Finest,", 'From Farm to Life.'],
    highlightLine: 0,
    subtext: 'Carefully sourced ingredients.\nNaturally better choices.',
    cta: { label: 'Explore Our Products', to: '/products' },
    overlay: 'linear-gradient(90deg, rgba(8,28,18,0.82) 0%, rgba(8,28,18,0.55) 45%, rgba(8,28,18,0.15) 100%)',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=800&q=85',
    textSide: 'left',
    badge: 'Dry Fruits',
    headline: ['Wholesome Goodness', 'in Every Handful.'],
    highlightLine: 0,
    subtext: 'Premium dry fruits selected for quality,\ntaste and everyday goodness.',
    cta: { label: 'Explore Dry Fruits', to: '/products/dry-fruits' },
    overlay: 'linear-gradient(90deg, rgba(30,15,5,0.85) 0%, rgba(30,15,5,0.60) 45%, rgba(30,15,5,0.10) 100%)',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=85',
    textSide: 'left',
    badge: 'Spices',
    headline: ['Rich Aroma.', 'Authentic Flavour.'],
    highlightLine: 1,
    subtext: 'Naturally sourced spices that bring\ncharacter to every creation.',
    cta: { label: 'Discover Spices', to: '/products/spices' },
    overlay: 'linear-gradient(90deg, rgba(20,8,2,0.88) 0%, rgba(20,8,2,0.62) 45%, rgba(20,8,2,0.12) 100%)',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1612257997964-44e71a6c2bdf?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1612257997964-44e71a6c2bdf?w=800&q=85',
    textSide: 'left',
    badge: 'Pulses & Grains',
    headline: ['Everyday Nutrition,', 'Naturally Sourced.'],
    highlightLine: 1,
    subtext: 'Quality pulses and grains selected\nfor kitchens, businesses and communities.',
    cta: { label: 'Explore Pulses & Grains', to: '/products/pulses' },
    overlay: 'linear-gradient(90deg, rgba(10,22,8,0.86) 0%, rgba(10,22,8,0.58) 45%, rgba(10,22,8,0.12) 100%)',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=85',
    textSide: 'left',
    badge: 'Edible Seeds',
    headline: ['Small Seeds.', 'Naturally Powerful.'],
    highlightLine: 1,
    subtext: 'A carefully selected collection of\npremium edible seeds.',
    cta: { label: 'Explore Seeds', to: '/products/edible-seeds' },
    overlay: 'linear-gradient(90deg, rgba(5,20,12,0.84) 0%, rgba(5,20,12,0.56) 45%, rgba(5,20,12,0.10) 100%)',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=85',
    textSide: 'left',
    badge: 'Herbal Powders',
    headline: ['Rooted in Nature.'],
    highlightLine: 0,
    subtext: 'Traditional botanical ingredients,\ncarefully selected and prepared.',
    cta: { label: 'Explore Herbal Products', to: '/products/herbal-powders' },
    overlay: 'linear-gradient(90deg, rgba(8,24,14,0.87) 0%, rgba(8,24,14,0.60) 45%, rgba(8,24,14,0.12) 100%)',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=1920&q=90',
    mobileImage: 'https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=800&q=85',
    textSide: 'left',
    badge: 'Complete Range',
    headline: ["Nature's Bounty.", 'One Trusted Source.'],
    highlightLine: 0,
    subtext: 'Dry Fruits • Seeds • Pulses • Spices\nHerbal Products • Grains',
    cta: { label: 'View All Products', to: '/products' },
    cta2: { label: 'Request Bulk Quote', to: '/contact' },
    overlay: 'linear-gradient(90deg, rgba(12,28,18,0.88) 0%, rgba(12,28,18,0.62) 45%, rgba(12,28,18,0.12) 100%)',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)

  const goTo = useCallback((idx) => {
    setActive(idx)
    setAnimKey(k => k + 1)
  }, [])

  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo])
  const prev = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo])

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(next, 5000)
    }
    return () => clearInterval(timerRef.current)
  }, [paused, next])

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  const slide = SLIDES[active]

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Hero carousel"
    >
      {/* Background images — all preloaded, only active visible */}
      <div className="hc-bg">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`hc-slide-bg${i === active ? ' active' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hc-overlay" style={{ background: slide.overlay }} />
      </div>

      {/* Content */}
      <div className="hc-content container" key={animKey}>
        <div className="hc-text">
          <div className="hc-badge">{slide.badge}</div>
          <h1 className="hc-headline hc-anim-headline">
            {slide.headline.map((line, i) => (
              <span key={i} className={i === slide.highlightLine ? 'hc-highlight' : ''}>
                {line}
                {i < slide.headline.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hc-sub hc-anim-sub">
            {slide.subtext.split('\n').map((l, i) => (
              <React.Fragment key={i}>{l}{i === 0 && <br />}</React.Fragment>
            ))}
          </p>
          <div className="hc-btns hc-anim-cta">
            <Link to={slide.cta.to} className="hc-btn-primary">
              {slide.cta.label} <ArrowRight size={16} />
            </Link>
            {slide.cta2 && (
              <Link to={slide.cta2.to} className="hc-btn-outline">
                {slide.cta2.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button className="hc-arrow hc-arrow-prev" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>
      <button className="hc-arrow hc-arrow-next" onClick={next} aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="hc-dots" role="tablist" aria-label="Slides">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            className={`hc-dot${i === active ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && <div className="hc-progress" key={`${animKey}-progress`} />}
    </section>
  )
}
