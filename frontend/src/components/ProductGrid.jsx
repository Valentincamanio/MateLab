// components/ProductGrid.jsx
import { useState } from 'react';
import { useProductos, useCategorias } from '../hooks/useProductos';
import ProductCard from './ProductCard';

const styles = {
  section: { padding: '5rem 2.5rem', background: 'var(--blanco-roto)' },
  header: { marginBottom: '3rem', textAlign: 'center' },
  eyebrow: {
    fontSize: '0.75rem', fontWeight: 500,
    letterSpacing: '3px', textTransform: 'uppercase',
    color: 'var(--arena)', marginBottom: '0.8rem',
  },
  h2: {
    fontFamily: 'var(--fuente-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 600, color: 'var(--negro)',
    marginBottom: '1rem',
  },
  toolbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap',
  },
  filtros: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  filtroBtnBase: {
    padding: '0.45rem 1.1rem',
    border: '1.5px solid #d4cfc8',
    borderRadius: '2rem',
    background: 'transparent',
    color: 'var(--gris-medio)',
    fontSize: '0.82rem', fontWeight: 500,
    letterSpacing: '0.3px',
    transition: 'all var(--transicion)',
  },
  filtroBtnActivo: {
    background: 'var(--negro)',
    color: 'var(--arena)',
    border: '1.5px solid var(--negro)',
  },
  searchInput: {
    padding: '0.45rem 1rem',
    border: '1.5px solid #d4cfc8',
    borderRadius: 'var(--radio)',
    background: 'var(--blanco)',
    color: 'var(--negro)',
    fontSize: '0.85rem',
    outline: 'none',
    width: '200px',
    transition: 'border-color var(--transicion)',
    fontFamily: 'var(--fuente-body)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  loading: {
    textAlign: 'center', padding: '5rem 0',
    color: 'var(--gris-medio)', fontSize: '0.95rem',
  },
  error: {
    textAlign: 'center', padding: '3rem',
    color: 'var(--acento)',
    background: '#fff5f3',
    borderRadius: 'var(--radio-lg)',
    border: '1px solid #f5cdc5',
  },
  count: { fontSize: '0.82rem', color: 'var(--gris-medio)' },
};

const ICONO_CAT = {
  remeras:    '👕',
  pantalones: '👖',
  mochilas:   '🎒',
  zapatillas: '👟',
  medias:     '🧦',
};

export default function ProductGrid() {
  const [categoriaActiva, setCategoriaActiva] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const { categorias } = useCategorias();
  const { productos, loading, error } = useProductos({
    categoria: categoriaActiva,
    q: busqueda,
  });

  return (
    <section style={styles.section} id="productos">
      <div style={styles.header}>
        <div style={styles.eyebrow}>Nuestros productos</div>
        <h2 style={styles.h2}>La colección completa</h2>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.filtros}>
          <button
            style={{
              ...styles.filtroBtnBase,
              ...(categoriaActiva === '' ? styles.filtroBtnActivo : {}),
            }}
            onClick={() => setCategoriaActiva('')}
          >
            Todos
          </button>
          {categorias.map(cat => (
            <button
              key={cat.nombre}
              style={{
                ...styles.filtroBtnBase,
                ...(categoriaActiva === cat.nombre ? styles.filtroBtnActivo : {}),
              }}
              onClick={() => setCategoriaActiva(cat.nombre)}
            >
              {ICONO_CAT[cat.nombre] || '•'} {cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1)}
              <span style={{ marginLeft: '0.3rem', opacity: 0.6 }}>({cat.cantidad})</span>
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={styles.searchInput}
          onFocus={e  => e.target.style.borderColor = 'var(--arena)'}
          onBlur={e   => e.target.style.borderColor = '#d4cfc8'}
        />
      </div>

      {!loading && !error && (
        <div style={{ ...styles.count, marginBottom: '1.2rem' }}>
          {productos.length} producto{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''}
        </div>
      )}

      {loading && <div style={styles.loading}>Cargando productos...</div>}

      {error && (
        <div style={styles.error}>
          <strong>Error al cargar los productos:</strong> {error}
          <br /><small>Asegurate de que la API esté corriendo en el puerto 3001.</small>
        </div>
      )}

      {!loading && !error && (
        <div style={styles.grid}>
          {productos.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }} className="animate-fadeUp">
              <ProductCard producto={p} />
            </div>
          ))}
          {productos.length === 0 && (
            <div style={{ ...styles.loading, gridColumn: '1/-1' }}>
              No hay productos que coincidan con tu búsqueda.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
