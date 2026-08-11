import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import PageHero from '../components/PageHero'
import './CategoryPage.css'

export default function CategoryPage() {
  const { category } = useParams()
  const { getProductsByCategory, categories } = useProducts()
  const { addToCart } = useCart()
  const cat = categories.find(c => c.id === category)
  const prods = getProductsByCategory(category)

  if (!cat) return (
    <div style={{paddingTop:'120px',textAlign:'center',minHeight:'60vh'}}>
      <h2>Category not found</h2>
      <Link to="/products" className="btn-primary" style={{marginTop:'20px',display:'inline-flex'}}>View All Products</Link>
    </div>
  )

  return (
    <div className="cat-page">
      <PageHero
        page={category}
        badge={cat.label}
        headline={cat.label}
        subtext={cat.description}
      />

      <div className="container cat-page-body">
        <h2>{prods.length} Products in {cat.label}</h2>
        <div className="ap-grid">
          {prods.map(p => (
            <Link key={p.id} to={`/products/${p.category}/${p.slug}`} className="product-card">
              <div className="product-card-img">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="product-card-body">
                <h4>{p.name}</h4>
                {p.localName && <span className="local-name">{p.localName}</span>}
                <p className="prod-desc">{p.shortDescription}</p>
                <div className="pc-footer">
                  <span className="product-link">View Product <ArrowRight size={13}/></span>
                  <button className="pc-cart-btn" onClick={e => { e.preventDefault(); addToCart(p, 1) }} title="Add to Cart">
                    <ShoppingCart size={14}/>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
