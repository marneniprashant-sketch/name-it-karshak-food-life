import React from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './StaticPage.css'

export default function Quality() {
  return (
    <div className="static-page">
      <PageHero page="quality" badge="Standards" headline="Quality You Can Trust" subtext="Our commitment to quality runs through every stage of our supply chain." />
      <div className="container static-body">
        <div className="static-2col">
          <div>
            <h2>Our Quality Philosophy</h2>
            <p>Quality at Karshak Food Life is not a department or a checklist — it is embedded in every decision we make, from selecting our sources to the final packaging and dispatch.</p>
            <h2>Quality Workflow</h2>
            <p>Every product batch follows a structured process: sourcing → sorting → cleaning → quality inspection → packaging → dispatch. Each stage is monitored to maintain consistency and safety standards.</p>
            <h2>Certifications</h2>
            <p>Certification details will be updated once formally verified. We will display accurate certification information here when available.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1596273501815-e56e41a0a6d2?w=700&q=80" alt="Quality dry fruits" style={{borderRadius:'16px',width:'100%'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
