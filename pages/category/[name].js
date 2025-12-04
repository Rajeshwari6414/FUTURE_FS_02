import { useRouter } from 'next/router'
import Link from 'next/link'
import products from '../../data/products.json'
import ProductCard from '../../components/ProductCard'

export default function CategoryPage() {
  const router = useRouter()
  const { name } = router.query

  if (!name) return null

  const filtered = products.filter(p => (p.category || '').toLowerCase() === name.toLowerCase())

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Category: {name}</h1>
        <nav className="space-x-4">
          <Link href="/shop" className="px-4 py-2 border rounded-md hover:bg-gray-100">Shop</Link>
          <Link href="/cart" className="px-4 py-2 border rounded-md hover:bg-gray-100">Cart</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {filtered.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center text-gray-600">No products found for this category.</div>
        )}
      </main>
    </div>
  )
}
