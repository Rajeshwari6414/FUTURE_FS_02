import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext()
const initial = { items: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD': {
      const { product, qty } = action.payload
      const exists = state.items.find(i => i.product.id === product.id)
      let items
      if (exists) {
        items = state.items.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i)
      } else {
        items = [...state.items, { product, qty }]
      }
      return { ...state, items }
    }
    case 'UPDATE': {
      const { id, qty } = action.payload
      const items = state.items.map(i => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)
      return { ...state, items }
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.product.id !== action.payload)
      return { ...state, items }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    const raw = localStorage.getItem('cart_v1')
    if (raw) dispatch({ type: 'INIT', payload: JSON.parse(raw) })
  }, [])

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(state))
  }, [state])

  const addItem = (product, qty = 1) => dispatch({ type: 'ADD', payload: { product, qty } })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE', payload: { id, qty } })
  const removeItem = id => dispatch({ type: 'REMOVE', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR' })
  const total = state.items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ state, addItem, updateQty, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
