import Link from 'next/link';
import { ScrollVelocity, ScrollFloat } from '@/components';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

export default function HomePage() {
  useScrollAnimations();

  return (
    <main>
      {/* ══════════════════════════════════════════════════
           SECTION 1: HERO SECTION
           MASSIVE BEBAS NEUE CONDENSED HEADLINE
           VRGC CLUB DETAILS & AMBIENT ESPORTS STREAM
           ══════════════════════════════════════════════════ */}
      <section className="ink-hero">
        {/* YouTube Video Ambient Background Layer */}
        <div className="ink-hero-video-bg">
          <div id="yt-player-target">
            <iframe
              src="https://www.youtube.com/embed/AlySUwPFcNA?autoplay=1&mute=1&controls=0&loop=1&playlist=AlySUwPFcNA,ZLO9BAA1G0I,zX0AV6yxyrQ,cMt7RigFfb8,kp2UB4Qzsq8&playsinline=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              tabIndex={-1}
              aria-hidden="true"
              title="VRGC Esports Trailer"
            ></iframe>
          </div>
          <div className="ink-hero-video-scrim"></div>
        </div>

        {/* Monumental Centered Headline */}
        <div className="ink-hero-content">
          <div className="hero-badge-pill text-reveal-tag">
            <span className="hbp-dot"></span>
            VIRTUAL REALITY &amp; GAMING CLUB &bull; VIT BHOPAL UNIVERSITY
          </div>

          <h1 className="ink-mega-title">
            <span className="text-reveal-wrap"><span className="text-reveal-line">JOIN THE</span></span>
            <span className="text-reveal-wrap"><span className="text-reveal-line">NEW ERA OF</span></span>
            <span className="text-reveal-wrap"><span className="text-reveal-line title-accent">GAMING</span></span>
          </h1>

          <p className="ink-hero-sub text-reveal-sub">
            Premier College Esports and Game Dev and immersive VR and Game Research Studio at VIT Bhopal University. 1000+ active student competitors, tier-1 varsity tournament rosters, game development bootcamps, and dedicated VR hardware laboratories.
          </p>

          <div className="ink-hero-actions text-reveal-sub" style={{ transitionDelay: '0.48s' }}>
            <Link href="/events" className="btn-ink-primary">
              Explore Tournaments &nbsp;&nearr;
            </Link>
            <Link href="/about" className="btn-ink-outline">
              Discover Studio
            </Link>
          </div>
        </div>
      </section>

      {/* SCROLL VELOCITY HERO MARQUEE (EXACT COLLEGE DATA) */}
      <div
        style={{
          background: '#070010',
          borderTop: '1px solid rgba(168, 85, 247, 0.25)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
          padding: '1.25rem 0',
          overflow: 'hidden',
        }}
      >
        <ScrollVelocity
          texts={[
            'E-SPORTS ✦ DEVELOPMENT ✦ WORKSHOPS ✦ BOOTCAMPS ✦ VR RESEARCH LAB ✦ 1000+ GAMERS ✦ ₹20K+ PRIZE POOL ✦ EST. 2017 ✦ ',
            'E-SPORTS ✦ DEVELOPMENT ✦ WORKSHOPS ✦ BOOTCAMPS ✦ VR RESEARCH LAB ✦ 1000+ GAMERS ✦ ₹20K+ PRIZE POOL ✦ EST. 2017 ✦ ',
          ]}
          velocity={42}
          className="scroll-velocity-item"
          scrollerStyle={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.08em',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
           SECTION 2: SKELETON DESIGN OF NEW WEBPAGE
           (INKGAMES SPLIT FEATURE SKELETON)
           ══════════════════════════════════════════════════ */}
      <section className="ink-section">
        <div className="ink-split-feature">
          <div>
            <div className="ink-sec-tag"><span className="tag-sq"></span> VRGC VIT BHOPAL &bull; DIGITAL SKELETON</div>
            <ScrollFloat
              as="h2"
              containerClassName="isf-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 0.95,
                marginBottom: '1.5rem',
                color: '#fff',
              }}
            >
              DEFINING THE NEXT GENERATION OF ESPORTS &amp; VR
            </ScrollFloat>
            <p style={{ color: 'var(--white-muted)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              We merge high-octane collegiate tournaments, hands-on virtual reality hardware research, and game
              development bootcamps into an institutional benchmark for university gaming in India.
            </p>
            <Link href="/about" className="btn-ink-explore">
              EXPLORE STUDIO &nbsp;&nearr;
            </Link>
          </div>
          <div className="isf-card-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero_purple.jpg" alt="VRGC Esports Arena Broadcast" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
           SECTION 3: GAME SECTION (TOURNAMENTS)
           VALORANT, FREE FIRE, BGMI, FIFA
           ══════════════════════════════════════════════════ */}
      <section className="ink-purple-block">
        {/* Floating 3D Tilted Game Cards Drifting on Scroll */}
        <div className="ipb-floating-card card-pos-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/games/valorant.jpg" alt="VALORANT Tournament" />
        </div>
        <div className="ipb-floating-card card-pos-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/games/freefire.jpg" alt="Free Fire Battle Royale" />
        </div>
        <div className="ipb-floating-card card-pos-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/games/bgmi.jpg" alt="BGMI Championship" />
        </div>
        <div className="ipb-floating-card card-pos-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/games/fifa.jpg" alt="FIFA EA Sports FC" />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div className="ink-sec-tag" style={{ color: 'rgba(255,255,255,0.8)', justifyContent: 'center' }}>
            <span className="tag-sq" style={{ background: '#fff' }}></span> COMPETITIVE ECOSYSTEM &bull; OFFICIAL TITLES
          </div>
          <ScrollFloat
            as="h2"
            containerClassName="ipb-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1,
              marginBottom: '1.25rem',
              color: '#fff',
            }}
          >
            EXPLORE THE WORLD OF VRGC COMPETITIONS
          </ScrollFloat>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Compete in university-wide tournaments and regional leagues across our tier-1 varsity titles:
            <strong> VALORANT</strong> 5v5 tactical shooter brackets, <strong>Free Fire</strong> battle royale tournaments,
            <strong> BGMI</strong> battle royale championships, <br></br> and <strong>FIFA (EA Sports FC)</strong> 1v1 soccer showdowns.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-ink-primary" style={{ background: '#fff', color: '#080010' }}>
              View All Tournaments &nbsp;&nearr;
            </Link>
            <Link href="/live" className="btn-ink-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              Watch Live Stream
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
           SECTION 4: FLAGSHIP EVENTS
           GAMER'S ASYLUM, XP EXCHANGE, GAMIECON
           ══════════════════════════════════════════════════ */}
      <section className="ink-section">
        <div className="ink-three-pillars">
          <div className="itp-header">
            <div className="ink-sec-tag" style={{ justifyContent: 'center' }}>
              <span className="tag-sq"></span> FLAGSHIP EXPERIENCES
            </div>
            <ScrollFloat
              as="h2"
              containerClassName="itp-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                lineHeight: 1,
                color: '#fff',
              }}
            >
              OUR SIGNATURE EVENTS
            </ScrollFloat>
          </div>

          <div className="pillar-cards-grid">
            {/* EVENT 1: GAMER'S ASYLUM */}
            <div className="pillar-card">
              <div className="pillar-asset-wrap" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(157, 78, 221, 0.3)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/events/gamers_asylum.jpg"
                  alt="Gamer's Asylum 5.0"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'normal' }}
                />
              </div>
              <div>
                <span className="pillar-tag">&#9632; FLAGSHIP EVENT</span>
                <h3 className="pillar-title">GAMER&apos;S ASYLUM</h3>
                <p className="pillar-desc">
                  Asylum is the flagship event of our club for college students, conducting game tournaments like Free Fire, BGMI, Valorant, FIFA, and many more.
                </p>
              </div>
            </div>

            {/* EVENT 2: XP EXCHANGE */}
            <div className="pillar-card">
              <div className="pillar-asset-wrap" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(157, 78, 221, 0.3)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/events/xp_exchange.jpg"
                  alt="XP Exchange Workshop"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'normal' }}
                />
              </div>
              <div>
                <span className="pillar-tag">&#9632; GAME DEV WORKSHOP</span>
                <h3 className="pillar-title">XP EXCHANGE</h3>
                <p className="pillar-desc">
                  XP Exchange is our Game Dev workshop for the club. Introducing game development, and promoting gaming within the students.
                </p>
              </div>
            </div>

            {/* EVENT 3: GAMIECON */}
            <div className="pillar-card">
              <div className="pillar-asset-wrap" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(157, 78, 221, 0.3)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/events/gamiecon.png"
                  alt="GAMIECON Game Jam & Pitch"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'normal' }}
                />
              </div>
              <div>
                <span className="pillar-tag">&#9632; GAME JAM &amp; PITCH</span>
                <h3 className="pillar-title">GAMIECON</h3>
                <p className="pillar-desc">
                  GAMICON is a game pitching event, game jam and pitch your games created within a short time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
           SECTION 5: ABOUT THE CLUB (WHO WE ARE)
           ══════════════════════════════════════════════════ */}
      <section className="ink-studio-section">
        {/* Floating Photos Drifting Around Text */}
        <div className="iss-floating-photo fp-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vrgc_logo.jpg" alt="VRGC Official Brand" />
        </div>
        <div className="iss-floating-photo fp-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/events/gamers_asylum.jpg" alt="Gamer's Asylum Stage" />
        </div>
        <div className="iss-floating-photo fp-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero_purple.jpg" alt="VRGC Spatial Lab Rig" />
        </div>
        <div className="iss-floating-photo fp-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/event_trophy.jpg" alt="Championship Trophy" />
        </div>

        <div className="ink-sec-tag" style={{ justifyContent: 'center' }}>
          <span className="tag-sq"></span> ABOUT THE CLUB &bull; EST. 2017
        </div>
        <h2 className="iss-title">
          GAMERS,<br />
          DEVELOPERS &amp;<br />
          CHAMPIONS.
        </h2>
        <p className="iss-desc">
          Founded in 2017 at VIT Bhopal University, the <strong>Virtual Reality &amp; Gaming Club (VRGC)</strong> has expanded into an institutional pioneer with over 1000+ active members.
          Operating under four core pillars &mdash; <em>Esports, Development, Workshops, and Bootcamps</em> &mdash; our mission is to cultivate collegiate championship varsity teams while driving frontier student research in spatial computing, Unity/Unreal game development, and live tournament broadcasting.
        </p>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', position: 'relative', zIndex: 2, flexWrap: 'wrap' }}>
          <Link href="/about" className="btn-ink-primary">
            Meet The Coordinators &nbsp;&nearr;
          </Link>
          <Link href="/community" className="btn-ink-outline">
            Join Club Discord
          </Link>
        </div>
      </section>
    </main>
  );
}
