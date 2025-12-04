import Link from 'next/link'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem(product, 1)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="bg-white shadow rounded-xl p-4">

      <img 
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="mt-4 text-xl font-bold text-gray-900">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <div className="mt-4 flex gap-3">

        {/* 💚 UPDATED GREEN ADD BUTTON */}
        <button 
          onClick={handleAdd}
          className="flex-1 px-3 py-2 bg-[#0f766e] text-white
          font-semibold rounded-lg hover:bg-[#115e59] transition"
        >
          Add
        </button>

        {/* 💚 UPDATED GREEN BORDER FOR VIEW */}
        <Link 
          href={`/product/${product.id}`}
          className="px-3 py-2 border border-[#0f766e] text-[#0f766e]
          rounded-lg hover:bg-[#e6f5f3] transition text-center"
        >
          View
        </Link>
      </div>
    </div>
  )
}
