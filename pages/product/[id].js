import { useRouter } from 'next/router'
import products from '../../data/products.json'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'
import Link from 'next/link'

// same deterministic rating function (keep consistent)
function getRating(id) {
  const n = Number(id) || parseInt(String(id).replace(/\D/g, '') || '0', 10) || 1
  const val = ((n * 37) % 41) / 10 + 1
  return Math.round(val * 10) / 10
}

function StarRowLarge({ rating }) {
  // simple larger star row for product page
  const full = Math.floor(rating)
  const decimal = Math.round((rating - full) * 10)
  const half = decimal >= 3 && decimal <= 7
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= full) {
      stars.push(<svg key={i} className="w-6 h-6 text-yellow-400 inline-block" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.387 2.462c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.608 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" /></svg>)
    } else if (i === full + 1 && half) {
      stars.push(<svg key={i} className="w-6 h-6 text-yellow-400 inline-block" viewBox="0 0 20 20" fill="currentColor"><defs><linearGradient id="g2"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs><path fill="url(#g2)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.387 2.462c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.608 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z"/></svg>)
    } else {
      stars.push(<svg key={i} className="w-6 h-6 text-gray-300 inline-block" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.387 2.462c-.785.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.608 9.401c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" /></svg>)
    }
  }
  return <div className="inline-flex items-center gap-2">{stars} <span className="text-gray-600">{rating}</span></div>
}

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find(p => String(p.id) === String(id))
  const { addItem } = useCart()

  if (!product) return <div className="p-6">Loading...</div>

  const rating = getRating(product.id)

  const handleAdd = () => {
    addItem(product, 1)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0f766e]">Mini E-Commerce</h1>
          <nav className="space-x-4">
            <Link href="/shop" className="px-3 py-1 border rounded-md hover:bg-gray-100">Shop</Link>
            <Link href="/cart" className="px-3 py-1 border rounded-md hover:bg-gray-100">Cart</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-[#e6f5f3] shadow rounded-2xl p-6 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img src={product.image + '?auto=format&fit=crop&w=1000&q=70'} alt={product.name} className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <div className="mt-2 flex items-center gap-4">
              <StarRowLarge rating={rating} />
              <div className="text-sm text-gray-500">• {Math.round((rating / 5) * 100)}% positive</div>
            </div>

            <div className="mt-4 text-2xl font-semibold">₹{product.price}</div>

            <p className="mt-4 text-gray-700">
              {product.description || 'High quality product. Add a custom description in data/products.json to show more details.'}
            </p>

            <div className="mt-6 flex gap-3">
              <button onClick={handleAdd} className="px-5 py-3 bg-[#0f766e] text-white rounded-lg hover:bg-green-600">Add to Cart</button>
              <Link href="/cart" className="px-5 py-3 border rounded-lg">View Cart</Link>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              Category: <Link href={`/category/${product.category}`} className="text-green-600 underline">{product.category}</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
