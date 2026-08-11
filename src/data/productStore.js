// Product store — JSONBin cloud storage for cross-device persistence
import { products as defaultProducts } from './products'

const BIN_ID = '6a797764da38895dfecfd660'
const MASTER_KEY = '$2a$10$iuZ1gbxd8.LMV7bQ2iFjPuplku4WXmKHWnBZc/wQt76jWy8yy.LBG'
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`
const LS_CACHE = 'kfl_products_cache'

const HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key': MASTER_KEY,
  'X-Bin-Versioning': 'false',
}

// Load products from JSONBin (falls back to localStorage cache, then defaults)
export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers: HEADERS })
    const data = await res.json()
    // JSONBin wraps data in { record: { products: [...] } }
    if (data.record && Array.isArray(data.record.products) && data.record.products.length > 0) {
      const prods = data.record.products
      localStorage.setItem(LS_CACHE, JSON.stringify(prods))
      return prods
    }
  } catch (e) {
    console.warn('JSONBin fetch failed, using cache', e)
  }
  // Fallback to localStorage cache
  try {
    const cached = localStorage.getItem(LS_CACHE)
    if (cached) return JSON.parse(cached)
  } catch {}
  return defaultProducts
}

// Save products array to JSONBin
export async function pushProducts(products) {
  // Also save to localStorage as immediate cache
  localStorage.setItem(LS_CACHE, JSON.stringify(products))
  window.dispatchEvent(new Event('kfl_products_updated'))
  try {
    await fetch(BASE_URL, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({ products }),
    })
  } catch (e) {
    console.warn('JSONBin push failed', e)
  }
}

// Sync default products to JSONBin on first use
export async function initBin() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, { headers: HEADERS })
    const data = await res.json()
    // If bin has no products yet, push defaults
    if (!data.record || !Array.isArray(data.record.products) || data.record.products.length === 0) {
      await pushProducts(defaultProducts)
    }
  } catch {}
}

// ── ENQUIRIES ────────────────────────────────────────
// Uses a separate approach: stores enquiries in localStorage + JSONBin
const ENQ_BIN = '6a797764da38895dfecfd660' // same bin

export async function fetchEnquiries() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${ENQ_BIN}/latest`, { headers: HEADERS })
    const data = await res.json()
    const cloud = data.record?.enquiries || []
    // Also merge any localStorage fallback entries
    const local = JSON.parse(localStorage.getItem('kfl_enquiries') || '[]')
    // Merge: cloud first, then any local ones not already in cloud
    const cloudIds = new Set(cloud.map(e => e.id))
    const merged = [...cloud, ...local.filter(e => !cloudIds.has(e.id))]
    return merged
  } catch {
    return JSON.parse(localStorage.getItem('kfl_enquiries') || '[]')
  }
}

export async function saveEnquiry(enquiry) {
  const newEnquiry = {
    ...enquiry,
    id: `ENQ-${Date.now()}`,
    date: new Date().toLocaleDateString('en-IN'),
    status: 'pending',
  }
  try {
    // Read current bin
    const res = await fetch(`https://api.jsonbin.io/v3/b/${ENQ_BIN}/latest`, { headers: HEADERS })
    const data = await res.json()
    const current = data.record || {}
    const enquiries = Array.isArray(current.enquiries) ? current.enquiries : []
    const updated = { ...current, enquiries: [newEnquiry, ...enquiries] }
    // Write back
    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${ENQ_BIN}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(updated),
    })
    if (!putRes.ok) throw new Error('PUT failed: ' + putRes.status)
    return newEnquiry
  } catch (e) {
    // Fallback: save to localStorage so data isn't lost
    console.warn('JSONBin save failed, using localStorage fallback', e)
    try {
      const local = JSON.parse(localStorage.getItem('kfl_enquiries') || '[]')
      local.unshift(newEnquiry)
      localStorage.setItem('kfl_enquiries', JSON.stringify(local))
    } catch {}
    return newEnquiry
  }
}

export async function updateEnquiryStatus(id, status) {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${ENQ_BIN}/latest`, { headers: HEADERS })
    const data = await res.json()
    const current = data.record || {}
    const enquiries = (current.enquiries || []).map(e => e.id === id ? { ...e, status } : e)
    await fetch(`https://api.jsonbin.io/v3/b/${ENQ_BIN}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({ ...current, enquiries }),
    })
  } catch (e) { console.warn('Status update failed', e) }
}
