import React from 'react'
import { MapPin, Filter, Sparkles, ClipboardCheck, Box, Truck } from 'lucide-react'
import './QualitySection.css'

const steps = [
  { icon: MapPin, label: 'Sourcing' },
  { icon: Filter, label: 'Sorting' },
  { icon: Sparkles, label: 'Cleaning' },
  { icon: ClipboardCheck, label: 'Quality Inspection' },
  { icon: Box, label: 'Packaging' },
  { icon: Truck, label: 'Dispatch' },
]

export default function QualitySection() {
  return (
    <section className="quality-section">
      <div className="container">
        <div className="section-label" style={{textAlign:'center'}}>Standards</div>
        <h2 className="section-title">Quality You Can Trust</h2>
        <p className="section-sub">Every product follows a structured quality workflow before it reaches you.</p>
        <div className="quality-flow">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <React.Fragment key={s.label}>
                <div className="qf-step">
                  <div className="qf-icon"><Icon size={22} /></div>
                  <span>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className="qf-arrow">→</div>}
              </React.Fragment>
            )
          })}
        </div>
        <div className="cert-note">
          <p>Certification information will be listed here once verified details are provided.</p>
        </div>
      </div>
    </section>
  )
}
