import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import PageHero from '../components/PageHero'
import './AllProducts.css'

const formTypes = ['All', 'Whole', 'Powder', 'Seed', 'Nut', 'Pulse', 'Grain']

export default function AllProducts() {
  const { products, categories, loading } = useProducts()
  const [searchParams] = useSearchParams()
  const [q, setQ] = useState(searchParams.get('q') || '')
  const [activeCat, setActiveCat] = useState('all')

  if (loading) return <div style={{paddingTop:'120px',textAlign:'center',minHeight:'60vh',color:'#888'}}>Loading products...</div>

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCat === 'all' || p.category === activeCat
      const query = q.toLowerCase()
      const matchQ = !q || p.name.toLowerCase().includes(query) || (p.localName||'').toLowerCase().includes(query) || p.shortDescription.toLowerCase().includes(query)
      return matchCat && matchQ
    })
  }, [q, activeCat, products])

  return (
    <div className="all-products-page">
      <PageHero page="products" badge="Our Products" headline="Explore Our Range" subtext="Premium dry fruits, seeds, pulses, spices, herbal powders and grains." />
      <div className="container ap-body">
        {/* Search */}
        <div className="ap-search-row">
          <div className="ap-search">
            <Search size={18} />
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              placeholder="Search: Badam, Almonds, Turmeric, Rajma, Chia..."
            />
          </div>
        </div>
        {/* Category filters */}
        <div className="ap-filters">
          <button className={activeCat==='all'?'filter-btn active':'filter-btn'} onClick={()=>setActiveCat('all')}>All Products</button>
          {categories.map(c=>(
            <button key={c.id} className={activeCat===c.id?'filter-btn active':'filter-btn'} onClick={()=>setActiveCat(c.id)}>{c.label}</button>
          ))}
        </div>
        <p className="ap-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        <div className="ap-grid">
          {filtered.map(p => (
            <Link key={p.id} to={`/products/${p.category}/${p.slug}`} className="product-card">
              <div className="product-card-img">
                <img src={p.image} alt={p.name} />
                <span className="product-cat-tag">{categories.find(c=>c.id===p.category)?.label}</span>
              </div>
              <div className="product-card-body">
                <h4>{p.name}</h4>
                {p.localName && <span className="local-name">{p.localName}</span>}
                <p className="prod-desc">{p.shortDescription}</p>
                <span className="product-link">View Product <ArrowRight size={13}/></span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="ap-empty">
            <p>No products found for "<strong>{q}</strong>". Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
}
