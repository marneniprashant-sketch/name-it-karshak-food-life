import React from 'react'
import { Award, Globe, Handshake, Microscope, RefreshCw } from 'lucide-react'
import './WhyKarshak.css'

const reasons = [
  { icon: Award, title: 'Premium Quality', desc: 'Consistent grading and quality across every batch we supply.' },
  { icon: Globe, title: 'Export-Ready', desc: 'Products prepared and packed to meet domestic and international standards.' },
  { icon: Handshake, title: 'Reliable Supply', desc: 'Steady sourcing networks ensure availability and timely delivery.' },
  { icon: Microscope, title: 'Careful Processing', desc: 'Hygienic facilities and careful handling at every processing stage.' },
  { icon: RefreshCw, title: 'Flexible Packaging', desc: 'Custom packaging options for bulk, retail and private-label requirements.' },
]

export default function WhyKarshak() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="section-label" style={{textAlign:'center'}}>Why Choose Us</div>
        <h2 className="section-title">Why Karshak Food Life</h2>
        <p className="section-sub">What sets us apart as a premium agricultural supply partner.</p>
        <div className="why-grid">
          {reasons.map(r => {
            const Icon = r.icon
            return (
              <div key={r.title} className="why-card">
                <div className="why-icon"><Icon size={24} /></div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
