import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Toaster position="top-right"/>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
