import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Save, X, Upload, ArrowLeft, Eye, Edit3, CheckCircle } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import './AdminProducts.css'

function Guard({ children }) {
  const navigate = useNavigate()
  const ok = sessionStorage.getItem('kfl_admin') === 'true'
  React.useEffect(() => { if (!ok) navigate('/admin') }, [ok, navigate])
  if (!ok) return null
  return children
}

function EditView({ product, form, upd, handleImg, handleSave, cancelEdit, saved, uploading }) {
  return (
    <Guard>
      <div className="adm-prod-page">
        <div className="adm-prod-header">
          <button className="adm-back-btn" onClick={cancelEdit}><ArrowLeft size={15} /> Back</button>
          <h1>Edit: {product.name}</h1>
          <a href={'/products/' + product.category + '/' + product.slug} target="_blank" rel="noreferrer" className="adm-live-btn">
            <Eye size={14} /> Live Page
          </a>
        </div>
        <div className="adm-edit-layout">
          <div className="adm-edit-left">
            <div className="adm-img-preview">
              {form.image && !form.image.startsWith('data:')
                ? <img src={form.image} alt="Product" />
                : <div className="adm-img-placeholder"><Upload size={32} /><span>{uploading ? 'Uploading...' : 'No image'}</span></div>
              }
            </div>
            <label className="adm-upload-btn" style={uploading ? {opacity:0.6,pointerEvents:'none'} : {}}>
              <Upload size={15} /> {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" onChange={handleImg} style={{ display: 'none' }} />
            </label>
            <p style={{fontSize:'11px',color:'#999',textAlign:'center',marginTop:'4px'}}>Uploads to cloud — permanent URL</p>
            <input className="adm-field-input" placeholder="Or paste image URL" value={form.image.startsWith('data:') ? '' : form.image} onChange={upd('image')} style={{marginTop:'8px'}} />
          </div>
          <div className="adm-edit-right">
            <div className="adm-edit-grid">
              <div className="adm-field"><label>Product Name</label><input value={form.name} onChange={upd('name')} /></div>
              <div className="adm-field"><label>Local Name</label><input value={form.localName} onChange={upd('localName')} /></div>
              <div className="adm-field"><label>Price (Rs.)</label><input value={form.price} placeholder="e.g. 850" onChange={upd('price')} /></div>
              <div className="adm-field">
                <label>Unit</label>
                <select value={form.unit} onChange={upd('unit')}>
                  <option>per kg</option><option>per 100g</option><option>per tonne</option><option>per bag</option><option>per box</option>
                </select>
              </div>
              <div className="adm-field"><label>Origin</label><input value={form.origin} placeholder="e.g. Maharashtra" onChange={upd('origin')} /></div>
              <div className="adm-field"><label>Availability</label><input value={form.availability} onChange={upd('availability')} /></div>
            </div>
            <div className="adm-field full"><label>Short Description</label><input value={form.shortDescription} onChange={upd('shortDescription')} /></div>
            <div className="adm-field full"><label>Overview</label><textarea rows={4} value={form.overview} onChange={upd('overview')} /></div>
            <div className="adm-field full"><label>Highlights <span className="adm-hint">comma separated</span></label><input value={form.highlights} onChange={upd('highlights')} /></div>
            <div className="adm-field full"><label>Grades <span className="adm-hint">comma separated</span></label><input value={form.grades} onChange={upd('grades')} /></div>
            <div className="adm-field full"><label>Packaging Options <span className="adm-hint">comma separated</span></label><input value={form.packaging} onChange={upd('packaging')} /></div>
            <div className="adm-field full"><label>Applications <span className="adm-hint">comma separated</span></label><input value={form.applications} onChange={upd('applications')} /></div>
            <div className="adm-save-row">
              {saved ? (
                <div className="adm-saved-msg"><CheckCircle size={16} /> Saved permanently!</div>
              ) : (
                <>
                  <button className="adm-save-btn" onClick={handleSave} disabled={uploading}><Save size={15} /> Save Changes</button>
                  <button className="adm-cancel-btn" onClick={cancelEdit}><X size={15} /> Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Guard>
  )
}

function ListView({ products, categories, filtered, search, setSearch, catFilter, setCatFilter, startEdit }) {
  const navigate = useNavigate()
  return (
    <Guard>
      <div className="adm-prod-page">
        <div className="adm-prod-header">
          <button className="adm-back-btn" onClick={() => navigate('/admin/dashboard')}><ArrowLeft size={15} /> Dashboard</button>
          <h1>Product Management</h1>
          <a href="/products" target="_blank" rel="noreferrer" className="adm-live-btn"><Eye size={14} /> View Live</a>
        </div>
        <div className="adm-prod-filters">
          <div className="adm-search-wrap">
            <Search size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or Indian name..." />
          </div>
          <div className="adm-cat-tabs">
            <button className={catFilter === 'all' ? 'active' : ''} onClick={() => setCatFilter('all')}>All ({products.length})</button>
            {categories.map(c => (
              <button key={c.id} className={catFilter === c.id ? 'active' : ''} onClick={() => setCatFilter(c.id)}>
                {c.label} ({products.filter(p => p.category === c.id).length})
              </button>
            ))}
          </div>
        </div>
        <div className="adm-prod-table-wrap">
          <table className="adm-prod-table">
            <thead>
              <tr><th>Image</th><th>Product</th><th>Category</th><th>Price</th><th>Origin</th><th>Availability</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><img src={p.image} alt={p.name} className="adm-thumb" /></td>
                  <td>
                    <strong>{p.name}</strong>
                    {p.localName && <span className="adm-local"> — {p.localName}</span>}
                    <div className="adm-desc">{(p.shortDescription || '').slice(0, 60)}...</div>
                  </td>
                  <td><span className="adm-cat-chip">{categories.find(c => c.id === p.category)?.label}</span></td>
                  <td>{p.price ? <span className="adm-price">Rs.{p.price} <small>{p.unit}</small></span> : <span className="adm-tbd">Not set</span>}</td>
                  <td>{p.origin || <span className="adm-tbd">—</span>}</td>
                  <td>{p.availability || 'Bulk / Retail'}</td>
                  <td><button className="adm-edit-btn" onClick={() => startEdit(p)}><Edit3 size={13} /> Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Guard>
  )
}

export default function AdminProducts() {
  const { products, categories, updateProduct } = useProducts()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const matchCat = catFilter === 'all' || p.category === catFilter
    const matchQ = !q || p.name.toLowerCase().includes(q) || (p.localName || '').toLowerCase().includes(q)
    return matchCat && matchQ
  })

  const startEdit = (p) => {
    setEditing(p.id)
    setSaved(false)
    setForm({
      name: p.name || '', localName: p.localName || '',
      shortDescription: p.shortDescription || '', overview: p.overview || '',
      origin: p.origin || '', price: p.price || '', unit: p.unit || 'per kg',
      availability: p.availability || 'Bulk / Retail',
      packaging: (p.packaging || []).join(', '), grades: (p.grades || []).join(', '),
      applications: (p.applications || []).join(', '), highlights: (p.highlights || []).join(', '),
      image: p.image || '',
    })
  }

  const cancelEdit = () => { setEditing(null); setForm({}) }
  const upd = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const handleImg = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await fetch('https://api.imgbb.com/1/upload?key=6ce29011c68ab8a14526f46876b23b54', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setForm(prev => ({ ...prev, image: data.data.url }))
      } else {
        alert('Image upload failed. Please paste an image URL instead.')
      }
    } catch {
      alert('Image upload failed. Please paste an image URL instead.')
    }
    setUploading(false)
  }

  const handleSave = () => {
    const imageToSave = (form.image && form.image.startsWith('data:')) ? '' : form.image
    updateProduct(editing, {
      ...form,
      image: imageToSave,
      packaging: form.packaging.split(',').map(s => s.trim()).filter(Boolean),
      grades: form.grades.split(',').map(s => s.trim()).filter(Boolean),
      applications: form.applications.split(',').map(s => s.trim()).filter(Boolean),
      highlights: form.highlights.split(',').map(s => s.trim()).filter(Boolean),
    })
    setSaved(true)
    setTimeout(() => { setSaved(false); setEditing(null) }, 1400)
  }

  const product = editing ? products.find(p => p.id === editing) : null

  if (editing && product) {
    return <EditView product={product} form={form} upd={upd} handleImg={handleImg} handleSave={handleSave} cancelEdit={cancelEdit} saved={saved} uploading={uploading} />
  }

  return <ListView products={products} categories={categories} filtered={filtered} search={search} setSearch={setSearch} catFilter={catFilter} setCatFilter={setCatFilter} startEdit={startEdit} />
}