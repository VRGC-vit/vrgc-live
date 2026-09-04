import Head from 'next/head';
import Link from 'next/link';

export default function ToolsIndexPage() {
  return (
    <>
      <Head>
        <title>Club Tools &amp; Utilities — VRGC</title>
        <meta
          name="description"
          content="Official esports tools, tournament fixture generators, bracket builders and utility suites for VRGC organizers."
        />
      </Head>
      <main style={{ minHeight: '80vh', paddingTop: '8.5rem', paddingBottom: '4rem', paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="hero-badge-pill" style={{ marginBottom: '1.25rem' }}>
            <span className="hbp-dot"></span>
            ORGANIZER SUITE &bull; VRGC VIT BHOPAL
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#fff',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            COMMUNITY <span style={{ color: 'var(--purple-bright)' }}>TOOLS</span>
          </h1>

          <p style={{ color: 'var(--white-muted)', maxWidth: '650px', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '3rem' }}>
            Internal esports tournament organizers, bracket builders, and points engines engineered for VIT Bhopal competitive gaming circuits.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(192, 132, 252, 0.25)',
                borderRadius: '16px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>🏆</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: '#fff',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  FIXTURE GENERATOR
                </h3>
                <p style={{ color: 'var(--white-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Generate elimination brackets (Valorant/CS2) &amp; Battle Royale points tables (BGMI/Free Fire), manage byes, enter live results, and export high-resolution posters synced to Firestore cloud.
                </p>
              </div>

              <Link
                href="/tools/fixture-generator"
                className="btn-ink-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  minHeight: '44px',
                }}
              >
                Launch Tool &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
