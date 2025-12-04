import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { state, clearCart, total } = useCart()
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState(null)

  function validate() {
  const name = (form.name || '').trim();
  const email = (form.email || '').trim();
  const phone = (form.phone || '').trim();
  const address = (form.address || '').trim();

  if (!name || !email || !phone || !address) {
    return 'All fields required';
  }

  // Very clean and correct email validation
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return 'Invalid email format';
  }

  if (!/^\d{10}$/.test(phone)) {
    return 'Phone must be 10 digits';
  }

  if (state.items.length === 0) {
    return 'Cart is empty';
  }

  return null;
}

  function submit(e) {
  e.preventDefault()

  const v = validate()
  if (v) return setError(v)

  const id = 'ORD-' + Math.random().toString(36).slice(2, 9).toUpperCase()

  // Cleaned user data
  const orderData = {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    address: form.address.trim()
  }

  // Save order to localStorage
  const order = {
    id,
    items: state.items,
    total,
    name: orderData.name,
    email: orderData.email,
    address: orderData.address,
    createdAt: Date.now()
  }

  const all = JSON.parse(localStorage.getItem('orders_v1') || '[]')
  all.push(order)
  localStorage.setItem('orders_v1', JSON.stringify(all))

  // Show confirmation screen
  setOrderId(id)

  // Clear the cart
  clearCart()
}

  if (orderId) {
    return (
      <div className="p-6 max-w-4xl mx-auto bg-[#e6f5f3] max-h-screen">
        <h2 className="text-2xl font-bold">Order Confirmed</h2>
        <p className="mt-2">Your order id: <strong>{orderId}</strong></p>
        <button onClick={() => router.push('/')} className="mt-4 px-4 py-2 bg-[#0f6f53] text-white rounded">Back to Home</button>
      </div>
    )
  }

  return (
    
    <div className="p-6 max-w-3xl mx-auto bg-[#e6f5f3] max-h-screen ">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={submit} className="space-y-4">
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" className="w-full p-2 border rounded" />
        <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone (10 digits)" className="w-full p-2 border rounded" />
        <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Shipping address" className="w-full p-2 border rounded"></textarea>

        <div className="text-right">Total: <strong>₹{total}</strong></div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Place Order</button>
      </form>
    </div>
    
  )
}

