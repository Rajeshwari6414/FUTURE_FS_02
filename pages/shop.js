import Link from 'next/link'
import { useMemo, useState } from 'react'
import productsData from '../data/products.json'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('none')
  const [page, setPage] = useState(1)
  const itemsPerPage = 9

  const categories = useMemo(() => {
    const cats = new Set(productsData.map(p => p.category || 'Uncategorized'))
    return ['All', ...Array.from(cats)]
  }, [])

  const filtered = useMemo(() => {
    let list = productsData.slice()

    if (category && category !== 'All')
      list = list.filter(p => (p.category || 'Uncategorized') === category)

    const q = query.trim().toLowerCase()
    if (q)
      list = list.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      )

    if (sort === 'low') list.sort((a, b) => a.price - b.price)
    else if (sort === 'high') list.sort((a, b) => b.price - a.price)

    return list
  }, [query, category, sort])

  // pagination slice
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#0f766e]">Mini E-Commerce</h1>
          <nav className="hidden sm:flex space-x-4">
            <Link href="/cart" className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">Cart</Link>
            <Link href="/checkout" className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">Checkout</Link>
            <Link href="/orders" className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">Orders</Link>
          </nav>
        </div>

        <div className="w-full sm:w-auto flex gap-2 items-center">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search products..."
            className="w-full sm:w-64 p-2 border rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1) }}
            className="p-2 border rounded-lg"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="none">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="text-sm text-gray-600">{filtered.length} item(s) found</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayed.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 p-8 border rounded-lg bg-white">
              No products match your search/filter.
            </div>
          )}
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-[#0f766e] text-white' : 'border'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
