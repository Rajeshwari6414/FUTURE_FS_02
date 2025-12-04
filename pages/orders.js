import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orders_v1') || '[]')
    setOrders(saved)
  }, [])

  if (orders.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <p>No past orders found.</p>
        <Link href="/" className="text-[0f766e] underline mt-4 inline-block">
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6"
    >
      <h1 className="text-2xl font-bold">Order History</h1>

      {orders.slice().reverse().map((o) => (
        <div key={o.id} className="border p-4 rounded shadow-sm bg-[#e6f5f3]">
          <div className="font-semibold text-lg">
            Order ID: <span className="text-[#0b7a71]">{o.id}</span>
          </div>

          <div className="mt-2">
            <strong>Name:</strong> {o.name}
          </div>

          <div className="mt-1">
            <strong>Email:</strong> {o.email}
          </div>

          <div className="mt-1">
            <strong>Address:</strong> {o.address}
          </div>

          <div className="mt-3">
            <strong>Total Amount:</strong> ₹{o.total}
          </div>

          <div className="mt-3">
            <strong>Order Date:</strong>{' '}
            {new Date(o.createdAt).toLocaleString()}
          </div>

          <div className="mt-4">
            <strong>Items:</strong>
            <ul className="list-disc ml-6 mt-2">
              {o.items.map((item) => (
                <li key={item.product.id}>
                  {item.product.name} — Qty: {item.qty} — ₹{item.product.price * item.qty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <Link href="/" className="text-[#0f766e] underline mt-6 inline-block">
        Back to Home
      </Link>
    </div>
  )
}
