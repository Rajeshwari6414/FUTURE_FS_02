import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { state, updateQty, removeItem, total } = useCart()

  if (!state.items.length)
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link href="/shop" className="mt-4 inline-block px-4 py-2 bg-[#0f766e] text-white rounded-lg">Go to Shop</Link>
      </div>
    )

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#e6f5f3] max-h-screen">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {state.items.map(item => (
          <div key={item.product.id} className="flex gap-4 p-4 bg-white shadow rounded-xl">
            <img src={item.product.image} className="w-24 h-16 object-cover rounded-lg" />

            <div className="flex-1">
              <div className="text-lg font-semibold">{item.product.name}</div>
              <div className="text-gray-600">
                ₹{item.product.price} × {item.qty} = <strong>₹{item.product.price * item.qty}</strong>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="px-3 py-1 border rounded">-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="px-3 py-1 border rounded">+</button>

                <button onClick={() => removeItem(item.product.id)} className="ml-4 text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-6">
        <div className="text-xl font-bold">Total: ₹{total}</div>
        <Link href="/checkout" className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
