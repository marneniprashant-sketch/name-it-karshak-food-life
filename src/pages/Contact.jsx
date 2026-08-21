import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import { categories } from '../data/products'
import { saveEnquiry } from '../data/productStore'
import PageHero from '../components/PageHero'
import './Contact.css'

const W3F_KEY = '133c3246-422d-4838-abdb-db60e264eead'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', category: '', product: '',
    quantity: '', packaging: '', message: ''
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setSubmitting(true)
    // Send email notification via Web3Forms
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          subject: 'New Enquiry from ' + form.name + ' — Karshak Food Life',
          from_name: 'Karshak Food Life Website',
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          country: form.country,
          category: form.category,
          product: form.product,
          quantity: form.quantity,
          packaging: form.packaging,
          message: form.message,
        }),
      })
    } catch (err) { console.warn('Web3Forms error', err) }
    // Also save to JSONBin for admin panel view
    await saveEnquiry(form)
    setSubmitting(false)
    setSent(true)
  }

  return (
    <div className="static-page">
      <PageHero
        page="contact"
        badge="Contact Us"
        headline="Get in Touch"
        subtext="Reach out for bulk enquiries, product availability and business partnerships."
      />
      <div className="container contact-body">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Business Enquiries</h2>
            <p>Use the form to send your enquiry and our team will respond promptly.</p>
            <div className="contact-placeholders">
              <div>
                <strong>Phone</strong>
                <a href="tel:+917569955904" style={{ color: 'inherit', fontStyle: 'normal' }}>+91 75699 55904</a>
              </div>
              <div>
                <strong>Email</strong>
                <a href="mailto:info@karshakfoodlife.com" style={{ color: 'inherit', fontStyle: 'normal' }}>info@karshakfoodlife.com</a>
              </div>
              <div>
                <strong>Head Office</strong>
                <span>SR Nagar, Hyderabad,<br />Telangana – 500038</span>
              </div>
              <div>
                <strong>Branch Office</strong>
                <span>Gullapllali, Cherukupalli Mandal,<br />Bapatla Dt, Andhra Pradesh – 522309</span>
              </div>
              <div>
                <strong>FSSAI License</strong>
                <span>23625030003631</span>
              </div>
              <div>
                <strong>Registration</strong>
                <span>MSME – Ministry of MSME, Govt. of India</span>
              </div>
            </div>
            <div className="contact-links">
              <Link to="/products">Browse Products</Link>
              <Link to="/about">About Karshak</Link>
            </div>
          </div>
          {sent ? (
            <div className="contact-success">
              <div className="success-icon">OK</div>
              <h3>Enquiry Received</h3>
              <p>Thank you. Our team will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form">
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
                <input name="product" placeholder="Product" value={form.product} onChange={handle} />
                <input name="quantity" placeholder="Required Quantity" value={form.quantity} onChange={handle} />
              </div>
              <input className="full-input" name="packaging" placeholder="Packaging Requirement" value={form.packaging} onChange={handle} />
              <textarea name="message" placeholder="Message" rows={5} value={form.message} onChange={handle} />
              <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
                {!submitting && <Send size={15} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
