import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { categories } from '../data/products'
import './B2BSection.css'

export default function B2BSection() {
  const [form, setForm] = useState({ name:'', company:'', email:'', phone:'', country:'', category:'', product:'', quantity:'', packaging:'', message:'' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="b2b-section">
      <div className="container b2b-inner">
        <div className="b2b-text">
          <div className="section-label">B2B &amp; Wholesale</div>
          <h2>Looking for<br />Bulk Supply?</h2>
          <p>
            Connect with Karshak Food Life for product availability, packaging options
            and business enquiries. We supply distributors, wholesalers, retailers,
            food manufacturers and private-label customers.
          </p>
          <div className="b2b-badges">
            <span>Bulk Supply</span>
            <span>Private Label</span>
            <span>Custom Packaging</span>
            <span>Export</span>
          </div>
        </div>

        <div className="b2b-form-wrap">
          {sent ? (
            <div className="form-success">
              <div className="success-icon">✓</div>
              <h3>Enquiry Received</h3>
              <p>Thank you for reaching out. Our team will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="b2b-form">
              <h3>Submit Inquiry</h3>
              <div className="form-row">
                <input name="name" placeholder="Name *" value={form.name} onChange={handle} required />
                <input name="company" placeholder="Company" value={form.company} onChange={handle} />
              </div>
              <div className="form-row">
                <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handle} required />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handle} />
              </div>
              <div className="form-row">
                <input name="country" placeholder="Country" value={form.country} onChange={handle} />
                <select name="category" value={form.category} onChange={handle}>
                  <option value="">Product Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-row">
                <input name="product" placeholder="Product Name" value={form.product} onChange={handle} />
                <input name="quantity" placeholder="Required Quantity" value={form.quantity} onChange={handle} />
              </div>
              <input name="packaging" placeholder="Packaging Requirement" value={form.packaging} onChange={handle} />
              <textarea name="message" placeholder="Message" rows={4} value={form.message} onChange={handle} />
              <button type="submit" className="btn-primary">
                Submit Inquiry <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
