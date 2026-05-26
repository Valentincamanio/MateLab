// components/Footer.jsx
const styles = {
  nosotros: {
    background: 'var(--negro)',
    padding: '5rem 2.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'center',
  },
  nosotrosText: {},
  eyebrow: {
    fontSize: '0.72rem', fontWeight: 500,
    letterSpacing: '3px', textTransform: 'uppercase',
    color: 'var(--arena)', marginBottom: '1rem',
  },
  h2: {
    fontFamily: 'var(--fuente-display)',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 600, color: 'var(--blanco)',
    marginBottom: '1.5rem', lineHeight: 1.15,
  },
  p: {
    color: 'rgba(250,250,248,0.55)',
    lineHeight: 1.9, fontSize: '0.95rem',
  },
  stats: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem', marginTop: '2.5rem',
  },
  stat: {
    borderTop: '1px solid var(--gris-oscuro)',
    paddingTop: '1rem',
  },
  statNum: {
    fontFamily: 'var(--fuente-display)',
    fontSize: '2.2rem', fontWeight: 600,
    color: 'var(--arena)',
  },
  statLabel: { fontSize: '0.8rem', color: 'var(--gris-claro)', marginTop: '0.2rem' },
  nosotrosImg: {
    borderRadius: 'var(--radio-lg)',
    overflow: 'hidden',
    height: '400px',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' },
  footer: {
    background: 'var(--negro-suave)',
    borderTop: '1px solid var(--gris-oscuro)',
    padding: '2rem 2.5rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  logo: {
    fontFamily: 'var(--fuente-display)',
    fontSize: '1.4rem', fontWeight: 600, color: 'var(--blanco)',
  },
  logoAccent: { color: 'var(--arena)' },
  copy: { fontSize: '0.8rem', color: 'var(--gris-medio)' },
  social: { display: 'flex', gap: '1rem' },
  socialLink: {
    color: 'var(--gris-medio)',
    fontSize: '0.8rem',
    border: '1px solid var(--gris-oscuro)',
    padding: '0.4rem 0.8rem',
    borderRadius: 'var(--radio)',
    transition: 'color var(--transicion), border-color var(--transicion)',
  },
};

export default function Footer() {
  return (
    <>
      <section style={styles.nosotros} id="nosotros">
        <div style={styles.nosotrosText}>
          <div style={styles.eyebrow}>Sobre nosotros</div>
          <h2 style={styles.h2}>Moda con propósito y calidad sin compromiso</h2>
          <p style={styles.p}>
            Somos OneTwice, una marca argentina apasionada por la moda accesible y de calidad.
            Creemos que vestirse bien no debería ser un lujo, sino un derecho. Cada prenda que
            ofrecemos fue pensada para que te sientas cómodo, seguro y con estilo en cualquier
            momento del día.
          </p>
          <div style={styles.stats}>
            {[
              { num: '+5.000', label: 'Clientes satisfechos' },
              { num: '3 años', label: 'Vistiendo Argentina' },
              { num: '100%', label: 'Envíos cumplidos' },
              { num: '4.9★',  label: 'Calificación promedio' },
            ].map(({ num, label }) => (
              <div key={label} style={styles.stat}>
                <div style={styles.statNum}>{num}</div>
                <div style={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.nosotrosImg}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80"
            alt="OneTwice store"
            style={styles.img}
          />
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.logo}>One<span style={styles.logoAccent}>Twice</span></div>
        <div style={styles.copy}>© 2025 OneTwice. Todos los derechos reservados.</div>
        <div style={styles.social}>
          {['Instagram', 'LinkedIn', 'Email'].map(r => (
            <a key={r} href="#" style={styles.socialLink}
              onMouseEnter={e => { e.target.style.color = 'var(--arena)'; e.target.style.borderColor = 'var(--arena)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--gris-medio)'; e.target.style.borderColor = 'var(--gris-oscuro)'; }}>
              {r}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
