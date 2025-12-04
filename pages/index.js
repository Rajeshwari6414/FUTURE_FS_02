import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen 
     bg-gradient-to-br from-[#0f766e] via-[#115e59] to-[#134e4a]">

      <div className="text-center p-10 bg-white/10 backdrop-blur-xl
        shadow-2xl rounded-3xl border border-white/20">

        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-md">
          Welcome to Mini E-Commerce
        </h1>

        <p className="text-lg text-gray-200 mb-6">
          Your simple, clean and modern shopping experience.
        </p>

        <Link
          href="/shop"
          className="px-8 py-3 bg-white text-black font-semibold 
            rounded-xl shadow-lg hover:bg-gray-300 transition"
        >
          To Shop
        </Link>
      </div>
    </div>
  )
}
