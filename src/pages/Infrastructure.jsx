import React from 'react'
import PageHero from '../components/PageHero'
import './StaticPage.css'

export default function Infrastructure() {
  return (
    <div className="static-page">
      <PageHero page="infrastructure" badge="Infrastructure" headline="Our Infrastructure" subtext="Processing and storage facilities designed for quality and scale." />
      <div className="container static-body">
        <div className="static-2col">
          <div>
            <h2>Processing Facilities</h2>
            <p>Our processing infrastructure is designed to handle agricultural products at scale while maintaining hygiene and quality standards throughout.</p>
            <h2>Storage</h2>
            <p>Temperature-controlled and humidity-managed storage ensures product integrity from receipt through dispatch.</p>
            <h2>Packaging</h2>
            <p>We offer flexible packaging options including bulk bags, retail packs and custom private-label formats to meet customer requirements.</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1574570173583-e9c5ea660975?w=700&q=80" alt="Grains and processing" style={{borderRadius:'16px',width:'100%'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
