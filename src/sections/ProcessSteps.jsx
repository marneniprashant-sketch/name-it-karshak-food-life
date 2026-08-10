import React from 'react'
import { Leaf, SlidersHorizontal, ShieldCheck, Sprout, Package } from 'lucide-react'
import './ProcessSteps.css'

const steps = [
  { num: '01', icon: Leaf, title: 'Responsible Sourcing', desc: 'Carefully selecting agricultural sources known for consistent quality and ethical practices.' },
  { num: '02', icon: SlidersHorizontal, title: 'Careful Selection', desc: 'Every batch is evaluated for size, colour, aroma and grade before entering our supply chain.' },
  { num: '03', icon: ShieldCheck, title: 'Quality Inspection', desc: 'Rigorous inspection at every stage to ensure product meets our quality benchmarks.' },
  { num: '04', icon: Sprout, title: 'Hygienic Processing', desc: 'Cleaned, sorted and processed in hygienic facilities to retain natural properties.' },
  { num: '05', icon: Package, title: 'Secure Packaging & Delivery', desc: 'Packed in appropriate formats and delivered safely to distributors and customers.' },
]

export default function ProcessSteps() {
  return (
    <section className="process-section">
      <div className="container">
        <div className="section-label" style={{textAlign:'center'}}>Our Process</div>
        <h2 className="section-title">From Source to Quality</h2>
        <p className="section-sub">Every product follows a consistent, quality-driven journey.</p>
        <div className="process-track">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.num} className="process-step">
                <div className="step-num">{s.num}</div>
                <div className="step-icon-wrap">
                  <Icon size={24} />
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
