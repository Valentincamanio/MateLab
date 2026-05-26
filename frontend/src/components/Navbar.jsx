// components/Navbar.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'var(--negro)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 2.5rem',
    height: '68px',
    borderBottom: '1px solid var(--gris-oscuro)',
  },
  logo: {
    fontFamily: 'var(--fuente-display)',
    fontSize: '1.8rem', fontWeight: 600,
    color: 'var(--blanco)',
    letterSpacing: '1px',
  },
  logoAccent: { color: 'var(--arena)' },
  links: {
    display: 'flex', alignItems: 'center', gap: '2.5rem',
  },
  link: {
    color: 'var(--gris-claro)',
    fontSize: '0.85rem', fontWeight: 400,
    letterSpacing: '1.5px', textTransform: 'uppercase',
    transition: 'color var(--transicion)',
    background: 'none', border: 'none', padding: 0,
  },
  cartBtn: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    background: 'var(--arena)',
    color: 'var(--negro)',
    border: 'none',
    padding: '0.55rem 1.2rem',
    borderRadius: 'var(--radio)',
    fontSize: '0.85rem', fontWeight: 500,
    letterSpacing: '0.5px',
    transition: 'background var(--transicion)',
  },
  badge: {
    background: 'var(--acento)',
    color: 'white',
    fontSize: '0.65rem', fontWeight: 700,
    width: '18px', height: '18px',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
};

const LINKS = [
  { label: 'Inicio',    href: '#inicio'    },
  { label: 'Productos', href: '#productos'  },
  { label: 'Nosotros',  href: '#nosotros'  },
];

export default function Navbar() {
  const { count, toggleCart } = useCart();
  const [hover, setHover] = useState(null);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        One<span style={styles.logoAccent}>Twice</span>
      </div>

      <div style={styles.links}>
        {LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              ...styles.link,
              color: hover === href ? 'var(--blanco)' : 'var(--gris-claro)',
            }}
            onMouseEnter={() => setHover(href)}
            onMouseLeave={() => setHover(null)}
          >
            {label}
          </a>
        ))}

        <button
          style={styles.cartBtn}
          onClick={toggleCart}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--arena-claro)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--arena)'}
        >
          🛍 Carrito
          {count > 0 && <span style={styles.badge}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}
