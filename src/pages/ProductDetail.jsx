import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, MessageSquare, Phone, ChevronDown, ChevronUp, ShoppingCart, Zap, Plus, Minus } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import PageHero from '../components/PageHero'
import './ProductDetail.css'

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion${open?' open':''}`}>
      <button className="accordion-btn" onClick={()=>setOpen(!open)}>
        {title}
        {open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  )
}

export default function ProductDetail() {
  const { category, slug } = useParams()
  const navigate = useNavigate()
  const { getProductBySlug, getProductsByCategory, categories } = useProducts()
  const { addToCart } = useCart()
  const product = getProductBySlug(category, slug)
  const cat = categories.find(c => c.id === category)
  const related = getProductsByCategory(category).filter(p => p.slug !== slug).slice(0, 4)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, qty)
    navigate('/cart')
  }

  if (!product) return (
    <div style={{paddingTop:'120px',textAlign:'center',minHeight:'60vh'}}>
      <h2>Product not found</h2>
      <Link to="/products" className="btn-primary" style={{marginTop:'20px',display:'inline-flex'}}>View All Products</Link>
    </div>
  )

  return (
    <div className="product-detail-page">
      <PageHero
        page={category}
        badge={cat?.label}
        headline={product.name}
        subtext={product.shortDescription}
      />
      <div className="container pd-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <Link to={`/products/${category}`}>{cat?.label}</Link> / <span>{product.name}</span>
      </div>

      <div className="container pd-main">
        {/* Left: Image */}
        <div className="pd-images">
          <div className="pd-main-img">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* Right: Details */}
        <div className="pd-info">
          <div className="pd-cat-tag">{cat?.label}</div>
          <h1>{product.name}</h1>
          {product.localName && <p className="pd-local">{product.localName}</p>}
          <p className="pd-intro">{product.shortDescription}</p>

          <div className="pd-meta">
            <div><span>Product</span><strong>{product.name}</strong></div>
            <div><span>Category</span><strong>{cat?.label}</strong></div>
            <div><span>Availability</span><strong>Bulk / Retail</strong></div>
            <div><span>Origin</span><strong>{product.origin || 'To be updated'}</strong></div>
            <div><span>Packaging</span><strong>To be updated</strong></div>
          </div>

          {/* Qty + Cart + Buy Now */}
          <div className="pd-qty-row">
            <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={14}/></button>
            <span className="pd-qty-val">{qty}</span>
            <button className="pd-qty-btn" onClick={() => setQty(q => q + 1)}><Plus size={14}/></button>
            <span className="pd-qty-unit">{product.unit || 'kg'}</span>
          </div>

          <div className="pd-actions">
            <button className={`btn-primary${added ? ' pd-added' : ''}`} onClick={handleAddToCart}>
              <ShoppingCart size={16}/> {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
            <button className="btn-gold" onClick={handleBuyNow}>
              <Zap size={16}/> Buy Now
            </button>
          </div>
          <div className="pd-action-links">
            <Link to="/contact"><MessageSquare size={13}/> Request Bulk Quote</Link>
            <Link to="/contact"><Phone size={13}/> Contact Sales</Link>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="container pd-accordions">
        <Accordion title="Product Overview">
          <p>{product.overview}</p>
        </Accordion>
        <Accordion title="Product Highlights">
          {product.highlights?.length > 0 ? (
            <ul>{product.highlights.map(h=><li key={h}>{h}</li>)}</ul>
          ) : <p>Details to be updated.</p>}
        </Accordion>
        <Accordion title="Available Grades">
          <p>Grade information will be provided upon enquiry.</p>
        </Accordion>
        <Accordion title="Packaging Options">
          <p>Custom packaging options available. Contact us for requirements.</p>
        </Accordion>
        <Accordion title="Applications">
          {product.applications?.length > 0 ? (
            <div className="app-tags">
              {product.applications.map(a=><span key={a}>{a}</span>)}
            </div>
          ) : <p>Details to be updated.</p>}
        </Accordion>
        <Accordion title="Quality & Processing">
          <p>Our products are cleaned, sorted and processed in hygienic facilities. Quality is checked at each stage before dispatch.</p>
        </Accordion>
        <Accordion title="Storage Information">
          <p>Store in a cool, dry place away from direct sunlight. Keep in airtight containers after opening.</p>
        </Accordion>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="container pd-related">
          <h2>Related Products</h2>
          <div className="related-grid">
            {related.map(p => (
              <Link key={p.id} to={`/products/${p.category}/${p.slug}`} className="product-card">
                <div className="product-card-img">
                  <img src={p.image} alt={p.name} />
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
      )}
    </div>
  )
}
