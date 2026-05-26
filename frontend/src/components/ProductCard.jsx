// components/ProductCard.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const BADGE_STYLES = {
  nuevo:  { background: '#1a3a1a', color: '#6fcf6f', label: '✦ Nuevo'  },
  oferta: { background: '#3a1a14', color: '#e88a6f', label: '⚡ Oferta' },
};

const styles = {
  card: {
    background: 'var(--blanco)',
    borderRadius: 'var(--radio-lg)',
    overflow: 'hidden',
    border: '1px solid #e8e4de',
    transition: 'transform var(--transicion), box-shadow var(--transicion)',
    display: 'flex', flexDirection: 'column',
  },
  imageWrap: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
    background: 'var(--blanco-roto)',
  },
  image: {
    width: '100%', height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  badge: {
    position: 'absolute', top: '0.75rem', left: '0.75rem',
    fontSize: '0.68rem', fontWeight: 500,
    padding: '0.25rem 0.7rem',
    borderRadius: 'var(--radio)',
    letterSpacing: '0.5px',
  },
  quickAdd: {
    position: 'absolute', bottom: '0.75rem', right: '0.75rem',
    background: 'var(--negro)',
    color: 'var(--blanco)',
    border: 'none',
    width: '38px', height: '38px',
    borderRadius: '50%',
    fontSize: '1.3rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: 0,
    transition: 'opacity var(--transicion), background var(--transicion)',
  },
  info: { padding: '1rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' },
  categoria: {
    fontSize: '0.7rem', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '1.5px',
    color: 'var(--arena)',
    marginBottom: '0.3rem',
  },
  nombre: {
    fontFamily: 'var(--fuente-display)',
    fontSize: '1.1rem', fontWeight: 600,
    color: 'var(--negro)',
    lineHeight: 1.3,
    marginBottom: '0.5rem',
  },
  colores: {
    display: 'flex', gap: '0.3rem', marginBottom: '0.8rem', flexWrap: 'wrap',
  },
  colorDot: {
    fontSize: '0.7rem',
    color: 'var(--gris-medio)',
    background: 'var(--blanco-roto)',
    padding: '0.15rem 0.5rem',
    borderRadius: '2rem',
  },
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 'auto',
  },
  precio: { fontSize: '1.25rem', fontWeight: 500, color: 'var(--negro)' },
  precioOriginal: {
    fontSize: '0.82rem', color: 'var(--gris-claro)',
    textDecoration: 'line-through', marginLeft: '0.4rem',
  },
  addBtn: {
    background: 'var(--negro)',
    color: 'var(--arena)',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radio)',
    fontSize: '0.8rem', fontWeight: 500,
    transition: 'background var(--transicion)',
  },
};

function formatPrecio(n) {
  return `$${n.toLocaleString('es-AR')}`;
}

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added,   setAdded]   = useState(false);

  const badgeStyle = BADGE_STYLES[producto.badge];

  function handleAdd() {
    addToCart(producto);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article
      style={{
        ...styles.card,
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? 'var(--sombra-hover)' : 'var(--sombra)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.imageWrap}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{ ...styles.image, transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
          loading="lazy"
        />
        {badgeStyle && (
          <span style={{ ...styles.badge, background: badgeStyle.background, color: badgeStyle.color }}>
            {badgeStyle.label}
          </span>
        )}
        <button
          style={{ ...styles.quickAdd, opacity: hovered ? 1 : 0 }}
          onClick={handleAdd}
          title="Agregar al carrito"
        >
          +
        </button>
      </div>

      <div style={styles.info}>
        <div style={styles.categoria}>{producto.categoria}</div>
        <div style={styles.nombre}>{producto.nombre}</div>
        <div style={styles.colores}>
          {producto.colores.slice(0, 3).map(c => (
            <span key={c} style={styles.colorDot}>{c}</span>
          ))}
          {producto.colores.length > 3 && (
            <span style={styles.colorDot}>+{producto.colores.length - 3}</span>
          )}
        </div>
        <div style={styles.footer}>
          <div>
            <span style={styles.precio}>{formatPrecio(producto.precio)}</span>
            {producto.precioOriginal && (
              <span style={styles.precioOriginal}>{formatPrecio(producto.precioOriginal)}</span>
            )}
          </div>
          <button
            style={{
              ...styles.addBtn,
              background: added ? 'var(--arena)' : 'var(--negro)',
              color:      added ? 'var(--negro)' : 'var(--arena)',
            }}
            onClick={handleAdd}
          >
            {added ? '✓ Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}
