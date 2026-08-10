import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './AboutSnippet.css'

export default function AboutSnippet() {
  return (
    <section className="about-snippet">
      <div className="container about-inner">
        <div className="about-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80"
            alt="Indian agriculture and farming"
          />
          <div className="about-img-badge">
            <span>Est.</span>
            <strong>Karshak</strong>
            <span>Food Life</span>
          </div>
        </div>
        <div className="about-text">
          <div className="section-label">About Karshak Food Life</div>
          <h2>Rooted in Quality.</h2>
          <p>
            Karshak Food Life brings carefully selected agricultural products from trusted
            sources to businesses and consumers who value quality, consistency and authenticity.
          </p>
          <p>
            Our range spans dry fruits, edible seeds, pulses, spices, herbal powders and grains —
            each product sourced with care, processed hygienically, and supplied at scale to
            distributors, wholesalers and food manufacturers.
          </p>
          <Link to="/about" className="btn-primary">
            Discover Our Story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
