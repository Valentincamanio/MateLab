// components/CartSidebar.jsx
import { useCart } from '../context/CartContext';

function formatPrecio(n) {
  return `$${n.toLocaleString('es-AR')}`;
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(14,14,14,0.65)',
    display: 'flex', justifyContent: 'flex-end',
    transition: 'opacity 0.3s ease',
  },
  panel: {
    width: '420px', maxWidth: '100vw',
    background: 'var(--blanco)',
    height: '100%',
    display: 'flex', flexDirection: 'column',
    animation: 'slideInRight 0.35s cubic-bezier(0.4,0,0.2,1)',
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid #e8e4de',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'var(--fuente-display)',
    fontSize: '1.5rem', fontWeight: 600,
    color: 'var(--negro)',
  },
  closeBtn: {
    width: '34px', height: '34px',
    borderRadius: '50%',
    border: '1.5px solid #e8e4de',
    background: 'transparent',
    color: 'var(--gris-medio)',
    fontSize: '1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background var(--transicion)',
  },
  items: { flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' },
  empty: {
    textAlign: 'center', padding: '4rem 1rem',
    color: 'var(--gris-medio)',
  },
  emptyIcon: { fontSize: '3.5rem', marginBottom: '1rem', display: 'block' },
  emptyText: { fontSize: '0.95rem', lineHeight: 1.7 },
  item: {
    display: 'flex', gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #f0ede8',
    alignItems: 'flex-start',
  },
  itemImg: {
    width: '72px', height: '72px',
    borderRadius: 'var(--radio)',
    objectFit: 'cover', flexShrink: 0,
    background: 'var(--blanco-roto)',
  },
  itemInfo: { flex: 1 },
  itemNombre: { fontSize: '0.9rem', fontWeight: 500, color: 'var(--negro)', marginBottom: '0.25rem', lineHeight: 1.3 },
  itemPrecio: { fontSize: '0.85rem', color: 'var(--arena)', fontWeight: 500, marginBottom: '0.5rem' },
  controles: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  ctrlBtn: {
    width: '26px', height: '26px', borderRadius: '50%',
    border: '1.5px solid #e8e4de',
    background: 'transparent',
    color: 'var(--negro)',
    fontSize: '0.9rem', fontWeight: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background var(--transicion)',
  },
  cant: { fontSize: '0.9rem', fontWeight: 500, minWidth: '20px', textAlign: 'center' },
  footer: { padding: '1.5rem', borderTop: '1px solid #e8e4de' },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    marginBottom: '1.5rem',
  },
  totalLabel: { fontSize: '0.85rem', color: 'var(--gris-medio)' },
  totalValor: {
    fontFamily: 'var(--fuente-display)',
    fontSize: '1.8rem', fontWeight: 600, color: 'var(--negro)',
  },
  checkoutBtn: {
    width: '100%',
    background: 'var(--negro)',
    color: 'var(--arena)',
    border: 'none',
    padding: '1rem',
    borderRadius: 'var(--radio)',
    fontSize: '0.95rem', fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'background var(--transicion)',
    marginBottom: '0.75rem',
  },
  clearBtn: {
    width: '100%', background: 'transparent',
    border: '1.5px solid #e8e4de',
    color: 'var(--gris-medio)',
    padding: '0.65rem',
    borderRadius: 'var(--radio)',
    fontSize: '0.8rem',
    transition: 'border-color var(--transicion), color var(--transicion)',
  },
};

export default function CartSidebar() {
  const { isOpen, items, total, closeCart, addToCart, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  function handleCheckout() {
    if (!items.length) return;
    alert('¡Gracias por tu compra! 🎉\nTe contactaremos para coordinar el pago y envío.');
    clearCart();
    closeCart();
  }

  return (
    <div style={styles.overlay} onClick={e => e.target === e.currentTarget && closeCart()}>
      <div style={styles.panel}>

        <div style={styles.header}>
          <div style={styles.title}>Tu carrito</div>
          <button style={styles.closeBtn} onClick={closeCart}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--blanco-roto)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            ✕
          </button>
        </div>

        <div style={styles.items}>
          {items.length === 0 ? (
            <div style={styles.empty}>
              <span style={styles.emptyIcon}>🛍</span>
              <div style={styles.emptyText}>
                Tu carrito está vacío.<br />
                Explorá la colección y agregá lo que más te guste.
              </div>
            </div>
          ) : (
            items.map(({ producto, cantidad }) => (
              <div key={producto.id} style={styles.item}>
                <img src={producto.imagen} alt={producto.nombre} style={styles.itemImg} />
                <div style={styles.itemInfo}>
                  <div style={styles.itemNombre}>{producto.nombre}</div>
                  <div style={styles.itemPrecio}>
                    {formatPrecio(producto.precio * cantidad)}
                  </div>
                  <div style={styles.controles}>
                    <button style={styles.ctrlBtn} onClick={() => removeFromCart(producto.id)}>−</button>
                    <span style={styles.cant}>{cantidad}</span>
                    <button style={styles.ctrlBtn} onClick={() => addToCart(producto)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.footer}>
          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalValor}>{formatPrecio(total)}</span>
          </div>
          <button style={styles.checkoutBtn} onClick={handleCheckout}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gris-oscuro)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--negro)'}>
            Finalizar compra →
          </button>
          {items.length > 0 && (
            <button style={styles.clearBtn} onClick={clearCart}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--acento)'; e.currentTarget.style.color = 'var(--acento)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e4de'; e.currentTarget.style.color = 'var(--gris-medio)'; }}>
              Vaciar carrito
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
