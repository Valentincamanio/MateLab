// context/CartContext.jsx
// Estado global del carrito usando Context API + useReducer.
// Ningún componente maneja el estado del carrito directamente.

import { createContext, useContext, useReducer, useCallback } from 'react';

/* ── Estado inicial ─────────────────────────────────────── */

const initialState = {
  items: [],       // [{ producto, cantidad }]
  isOpen: false,   // visibilidad del sidebar
};

/* ── Reducer ─────────────────────────────────────────────── */

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existe = state.items.find(i => i.producto.id === action.producto.id);
      if (existe) {
        return {
          ...state,
          items: state.items.map(i =>
            i.producto.id === action.producto.id
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { producto: action.producto, cantidad: 1 }] };
    }

    case 'REMOVE': {
      const existe = state.items.find(i => i.producto.id === action.id);
      if (!existe) return state;
      if (existe.cantidad > 1) {
        return {
          ...state,
          items: state.items.map(i =>
            i.producto.id === action.id ? { ...i, cantidad: i.cantidad - 1 } : i
          ),
        };
      }
      return { ...state, items: state.items.filter(i => i.producto.id !== action.id) };
    }

    case 'CLEAR':
      return { ...state, items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

/* ── Contexto ────────────────────────────────────────────── */

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart     = useCallback((producto) => dispatch({ type: 'ADD', producto }), []);
  const removeFromCart = useCallback((id)       => dispatch({ type: 'REMOVE', id }),  []);
  const clearCart     = useCallback(()          => dispatch({ type: 'CLEAR' }),        []);
  const toggleCart    = useCallback(()          => dispatch({ type: 'TOGGLE_CART' }), []);
  const closeCart     = useCallback(()          => dispatch({ type: 'CLOSE_CART' }),  []);

  const total = state.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  const count = state.items.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <CartContext.Provider value={{ ...state, total, count, addToCart, removeFromCart, clearCart, toggleCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

/* ── Hook de acceso ─────────────────────────────────────── */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
