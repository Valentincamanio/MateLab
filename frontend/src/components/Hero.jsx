// components/Hero.jsx
const styles = {
  hero: {
    background: 'var(--negro)',
    minHeight: '88vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '0 2.5rem 0 4rem',
    gap: '4rem',
    position: 'relative',
    overflow: 'hidden',
  },
  pattern: {
    position: 'absolute', inset: 0,
    backgroundImage: `radial-gradient(circle at 70% 50%, rgba(201,169,110,0.06) 0%, transparent 60%)`,
    pointerEvents: 'none',
  },
  content: { position: 'relative', zIndex: 1 },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    color: 'var(--arena)',
    fontSize: '0.75rem', fontWeight: 500,
    letterSpacing: '3px', textTransform: 'uppercase',
    marginBottom: '1.5rem',
  },
  dot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: 'var(--arena)', display: 'inline-block',
  },
  h1: {
    fontFamily: 'var(--fuente-display)',
    fontSize: 'clamp(3rem, 6vw, 5.5rem)',
    fontWeight: 600,
    lineHeight: 1.08,
    color: 'var(--blanco)',
    marginBottom: '1.5rem',
  },
  em: { color: 'var(--arena)', fontStyle: 'italic' },
  p: {
    color: 'rgba(250,250,248,0.55)',
    fontSize: '1rem',
    maxWidth: '380px',
    marginBottom: '2.5rem',
    lineHeight: 1.8,
  },
  ctaGroup: { display: 'flex', gap: '1rem', alignItems: 'center' },
  ctaPrimary: {
    background: 'var(--arena)',
    color: 'var(--negro)',
    padding: '0.9rem 2.2rem',
    borderRadius: 'var(--radio)',
    fontWeight: 500,
    fontSize: '0.9rem',
    letterSpacing: '0.5px',
    transition: 'background var(--transicion)',
    display: 'inline-block',
  },
  ctaSecondary: {
    color: 'var(--gris-claro)',
    fontSize: '0.85rem',
    borderBottom: '1px solid var(--gris-oscuro)',
    paddingBottom: '2px',
    transition: 'color var(--transicion)',
  },
  imageWrap: {
    position: 'relative', zIndex: 1,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '88vh',
    overflow: 'hidden',
  },
  image: {
    width: '100%', height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7) contrast(1.1)',
  },
  imageOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to right, var(--negro) 0%, transparent 30%)',
  },
  tag: {
    position: 'absolute', bottom: '2rem', right: '2rem',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    border: '1px solid var(--gris-oscuro)',
    color: 'var(--blanco)',
    padding: '0.7rem 1.2rem',
    borderRadius: 'var(--radio)',
    fontSize: '0.8rem',
  },
  tagTitle: { color: 'var(--arena)', fontWeight: 500, marginBottom: '0.1rem' },
};

export default function Hero() {
  return (
    <section style={styles.hero} id="inicio">
      <div style={styles.pattern} />

      <div style={styles.content} className="animate-fadeUp">
        <div style={styles.eyebrow}>
          <span style={styles.dot} />
          Nueva colección 2025
        </div>
        <h1 style={styles.h1}>
          Tu estilo,<br />
          <em style={styles.em}>sin límites</em>
        </h1>
        <p style={styles.p}>
          Ropa de calidad pensada para cada momento. Desde básicos que nunca fallan hasta piezas que te hacen destacar.
        </p>
        <div style={styles.ctaGroup}>
          <a href="#productos" style={styles.ctaPrimary}
            onMouseEnter={e => e.target.style.background = 'var(--arena-claro)'}
            onMouseLeave={e => e.target.style.background = 'var(--arena)'}>
            Ver colección
          </a>
          <a href="#nosotros" style={styles.ctaSecondary}>Conocenos →</a>
        </div>
      </div>

      <div style={styles.imageWrap}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
          alt="Hero — moda urbana"
          style={styles.image}
        />
        <div style={styles.imageOverlay} />
        <div style={styles.tag}>
          <div style={styles.tagTitle}>Envío gratis</div>
          <div>en compras +$30.000</div>
        </div>
      </div>
    </section>
  );
}
