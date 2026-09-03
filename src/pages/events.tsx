import Head from 'next/head';
import Link from 'next/link';
import { BlurText, ScrollFloat } from '@/components';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

export default function EventsPage() {
  useScrollAnimations();

  return (
    <>
      <Head>
        <title>Tournaments &amp; Events — VRGC VIT Bhopal</title>
        <meta
          name="description"
          content="Official esports tournaments, VR hackathons, and gaming community events at VRGC VIT Bhopal."
        />
      </Head>
      <main>
        {/* HERO SECTION */}
        <section className="ink-hero" style={{ minHeight: '65vh', paddingTop: '8.5rem', paddingBottom: '3rem' }}>
          <div className="hero-glow-backlight"></div>

          <div className="hero-badge-pill">
            <span className="hbp-dot"></span>
            CIRCUIT OFF-SEASON &bull; PLANNING NEXT EDITION
          </div>

          <div style={{ margin: '0.75rem 0 1.25rem', display: 'flex', justifyContent: 'center' }}>
            <BlurText
              text="COLLEGIATE TOURNAMENTS"
              delay={75}
              animateBy="words"
              direction="top"
              className="ink-mega-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                lineHeight: 0.94,
                justifyContent: 'center',
                textAlign: 'center',
              }}
            />
          </div>

          <p className="ink-hero-sub" style={{ marginBottom: '2rem', maxWidth: '680px' }}>
            From 100-player Battle Royale LANs in the central auditorium to 48-hour VR Game Jams in the spatial lab.
            All active tournaments have concluded for this cycle.
          </p>

          <div className="ink-hero-actions">
            <a
              href="https://discord.gg/vrgc"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ink-primary"
              style={{ minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}
            >
              Join Discord For Announcements &nbsp;&nearr;
            </a>
            <Link
              href="/live"
              className="btn-ink-outline"
              style={{ minHeight: '46px', display: 'inline-flex', alignItems: 'center' }}
            >
              Watch Past Streams
            </Link>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="trust-signals-bar">
          <div className="trust-item">
            <span className="trust-icon">&#10003;</span>
            <span>VERIFIED VIT BHOPAL DSW / STUDENT WELFARE APPROVED</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">&#9733;</span>
            <span>1,850+ STUDENTS REGISTERED ACROSS SEASONS</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">&#9889;</span>
            <span>&#8377;15,00,000+ CASH PRIZES DISTRIBUTED</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">&#128274;</span>
            <span>100% SECURE DISCORD BOT CHECK-IN</span>
          </div>
        </div>

        {/* NO EVENTS ACTIVE SECTION */}
        <section className="ink-sec-layout" style={{ paddingTop: '4rem', paddingBottom: '7rem' }}>
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              background: 'radial-gradient(ellipse at 50% 30%, rgba(26, 4, 48, 0.7) 0%, rgba(10, 1, 20, 0.95) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '24px',
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(168, 85, 247, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient radar pulse */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(168, 85, 247, 0.12)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.75rem',
                fontSize: '1.8rem',
                color: '#c084fc',
                boxShadow: '0 0 35px rgba(168, 85, 247, 0.3)',
              }}
            >
              &#9881;
            </div>

            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.15em',
                color: '#a855f7',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              CIRCUIT STATUS &bull; STANDBY
            </span>

            <ScrollFloat
              as="h2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                color: '#fff',
                lineHeight: 1.05,
                marginBottom: '1.25rem',
              }}
            >
              NO ACTIVE EVENTS RIGHT NOW
            </ScrollFloat>

            <p
              style={{
                color: 'var(--white-muted)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: '540px',
                margin: '0 auto 2.5rem',
              }}
            >
              All tournament brackets, LAN stages, and hackathons have concluded for this phase.
              Our team is actively engineering the upcoming circuit schedules and flagship campus LANs.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              <a
                href="https://discord.gg/vrgc"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ink-primary"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Join Discord Server &nbsp;&nearr;
              </a>
              <Link
                href="/about"
                className="btn-ink-outline"
                style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              >
                Explore The Studio
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
