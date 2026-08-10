import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Sun, Droplets } from 'lucide-react'
import './SustainabilitySnippet.css'

export default function SustainabilitySnippet() {
  return (
    <section className="sustain-section">
      <div className="container sustain-inner">
        <div className="sustain-text">
          <div className="section-label">Sustainability</div>
          <h2>Farming the<br />Right Way.</h2>
          <p>
            At Karshak Food Life, sustainability is central to how we source and operate.
            We work with farming communities who follow responsible agricultural practices
            and prioritise the long-term health of the land.
          </p>
          <Link to="/sustainability" className="btn-primary">Our Sustainability Approach</Link>
        </div>
        <div className="sustain-cards">
          {[
            { icon: Leaf, title: 'Responsible Sourcing', desc: 'Partnering with farms that follow sustainable land practices.' },
            { icon: Sun, title: 'Natural Processing', desc: 'Minimising chemical intervention throughout our processing chain.' },
            { icon: Droplets, title: 'Resource Efficiency', desc: 'Committed to reducing water and energy usage in operations.' },
          ].map(c => {
            const Icon = c.icon
            return (
              <div key={c.title} className="sustain-card">
                <div className="sustain-icon"><Icon size={20} /></div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
