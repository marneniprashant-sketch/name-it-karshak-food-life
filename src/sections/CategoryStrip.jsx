import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products'
import './CategoryStrip.css'

export default function CategoryStrip() {
  return (
    <div className="cat-strip">
      <div className="container cat-strip-inner">
        {categories.map(cat => (
          <Link key={cat.id} to={`/products/${cat.id}`} className="cat-strip-item">
            <span className="cat-dot" />
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
