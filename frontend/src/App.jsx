// App.jsx — Componente raíz
// Orquesta el layout completo. No contiene lógica de negocio.

import { CartProvider } from './context/CartContext';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import ProductGrid  from './components/ProductGrid';
import CartSidebar  from './components/CartSidebar';
import Footer       from './components/Footer';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <Footer />
      </main>
      <CartSidebar />
    </CartProvider>
  );
}
