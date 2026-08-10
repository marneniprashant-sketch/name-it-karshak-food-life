import React from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './StaticPage.css'

export default function Sourcing() {
  return (
    <div className="static-page">
      <PageHero page="sourcing" badge="Sourcing" headline="Responsible Sourcing" subtext="Building relationships with trusted farmers and agricultural partners." />
      <div className="container static-body">
        <div className="static-2col">
          <div>
            <h2>How We Source</h2>
            <p>We partner with established agricultural communities and growers who share our commitment to quality and ethical production practices.</p>
            <p>Each sourcing relationship is built on transparency, fair trade principles, and a shared focus on product consistency.</p>
            <h2>Traceability</h2>
            <p>We maintain records of the origin of key product lines, enabling supply chain transparency for our customers and business partners.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=700&q=80" alt="Sourcing agriculture" style={{borderRadius:'16px',width:'100%'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
