import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, CreditCard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Cart.css'

const RAZORPAY_KEY = 'rzp_test_TOYVrn88icWLM2'

function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalItems } = useCart()
  const navigate = useNavigate()

  const totalAmount = items.reduce((sum, i) => {
    const price = parseFloat(i.price) || 0
    const weight = i.selectedWeight || i.unit || '1kg'
    const weightMap = { '500g': 0.5, '1kg': 1, '2kg': 2, '3kg': 3, '4kg': 4, '5kg': 5 }
    const multiplier = weightMap[weight] || 1
    return sum + (price * multiplier * i.qty)
  }, 0)

  const hasPrice = items.some(i => i.price)

  const handleRazorpay = async () => {
    const loaded = await loadRazorpay()
    if (!loaded) { alert('Payment gateway failed to load. Please try again.'); return }

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(totalAmount * 100), // paise
      currency: 'INR',
      name: 'Karshak Food Life',
      description: items.map(i => `${i.name} (${i.selectedWeight || i.unit || ''})`).join(', '),
      image: '/logo.png',
      handler: function(response) {
        clearCart()
        navigate('/contact?payment=success&pid=' + response.razorpay_payment_id)
      },
      prefill: {},
      theme: { color: '#176B3A' },
      modal: { ondismiss: function() {} }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const buildWhatsAppMsg = () => {
    const lines = items.map(i => `• ${i.name}${i.localName ? ` (${i.localName})` : ''} — Qty: ${i.qty} ${i.unit || 'kg'}`)
    return encodeURIComponent(`Hello Karshak Food Life! I would like to enquire about the following products:\n\n${lines.join('\n')}\n\nPlease share availability and pricing. Thank you.`)
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/918919499446?text=${buildWhatsAppMsg()}`, '_blank')
  }

  const handleEnquiry = () => {
    navigate('/contact')
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <ShoppingBag size={64} />
          <h2>Your cart is empty</h2>
          <p>Browse our products and add items to your cart.</p>
          <Link to="/products" className="btn-primary">Browse Products <ArrowRight size={15}/></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container cart-inner">
        <div className="cart-header">
          <h1>Your Cart <span>({totalItems} item{totalItems !== 1 ? 's' : ''})</span></h1>
          <button className="cart-clear" onClick={clearCart}>Clear All</button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <Link to={`/products/${item.category}/${item.slug}`} className="cart-item-name">{item.name}</Link>
                  {item.localName && <span className="cart-item-local">{item.localName}</span>}
                  {item.price && <span className="cart-item-price">Rs. {item.price} / {item.unit}</span>}
                  {!item.price && <span className="cart-item-price-tbd">Price on enquiry</span>}
                </div>
                <div className="cart-qty-row">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={13}/></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={13}/></button>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={16}/>
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map(item => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} ({item.selectedWeight || item.unit}) × {item.qty}</span>
                  <span>{item.price ? `Rs. ${(parseFloat(item.price) * (({'500g':0.5,'1kg':1,'2kg':2,'3kg':3,'4kg':4,'5kg':5}[item.selectedWeight||item.unit]||1)) * item.qty).toFixed(0)}` : '—'}</span>
                </div>
              ))}
            </div>
            {hasPrice && (
              <div className="summary-total">
                <span>Total</span>
                <strong>Rs. {totalAmount.toFixed(0)}</strong>
              </div>
            )}
            <div className="summary-note">
              <p>Prices shown are indicative. Final pricing will be confirmed on enquiry.</p>
            </div>
            <div className="cart-actions">
              {hasPrice && RAZORPAY_KEY !== 'YOUR_RAZORPAY_KEY_ID' && (
                <button className="cart-pay-btn" onClick={handleRazorpay}>
                  <CreditCard size={16}/> Pay Rs. {totalAmount.toFixed(0)} Online
                </button>
              )}
              <button className="cart-wa-btn" onClick={handleWhatsApp}>
                <svg viewBox="0 0 32 32" width="18" height="18" fill="white"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.522.686 4.882 1.88 6.91L2 30l7.338-1.848A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.34 19.34c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.102 1.366-.204.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.936-2.408-.204-.348-.022-.536.154-.71.158-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.088-.174-.784-1.888-1.074-2.586-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.61.088-.93.436-.32.348-1.218 1.19-1.218 2.902s1.246 3.366 1.42 3.598c.174.232 2.45 3.74 5.934 5.244.83.358 1.478.572 1.982.732.832.264 1.59.226 2.188.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.318-.232-.666-.406z"/></svg>
                Send via WhatsApp
              </button>
              <button className="btn-primary" onClick={handleEnquiry} style={{width:'100%',justifyContent:'center'}}>
                <MessageSquare size={15}/> Send Enquiry
              </button>
            </div>
            <Link to="/products" className="cart-continue">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
