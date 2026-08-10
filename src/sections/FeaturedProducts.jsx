import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import './FeaturedProducts.css'

const FEATURED_SLUGS = ['almonds','cashews','pistachios','chia-seeds','turmeric','black-peppercorns','chickpeas','moringa-powder']

export default function FeaturedProducts() {
  const { products } = useProducts()
  const featured = FEATURED_SLUGS.map(slug => products.find(p => p.slug === slug)).filter(Boolean)
  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-label" style={{textAlign:'center'}}>Best Sellers</div>
        <h2 className="section-title">Popular Products</h2>
        <p className="section-sub">Our most requested products for bulk and retail supply.</p>
        <div className="featured-grid">
          {featured.map(p => (
            <Link key={p.id} to={`/products/${p.category}/${p.slug}`} className="product-card">
              <div className="product-card-img">
                <img src={p.image} alt={p.name} />
                <span className="product-cat-tag">{p.category.replace(/-/g,' ')}</span>
              </div>
              <div className="product-card-body">
                <h4>{p.name}</h4>
                {p.localName && <span className="local-name">{p.localName}</span>}
                <span className="product-link">View Product <ArrowRight size={13}/></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
