import Head from 'next/head';
import Link from 'next/link';
import { BlurText } from '@/components';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

export default function CommunityPage() {
  useScrollAnimations();

  return (
    <>
      <Head>
        <title>Community Portal — Under Maintenance | VRGC</title>
        <meta
          name="description"
          content="The VRGC Citadel Community hub is currently undergoing scheduled maintenance and system upgrades."
        />
      </Head>
      <main>
        <section
          className="ink-hero"
          style={{
            minHeight: '82vh',
            paddingTop: '9rem',
            paddingBottom: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div className="hero-glow-backlight"></div>

          {/* Maintenance Pill */}
          <div
            className="hero-badge-pill"
            style={{
              borderColor: 'rgba(234, 179, 8, 0.4)',
              background: 'rgba(234, 179, 8, 0.08)',
              color: '#facc15',
            }}
          >
            <span
              className="hbp-dot"
              style={{ background: '#facc15', boxShadow: '0 0 10px #facc15' }}
            ></span>
            PORTAL MAINTENANCE &bull; SYSTEM UPGRADE IN PROGRESS
          </div>

          <div style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>
            <BlurText
              text="CITADEL COMMUNITY"
              delay={80}
              animateBy="letters"
              direction="top"
              className="ink-mega-title"
              style={{
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                lineHeight: 0.95,
                color: '#fff',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <BlurText
              text="UNDER MAINTENANCE"
              delay={100}
              animateBy="words"
              direction="bottom"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.8vw, 2.8rem)',
                color: 'var(--purple-bright)',
                letterSpacing: '0.08em',
              }}
            />
          </div>

          <p
            className="ink-hero-sub"
            style={{
              maxWidth: '620px',
              margin: '0 auto 2.75rem',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--white-muted)',
            }}
          >
            We are overhauling the Citadel member matrix, recruitment dashboards, and automated
            bot integrations for the upcoming collegiate season. The portal will be back online shortly.
          </p>

          <div
            style={{
              background: 'rgba(15, 3, 30, 0.8)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '20px',
              padding: '2.5rem 2rem',
              maxWidth: '560px',
              width: '100%',
              margin: '0 auto 3rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
                paddingBottom: '0.85rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ color: '#94a3b8' }}>NETWORK STATUS</span>
              <span style={{ color: '#facc15', fontWeight: 700 }}>STANDBY / OFFLINE</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
                paddingBottom: '0.85rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ color: '#94a3b8' }}>PRIMARY DISCORD CITADEL</span>
              <span style={{ color: '#4ade80', fontWeight: 700 }}>OPERATIONAL (2,450+ MEMBERS)</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
              Need urgent assistance, squad scrim registration, or club updates? Join our active Discord server.
            </p>
          </div>

          <div className="ink-hero-actions" style={{ justifyContent: 'center' }}>
            <a
              href="https://discord.gg/vrgc"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ink-primary"
              style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}
            >
              Join Discord Citadel &nbsp;&nearr;
            </a>
            <Link
              href="/"
              className="btn-ink-outline"
              style={{ minHeight: '48px', display: 'inline-flex', alignItems: 'center' }}
            >
              Return Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
