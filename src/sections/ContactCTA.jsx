import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Phone } from 'lucide-react'
import './ContactCTA.css'

export default function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container cta-inner">
        <div className="cta-text">
          <h2>Ready to Partner<br />with Karshak?</h2>
          <p>Reach out for bulk enquiries, product availability, pricing and business partnerships.</p>
        </div>
        <div className="cta-actions">
          <Link to="/contact" className="btn-primary"><MessageSquare size={16} /> Get in Touch</Link>
          <Link to="/contact" className="btn-outline-green"><Phone size={16} /> Talk to Sales</Link>
        </div>
      </div>
    </section>
  )
}
