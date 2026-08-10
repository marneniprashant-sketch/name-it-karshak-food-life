import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Facebook, Youtube } from '../utils/socialIcons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="Karshak Food Life" className="footer-logo-img" />
            <div>
              <strong>Karshak Food Life</strong>
              <p>Nature's Bounty, Ethically Sourced.</p>
            </div>
          </div>
          <p className="footer-desc">
            Premium agricultural food products sourced with care and delivered with uncompromising quality.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><Instagram size={18}/></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18}/></a>
            <a href="#" aria-label="Facebook"><Facebook size={18}/></a>
            <a href="#" aria-label="YouTube"><Youtube size={18}/></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Products</h4>
          <Link to="/products/dry-fruits">Dry Fruits</Link>
          <Link to="/products/edible-seeds">Edible Seeds</Link>
          <Link to="/products/pulses">Pulses</Link>
          <Link to="/products/spices">Spices</Link>
          <Link to="/products/herbal-powders">Herbal Powders</Link>
          <Link to="/products/grains">Grains</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/quality">Quality</Link>
          <Link to="/infrastructure">Infrastructure</Link>
          <Link to="/sourcing">Sourcing</Link>
          <Link to="/sustainability">Sustainability</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Business</h4>
          <Link to="/contact">Bulk Enquiry</Link>
          <Link to="/contact">Become a Distributor</Link>
          <Link to="/contact">Private Label</Link>
          <Link to="/contact">Contact Sales</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+918919499446">📞 +91 89194 99446</a>
          <span style={{fontStyle:'italic', fontSize:'12px', color:'rgba(255,255,255,0.4)'}}>Email: Coming soon</span>
          <span style={{lineHeight:'1.6', marginTop:'4px'}}>
            📍 Flat No-503, New Srusti Home's,<br />
            ESI Metro Pillar No-1010,<br />
            SR Nagar, Hyderabad,<br />
            Telangana – 500038
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} Karshak Food Life. All rights reserved.</span>
          <span>Premium Agricultural Products | B2B Supply</span>
        </div>
        {/* dev:AvinashChowdary */}
        <span data-owner="AvinashChowdary" aria-hidden="true" style={{position:'absolute',opacity:0,fontSize:0,pointerEvents:'none',userSelect:'none',color:'transparent'}}>AvinashChowdary</span>
      </div>
    </footer>
  )
}
