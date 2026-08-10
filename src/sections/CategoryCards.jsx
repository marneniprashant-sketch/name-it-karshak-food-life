import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import './CategoryCards.css'

export default function CategoryCards() {
  const { categories } = useProducts()
  return (
    <section className="cat-cards-section">
      <div className="container">
        <div className="section-label" style={{textAlign:'center'}}>Our Range</div>
        <h2 className="section-title">Explore Our Products</h2>
        <p className="section-sub">From everyday essentials to premium natural ingredients.</p>
        <div className="cat-cards-grid">
          {categories.map(cat => (
            <Link key={cat.id} to={`/products/${cat.id}`} className="cat-card">
              <div className="cat-card-img">
                <img src={cat.image} alt={cat.label} />
                <div className="cat-card-overlay" />
              </div>
              <div className="cat-card-body">
                <h3>{cat.label}</h3>
                <p>{cat.description}</p>
                <span className="cat-card-link">
                  Explore Category <ArrowRight size={15} className="cat-arrow" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
