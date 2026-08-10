import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { fetchProducts, pushProducts, initBin } from '../data/productStore'
import { categories } from '../data/products'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load from JSONBin on mount
  useEffect(() => {
    initBin().then(() => {
      fetchProducts().then(prods => {
        setProducts(prods)
        setLoading(false)
      })
    })
  }, [])

  // Re-read on storage event (same browser tab changes)
  const refresh = useCallback(() => {
    fetchProducts().then(prods => setProducts(prods))
  }, [])

  useEffect(() => {
    window.addEventListener('kfl_products_updated', refresh)
    return () => window.removeEventListener('kfl_products_updated', refresh)
  }, [refresh])

  const updateProduct = async (id, changes) => {
    const updated = products.map(p => p.id === id ? { ...p, ...changes } : p)
    setProducts(updated)
    await pushProducts(updated)
  }

  const getProductsByCategory = (catId) => products.filter(p => p.category === catId)
  const getProductBySlug = (catId, slug) => products.find(p => p.category === catId && p.slug === slug)
  const searchProducts = (q) => {
    const query = q.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      (p.localName || '').toLowerCase().includes(query) ||
      p.shortDescription.toLowerCase().includes(query)
    )
  }

  return (
    <ProductContext.Provider value={{ products, categories, loading, updateProduct, getProductsByCategory, getProductBySlug, searchProducts, refresh }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
