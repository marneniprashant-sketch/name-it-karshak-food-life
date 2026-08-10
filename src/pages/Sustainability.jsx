import React from 'react'
import PageHero from '../components/PageHero'
import './StaticPage.css'

export default function Sustainability() {
  return (
    <div className="static-page">
      <PageHero page="sustainability" badge="Sustainability" headline="Farming the Right Way." subtext="Sustainability is at the core of how we source and operate." />
      <div className="container static-body">
        <div className="static-2col">
          <div>
            <h2>Our Approach</h2>
            <p>At Karshak Food Life, sustainability means supporting farming communities that respect the land, reducing waste in our processing chain, and building a supply model that works for the long term.</p>
            <h2>Responsible Sourcing</h2>
            <p>We actively seek out agricultural sources that follow responsible land-use practices and avoid harmful chemical inputs where possible.</p>
            <h2>Packaging & Waste</h2>
            <p>We are working towards packaging solutions that reduce environmental impact without compromising product protection and shelf life.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=700&q=80" alt="Sustainability and farming" style={{borderRadius:'16px',width:'100%'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
