import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Save, X, CheckCircle, Plus, Trash2 } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import './AdminProducts.css'

/* ── Auth guard ─────────────────────────────────────────────────────────── */
function Guard() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (sessionStorage.getItem('kfl_admin') !== 'true') {
      navigate('/admin')
    }
  }, [navigate])
  return null
}

/* ── ImgBB upload helper ────────────────────────────────────────────────── */
async function uploadToImgBB(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch('https://api.imgbb.com/1/upload?key=6ce29011c68ab8a14526f46876b23b54', {
    method: 'POST',
    body: formData,
  })
  const json = await res.json()
  if (!json.success) throw new Error('ImgBB upload failed')
  return json.data.url
}

/* ── Edit view ──────────────────────────────────────────────────────────── */
function EditView({ product, form, upd, setForm, handleImg, handleSave, cancelEdit, saved, uploading, imgbbKey, setImgbbKey }) {
  return (
    <div className="adm-edit-view">
      <div className="adm-edit-header">
        <button className="adm-cancel-btn" onClick={cancelEdit}><X size={15} /> Back to Products</button>
        <h2>Edit: {product.name}</h2>
      </div>

      {saved ? (
        <div className="adm-saved-banner">
          <div className="adm-saved-msg"><CheckCircle size={18} /> Changes saved to cloud successfully!</div>
          <p style={{ fontSize: '12px', color: '#555', margin: '6px 0 12px' }}>Image and all details are now live for all users on every device.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="adm-save-btn" onClick={() => cancelEdit()}>← Back to Products</button>
          </div>
        </div>
      ) : (
        <div className="adm-edit-form">
          <div className="adm-form-row">
            <label>Name<input value={form.name || ''} onChange={upd('name')} /></label>
            <label>Local Name<input value={form.localName || ''} onChange={upd('localName')} /></label>
          </div>
          <div className="adm-form-row">
            <label>Price<input value={form.price || ''} onChange={upd('price')} /></label>
            <label>Unit<input value={form.unit || ''} onChange={upd('unit')} /></label>
          </div>
          <div className="adm-form-row">
            <label>Origin<input value={form.origin || ''} onChange={upd('origin')} /></label>
            <label>Availability<input value={form.availability || ''} onChange={upd('availability')} /></label>
          </div>
          <label>Short Description<textarea rows={2} value={form.shortDescription || ''} onChange={upd('shortDescription')} /></label>
          <label>Overview<textarea rows={3} value={form.overview || ''} onChange={upd('overview')} /></label>
          <div className="adm-form-row">
            <label>Grades (comma-separated)<input value={form.grades || ''} onChange={upd('grades')} /></label>
            <label>Packaging (comma-separated)<input value={form.packaging || ''} onChange={upd('packaging')} /></label>
          </div>
          <label>Applications (comma-separated)<input value={form.applications || ''} onChange={upd('applications')} /></label>
          <label>Highlights (one per line)<textarea rows={4} value={form.highlights || ''} onChange={upd('highlights')} /></label>

          <div className="adm-img-section">
            <label>Image URL<input value={form.image || ''} onChange={upd('image')} placeholder="https://..." /></label>
            <div className="adm-img-upload">
              <label className="adm-upload-btn">
                Upload Image
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
              </label>
              {uploading && <span style={{ fontSize: '12px', color: '#666' }}>Uploading…</span>}
              {form.image && !form.image.startsWith('data:') && (
                <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', marginTop: '4px' }}>Image saved permanently to cloud</p>
              )}
              {form.image && form.image.startsWith('data:') && (
                <p style={{ fontSize: '11px', color: '#e53935', textAlign: 'center', marginTop: '4px', fontWeight: 600 }}>
                  ⚠ Upload failed — paste a URL instead
                </p>
              )}
            </div>
            <label>ImgBB API Key (optional)
              <input
                value={imgbbKey}
                onChange={e => {
                  setImgbbKey(e.target.value)
                  localStorage.setItem('kfl_imgbb_key', e.target.value)
                }}
                placeholder="Your ImgBB API key"
              />
            </label>
          </div>

          <div className="adm-save-row">
            <button className="adm-save-btn" onClick={handleSave} disabled={uploading}><Save size={15} /> Save Changes</button>
            <button className="adm-cancel-btn" onClick={cancelEdit}><X size={15} /> Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function AdminProducts() {
  const { products, categories, updateProduct, addProduct, deleteProduct } = useProducts()

  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({})
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imgbbKey, setImgbbKey] = useState(
    () => localStorage.getItem('kfl_imgbb_key') || ''
  )

  const allProducts = products

  /* filtered product list */
  const filtered = allProducts.filter(p => {
    const matchesCat = catFilter === 'all' || p.category === catFilter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.localName && p.localName.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  function startEdit(p) {
    setEditing(p.id)
    setForm({
      name: p.name || '',
      localName: p.localName || '',
      price: p.price || '',
      unit: p.unit || '',
      origin: p.origin || '',
      availability: p.availability || '',
      shortDescription: p.shortDescription || '',
      overview: p.overview || '',
      highlights: Array.isArray(p.highlights) ? p.highlights.join('\n') : (p.highlights || ''),
      grades: Array.isArray(p.grades) ? p.grades.join(', ') : (p.grades || ''),
      packaging: Array.isArray(p.packaging) ? p.packaging.join(', ') : (p.packaging || ''),
      applications: Array.isArray(p.applications) ? p.applications.join(', ') : (p.applications || ''),
      image: p.image || '',
    })
  }

  function cancelEdit() {
    setEditing(null)
    setAdding(false)
    setForm({})
    setSaved(false)
  }

  function startAdd() {
    setAdding(true)
    setEditing(null)
    setSaved(false)
    setForm({ category: categories[0]?.id || 'dry-fruits', unit: 'per kg', availability: 'Bulk / Retail' })
  }

  async function handleAddSave() {
    const toArray = (val, sep = ',') =>
      typeof val === 'string' ? val.split(sep).map(s => s.trim()).filter(Boolean) : val || []
    await addProduct({
      name: form.name || 'New Product',
      localName: form.localName || '',
      category: form.category || 'dry-fruits',
      price: form.price || '',
      unit: form.unit || 'per kg',
      origin: form.origin || '',
      availability: form.availability || 'Bulk / Retail',
      shortDescription: form.shortDescription || '',
      overview: form.overview || '',
      highlights: toArray(form.highlights, '\n'),
      grades: toArray(form.grades),
      packaging: toArray(form.packaging),
      applications: toArray(form.applications),
      image: form.image || '',
    })
    setSaved(true)
    setTimeout(() => { setAdding(false); setForm({}); setSaved(false) }, 1500)
  }

  const upd = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleImg(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadToImgBB(file)
      setForm(f => ({ ...f, image: url }))
    } catch (err) {
      alert('Image upload failed: ' + err.message + '\nPlease paste an image URL instead.')
      setForm(f => ({ ...f, image: '' }))
    } finally {
      setUploading(false)
    }
  }

  function handleSave() {
    const toArray = (val, sep = ',') =>
      typeof val === 'string'
        ? val.split(sep).map(s => s.trim()).filter(Boolean)
        : val || []

    updateProduct(editing, {
      name: form.name,
      localName: form.localName,
      price: form.price,
      unit: form.unit,
      origin: form.origin,
      availability: form.availability,
      shortDescription: form.shortDescription,
      overview: form.overview,
      highlights: toArray(form.highlights, '\n'),
      grades: toArray(form.grades),
      packaging: toArray(form.packaging),
      applications: toArray(form.applications),
      image: form.image,
    })

    setSaved(true)
  }

  const editingProduct = editing ? products.find(p => p.id === editing) : null

  return (
    <div className="adm-prod-page">
      <Guard />
      {editing && editingProduct ? (
        <EditView
          product={editingProduct}
          form={form}
          upd={upd}
          setForm={setForm}
          handleImg={handleImg}
          handleSave={handleSave}
          cancelEdit={cancelEdit}
          saved={saved}
          setSaved={setSaved}
          uploading={uploading}
          imgbbKey={imgbbKey}
          setImgbbKey={setImgbbKey}
        />
      ) : adding ? (
        <div className="adm-edit-view">
          <div className="adm-edit-header">
            <button className="adm-cancel-btn" onClick={cancelEdit}><X size={15} /> Cancel</button>
            <h2>Add New Product</h2>
          </div>
          {saved ? (
            <div className="adm-saved-banner">
              <div className="adm-saved-msg"><CheckCircle size={18} /> Product added successfully!</div>
            </div>
          ) : (
            <div className="adm-edit-form">
              <div className="adm-form-row">
                <label>Product Name *<input value={form.name || ''} onChange={upd('name')} placeholder="e.g. Black Sesame Seeds" /></label>
                <label>Local / Indian Name<input value={form.localName || ''} onChange={upd('localName')} placeholder="e.g. Kala Til" /></label>
              </div>
              <div className="adm-form-row">
                <label>Category *
                  <select value={form.category || ''} onChange={upd('category')}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </label>
                <label>Price (Rs.)<input value={form.price || ''} onChange={upd('price')} placeholder="e.g. 450" /></label>
              </div>
              <div className="adm-form-row">
                <label>Unit<input value={form.unit || ''} onChange={upd('unit')} placeholder="per kg" /></label>
                <label>Origin<input value={form.origin || ''} onChange={upd('origin')} placeholder="e.g. Rajasthan" /></label>
              </div>
              <label>Availability<input value={form.availability || ''} onChange={upd('availability')} placeholder="Bulk / Retail" /></label>
              <label>Short Description<textarea rows={2} value={form.shortDescription || ''} onChange={upd('shortDescription')} /></label>
              <label>Overview<textarea rows={3} value={form.overview || ''} onChange={upd('overview')} /></label>
              <div className="adm-form-row">
                <label>Grades (comma-separated)<input value={form.grades || ''} onChange={upd('grades')} /></label>
                <label>Packaging (comma-separated)<input value={form.packaging || ''} onChange={upd('packaging')} /></label>
              </div>
              <label>Applications (comma-separated)<input value={form.applications || ''} onChange={upd('applications')} /></label>
              <label>Highlights (one per line)<textarea rows={3} value={form.highlights || ''} onChange={upd('highlights')} /></label>
              <div className="adm-img-section">
                <label>Image URL<input value={form.image || ''} onChange={upd('image')} placeholder="https://..." /></label>
                <div className="adm-img-upload">
                  <label className="adm-upload-btn">
                    Upload Image
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImg} />
                  </label>
                  {uploading && <span style={{ fontSize: '12px', color: '#666' }}>Uploading…</span>}
                </div>
              </div>
              <div className="adm-save-row">
                <button className="adm-save-btn" onClick={handleAddSave} disabled={!form.name || uploading}>
                  <Plus size={15} /> Add Product
                </button>
                <button className="adm-cancel-btn" onClick={cancelEdit}><X size={15} /> Cancel</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="adm-prod-header">
            <h1>Products ({allProducts.length})</h1>
            <button className="adm-add-btn" onClick={startAdd}><Plus size={15} /> Add New Product</button>
          </div>

          {/* Filters */}
          <div className="adm-prod-filters">
            <div className="adm-search-wrap">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="adm-cat-tabs">
              <button
                className={catFilter === 'all' ? 'active' : ''}
                onClick={() => setCatFilter('all')}
              >
                All ({allProducts.length})
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={catFilter === c.id ? 'active' : ''}
                  onClick={() => setCatFilter(c.id)}
                >
                  {c.name} ({allProducts.filter(p => p.category === c.id).length})
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="adm-prod-table-wrap">
            <table className="adm-prod-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Origin</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const cat = categories.find(c => c.id === p.category)
                  return (
                    <tr key={p.id}>
                      <td>
                        {p.image
                          ? <img src={p.image} alt={p.name} className="adm-thumb" />
                          : <div className="adm-thumb-placeholder">No image</div>
                        }
                      </td>
                      <td>
                        <div className="adm-prod-name">{p.name}</div>
                        {p.localName && <div className="adm-prod-local">{p.localName}</div>}
                      </td>
                      <td>{cat ? cat.name : p.category}</td>
                      <td>{p.price} {p.unit}</td>
                      <td>{p.origin}</td>
                      <td>{p.availability}</td>
                      <td>
                        <div style={{display:'flex',gap:'6px'}}>
                          <button className="adm-edit-btn" onClick={() => startEdit(p)}>Edit</button>
                          <button className="adm-del-btn" onClick={() => { if(window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id) }} title="Delete">
                            <Trash2 size={13}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
