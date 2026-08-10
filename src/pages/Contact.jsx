import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Send } from "lucide-react"
import { categories } from "../data/products"
import PageHero from "../components/PageHero"
import "./Contact.css"

export default function Contact() {
  const [form, setForm] = useState({
    name:"", company:"", email:"", phone:"",
    country:"", category:"", product:"",
    quantity:"", packaging:"", message:""
  })
  const [sent, setSent] = useState(false)
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => { e.preventDefault(); setSent(true) }

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
                <a href="tel:+918919499446" style={{color:"inherit", fontStyle:"normal"}}>+91 89194 99446</a>
              </div>
              <div>
                <strong>Email</strong>
                <span>Coming soon</span>
              </div>
              <div>
                <strong>Location</strong>
                <span>Flat No-503, New Srusti Home&apos;s,<br/>ESI Metro Pillar No-1010,<br/>SR Nagar, Hyderabad,<br/>Telangana - 500038</span>
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
                <input name="name" placeholder="Name" value={form.name} onChange={handle} required />
                <input name="company" placeholder="Company" value={form.company} onChange={handle} />
              </div>
              <div className="form-row">
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handle} required />
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
              <button type="submit" className="btn-primary submit-btn">Submit Inquiry <Send size={15}/></button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
