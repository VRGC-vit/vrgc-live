import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { DriftWall } from '@/components/DriftWall';
import { ScrollFloat } from '@/components/ScrollFloat';
import {
  CouncilMember,
  FacultyMember,
  WheelMember,
  facultyMembers as defaultFaculty,
  fetchClubData,
} from '@/services/membersService';


type AboutPageProps = {
  initialData: {
    council: CouncilMember[];
    faculty: FacultyMember[];
    wheelCategories: Record<string, WheelMember[]>;
  } | null;
};

export default function AboutPage({ initialData }: AboutPageProps) {
  useScrollAnimations();

  const [council, setCouncil] = useState<CouncilMember[]>(
    initialData?.council && initialData.council.length > 0 ? initialData.council : []
  );
  const [faculty, setFaculty] = useState<FacultyMember[]>(initialData?.faculty || defaultFaculty);
  const [wheelCategories, setWheelCategories] = useState<Record<string, WheelMember[]>>(
    initialData?.wheelCategories || {}
  );
  // Only show loading skeleton when SSR produced no council data at all
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialData?.council || initialData.council.length === 0
  );

  // Only client-refetch when ISR didn't produce council data (e.g. first cold build)
  useEffect(() => {
    if (initialData?.council && initialData.council.length > 0) {
      setIsLoading(false);
      return;
    }
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.council && data.council.length > 0) {
          setCouncil(data.council);
          if (data.faculty) setFaculty(data.faculty);
          if (data.wheelCategories) setWheelCategories(data.wheelCategories);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [initialData]);

  const allVerifiedMembers = useMemo(() => {
    // Only squad members from wheelCategories (excluding executive leadership / council)
    const all = Object.values(wheelCategories)
      .flat()
      .map((m) => ({
        id: m.id,
        name: m.name,
        role: `${m.role} • ${m.team}`,
        photoUrl: m.photoUrl,
        position: m.role,
        team: m.team,
      }));

    // Exclude council minds and any executive leadership
    const councilIds = new Set(council.map((c) => (c.id || c.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')));

    const uniqueMap = new Map<string, { id: string; name: string; role: string; photoUrl: string }>();
    all.forEach((m) => {
      const lowerRole = (m.position || m.role || '').toLowerCase();
      const lowerTeam = (m.team || '').toLowerCase();
      const key = (m.id || m.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      // Skip council minds
      if (councilIds.has(key)) return;
      // Skip leadership team or executive / president council roles
      if (
        lowerTeam.includes('leadership') ||
        lowerRole.includes('president') ||
        lowerRole.includes('executive')
      )
        return;

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, m);
      }
    });

    // Strictly filter out any placeholder (/vrgc_logo.jpg) so 100% of tiles are real photos
    return Array.from(uniqueMap.values())
      .filter((m) => m.photoUrl && !m.photoUrl.includes('vrgc_logo'))
      .map((m) => ({
        id: m.id,
        image: m.photoUrl,
        title: m.name,
        role: m.role,
        data: m,
      }));
  }, [wheelCategories, council]);

  return (
    <>
      <Head>
        <title>Studio &amp; Leadership — VRGC VIT Bhopal</title>
        <meta
          name="description"
          content="Meet the student leadership, faculty coordinators, and competitive rosters of the Virtual Reality &amp; Gaming Club at VIT Bhopal University."
        />
      </Head>

      <main>
        {/* STUDIO HERO */}
        <section className="ink-studio-light">
          <div className="polaroid-float pf-1 iss-floating-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero_purple.jpg" alt="VRGC Lab Rig" />
          </div>
          <div className="polaroid-float pf-2 iss-floating-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/event_trophy.jpg" alt="Trophy Victory" />
          </div>

          <div className="ink-sec-tag-dark" style={{ justifyContent: 'center' }}>
            <span className="tag-sq"></span> WHO WE ARE &bull; EST. 2017
          </div>
          <h1
            className="isl-title text-reveal-sub"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.8rem, 9.5vw, 8.5rem)',
              lineHeight: 0.92,
              color: '#05000A',
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            <span style={{ display: 'block' }}>GAMERS,</span>
            <span style={{ display: 'block' }}>DEVELOPERS &amp;</span>
            <span style={{ display: 'block' }}>CHAMPIONS.</span>
          </h1>
          <p
            className="isl-desc text-reveal-sub"
            style={{
              maxWidth: '740px',
              margin: '1.5rem auto 0',
              textAlign: 'center',
              fontSize: 'clamp(1rem, 2vw, 1.22rem)',
              lineHeight: 1.6,
              color: '#1e293b',
              animationDelay: '0.2s',
            }}
          >
            Premier College Esports and Game Dev and immersive VR and Game Research Studio at VIT Bhopal University. 1000+ active student competitors, tier-1 varsity tournament rosters, game development bootcamps, and dedicated VR hardware laboratories.
          </p>

          {/* ══════════════════════════════════════════════════
               CIRCULAR EXECUTIVE COUNCIL: THE MINDS BEHIND THE GAMIVERSE
               ══════════════════════════════════════════════════ */}
          <div style={{ marginTop: '5rem', textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="ink-sec-tag-dark" style={{ justifyContent: 'center' }}>
              <span className="tag-sq"></span> EXECUTIVE COUNCIL
            </div>
            <ScrollFloat
              as="h2"
              containerClassName="isl-council-title"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#05000A', lineHeight: 1, marginTop: '0.5rem', marginBottom: '3rem' }}
            >
              THE MINDS BEHIND THE GAMIVERSE
            </ScrollFloat>

            <div className="circular-team-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '2rem' }}>
              {isLoading && council.length === 0 ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={`skel-council-${idx}`}
                    className="skeleton-card"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(124, 58, 237, 0.15)',
                      borderRadius: '16px',
                      padding: '2.2rem 1.8rem',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="skeleton-shimmer-light"
                      style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        marginBottom: '1.25rem',
                        border: '3px solid rgba(124, 58, 237, 0.2)',
                      }}
                    />
                    <div
                      className="skeleton-shimmer-light"
                      style={{ width: '130px', height: '22px', borderRadius: '4px', marginBottom: '0.65rem' }}
                    />
                    <div
                      className="skeleton-shimmer-light"
                      style={{ width: '90px', height: '14px', borderRadius: '4px', marginBottom: '0.75rem' }}
                    />
                    <div
                      className="skeleton-shimmer-light"
                      style={{ width: '80px', height: '18px', borderRadius: '6px', marginBottom: '1rem' }}
                    />
                    <div
                      className="skeleton-shimmer-light"
                      style={{ width: '100%', height: '12px', borderRadius: '3px', marginBottom: '0.4rem' }}
                    />
                    <div
                      className="skeleton-shimmer-light"
                      style={{ width: '85%', height: '12px', borderRadius: '3px' }}
                    />
                  </div>
                ))
              ) : (
                council.map((lead, idx) => {
                  const ringColors = [
                    'rgba(124, 58, 237, 0.4)',
                    'rgba(234, 179, 8, 0.4)',
                    'rgba(2, 132, 199, 0.4)',
                    'rgba(16, 185, 129, 0.4)',
                  ];
                  const badgeColors = ['#7c3aed', '#b45309', '#0284c7', '#059669'];
                  const ringColor = ringColors[idx % ringColors.length];
                  const badgeColor = badgeColors[idx % badgeColors.length];

                  const photoSrc = lead.photoUrl || '/vrgc_logo.jpg';

                  return (
                    <div
                      key={lead.id || lead.name}
                      className="circ-member-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        borderRadius: '16px',
                        padding: '2.2rem 1.8rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                      }}
                    >
                      <div
                        className="circ-avatar-wrap"
                        style={{
                          position: 'relative',
                          width: '130px',
                          height: '130px',
                          margin: '0 auto 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                        }}
                      >
                        <div
                          className="circ-ring"
                          style={{
                            position: 'absolute',
                            inset: '-6px',
                            borderRadius: '50%',
                            border: `2px dashed ${ringColor}`,
                            pointerEvents: 'none',
                          }}
                        ></div>
                        <div 
                          className="skeleton-shimmer-light"
                          style={{
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            display: 'flex',
                            position: 'relative',
                            overflow: 'hidden',
                            border: `3px solid ${badgeColor}`,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photoSrc}
                            alt={lead.name}
                            className="circ-avatar"
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                              opacity: 0,
                              transition: 'opacity 0.4s ease',
                              background: '#f1f5f9',
                            }}
                            onLoad={(e) => {
                              (e.target as HTMLElement).style.opacity = '1';
                              (e.target as HTMLElement).parentElement?.classList.remove('skeleton-shimmer-light');
                            }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== '/vrgc_logo.jpg' && !target.src.endsWith('/vrgc_logo.jpg')) {
                                target.src = '/vrgc_logo.jpg';
                              }
                            }}
                          />
                        </div>
                      </div>
                      <h3
                        className="circ-name"
                        style={{
                          fontFamily: 'var(--font-head)',
                          fontSize: '1.45rem',
                          fontWeight: 800,
                          color: '#0f172a',
                          marginBottom: '0.35rem',
                          lineHeight: 1.2,
                        }}
                      >
                        {lead.name}
                      </h3>
                      <span className="circ-role" style={{ color: badgeColor, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                        {lead.role}
                      </span>
                      <span
                        className="circ-member-badge"
                        style={{
                          background: 'rgba(124, 58, 237, 0.08)',
                          color: badgeColor,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          marginTop: '0.25rem',
                        }}
                      >
                        {(lead.team || 'LEADERSHIP').toUpperCase()}
                      </span>
                      <p className="circ-bio" style={{ color: '#334155', marginTop: '0.85rem', fontSize: '0.88rem', lineHeight: 1.55 }}>
                        {lead.bio}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* ══════════════════════════════════════════════════
                 FACULTY ADVISORY: DR. RAMRAJ DANGI & DR. SIVABALAN KR
                 ══════════════════════════════════════════════════ */}
            <div style={{ marginTop: '5.5rem', paddingTop: '3.5rem', borderTop: '1px solid rgba(124, 58, 237, 0.15)' }}>
              <div className="ink-sec-tag-dark" style={{ justifyContent: 'center' }}>
                <span className="tag-sq"></span> INSTITUTIONAL MENTORSHIP
              </div>
              <ScrollFloat
                as="h3"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: '#111111', lineHeight: 1, marginTop: '0.5rem', marginBottom: '2.5rem', textAlign: 'center' }}
              >
                FACULTY COORDINATORS
              </ScrollFloat>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                {faculty.map((fac) => {
                  const facultyImg =
                    fac.image ||
                    (fac.name.toLowerCase().includes('ramraj')
                      ? '/faculty/ramraj_dangi.png'
                      : '/faculty/siva_balan.png');

                  return (
                    <div
                      key={fac.name}
                      className="faculty-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        borderRadius: '16px',
                        padding: '2.2rem 1.8rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '104px',
                          height: '104px',
                          borderRadius: '50%',
                          margin: '0 auto 1.25rem',
                          padding: '3px',
                          background: 'linear-gradient(135deg, #7c3aed, #c084fc)',
                          boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25)',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={facultyImg}
                          alt={fac.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            background: '#f8fafc',
                          }}
                        />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.35rem' }}>
                        {fac.name}
                      </h4>
                      <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                        {fac.role}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
                        {fac.department}
                      </div>
                      <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                        {fac.bio}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
             FULLSCREEN ROSTER DRIFT WALL GALLERY
             FULL-BLEED EDGE-TO-EDGE CANVAS
             ══════════════════════════════════════════════════ */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '720px',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at 50% 50%, #17042c 0%, #0c0217 60%, #05000a 100%)',
            borderTop: '1px solid rgba(168, 85, 247, 0.25)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
          }}
        >
          {/* Floating Navigation Pill */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.5rem 1.25rem',
              background: 'rgba(12, 2, 24, 0.8)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '999px',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#e2e8f0',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }}></span>
            <span>HOLD &amp; DRAG TO EXPLORE &bull; HOVER FOR INTEL</span>
          </div>

          <DriftWall
            items={allVerifiedMembers}
            columns={8}
            tileWidth={220}
            tileHeight={150}
            gap={20}
            radius={16}
            tilt={12}
            turn={-10}
            perspective={1200}
            depth={80}
            speed={34}
            direction="up"
            variance={0.35}
            parallax={0.5}
            pauseOnHover={false}
            lift={68}
            fade={0.45}
            dim={0.68}
            overlayColor="#060010"
          />
        </section>

        {/* 4 PILLARS OF VRGC */}
        <section className="ink-sec-layout" style={{ background: '#080010', position: 'relative' }}>
          <div className="ink-sec-tag" style={{ justifyContent: 'center' }}>
            <span className="tag-sq"></span> OUR ECOSYSTEM
          </div>
          <ScrollFloat
            as="h2"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5.5rem)', textAlign: 'center', color: '#fff', lineHeight: 0.95, marginBottom: '1rem' }}
          >
            THE FOUR PILLARS OF VRGC
          </ScrollFloat>
          <p style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem', color: 'var(--white-muted)', fontSize: '1.05rem' }}>
            Every domain is engineered for excellence. Whether competing on the national stage or writing spatial shaders, our departments operate with professional rigor.
          </p>

          <div className="dept-grid">
            <div className="dept-card">
              <span className="dept-num">01</span>
              <span className="dept-badge">COMPETITIVE DIVISION</span>
              <ScrollFloat as="h3" containerClassName="dept-title">
                E-SPORTS
              </ScrollFloat>
              <p className="dept-desc">
                Fielding varsity rosters in VALORANT, BGMI, FREE FIRE, FIFA and TEKKEN. Regular scrims against premier collegiate squads, dedicated coaching staff, analytics reviews, and inter college LAN tournament invites.
              </p>
              <div className="dept-stats">
                <div><div className="dept-stat-num">&#8377;20K+</div><div className="dept-stat-label">Prize Money</div></div>
                <div><div className="dept-stat-num">1000+</div><div className="dept-stat-label">Gamers</div></div>
                <div><div className="dept-stat-num">84%</div><div className="dept-stat-label">Scrim Winrate</div></div>
              </div>
            </div>

            <div className="dept-card">
              <span className="dept-num">02</span>
              <span className="dept-badge">INNOVATION LAB</span>
              <ScrollFloat as="h3" containerClassName="dept-title">
                DEVELOPMENT
              </ScrollFloat>
              <p className="dept-desc">
                Building next-generation virtual environments, spatial audio experiments, and custom Unreal Engine 5 games. Our teams publish games on itch.io and Steam, and build proprietary VR tools.
              </p>
              <div className="dept-stats">
                <div><div className="dept-stat-num">9</div><div className="dept-stat-label">Published Games</div></div>
                <div><div className="dept-stat-num">Meta Q3</div><div className="dept-stat-label">Hardware Rig</div></div>
                <div><div className="dept-stat-num">UE5 &bull; Unity</div><div className="dept-stat-label">Core Stacks</div></div>
              </div>
            </div>

            <div className="dept-card">
              <span className="dept-num">03</span>
              <span className="dept-badge">TECHNICAL KNOWLEDGE</span>
              <ScrollFloat as="h3" containerClassName="dept-title">
                WORKSHOPS
              </ScrollFloat>
              <p className="dept-desc">
                Hands-on technical masterclasses covering game engine architecture, 3D asset pipelines in Blender, VR tracking calibration, tournament broadcast operations, and GPU optimization.
              </p>
              <div className="dept-stats">
                <div><div className="dept-stat-num">10+</div><div className="dept-stat-label">Sessions Held</div></div>
                <div><div className="dept-stat-num">150+</div><div className="dept-stat-label">Students Trained</div></div>
                <div><div className="dept-stat-num">Quaterly</div><div className="dept-stat-label">Cadence</div></div>
              </div>
            </div>

            <div className="dept-card">
              <span className="dept-num">04</span>
              <span className="dept-badge">BROADCAST &amp; MEDIA</span>
              <ScrollFloat as="h3" containerClassName="dept-title">
                CASTING
              </ScrollFloat>
              <p className="dept-desc">
                High quality Hinglish Casting with over 10k+ views on youtube streams with 100+ watching hours. Conducted 50+ live streams in youtube.
              </p>
              <div className="dept-stats">
                <div><div className="dept-stat-num">10K+</div><div className="dept-stat-label">YouTube Views</div></div>
                <div><div className="dept-stat-num">100+</div><div className="dept-stat-label">Watch Hours</div></div>
                <div><div className="dept-stat-num">50+</div><div className="dept-stat-label">Live Streams</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* VR HARDWARE SHOWCASE */}
        <section className="ink-sec-layout" style={{ background: '#0d011a', borderTop: '1px solid rgba(168, 85, 247, 0.15)' }}>
          <div className="ink-sec-tag" style={{ justifyContent: 'center' }}>
            <span className="tag-sq"></span> CAMPUS RESEARCH FACILITY
          </div>
          <ScrollFloat
            as="h2"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5rem)', textAlign: 'center', color: '#fff', lineHeight: 0.95, marginBottom: '1rem' }}
          >
            THE VR HARDWARE &amp; ESPORTS LAB
          </ScrollFloat>
          <p style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem', color: 'var(--white-muted)', fontSize: '1.05rem' }}>
            Our flagship campus facility serves as both a high-performance tournament practice arena and a spatial computing incubation lab.
          </p>

          <div className="lab-specs-grid">
            <div className="lab-spec-box">
              <div className="lab-spec-val">12x</div>
              <div className="lab-spec-title">RTX 3060 Rigs</div>
              <div className="lab-spec-sub">360Hz Esports Displays</div>
            </div>
            <div className="lab-spec-box">
              <div className="lab-spec-val">3x</div>
              <div className="lab-spec-title">Meta Quest 2 &amp; 3</div>
              <div className="lab-spec-sub">Oculusrift and HTC Vive</div>
            </div>
            <div className="lab-spec-box">
              <div className="lab-spec-val">1 Gbps</div>
              <div className="lab-spec-title">Multiple Routers and Hubs</div>
              <div className="lab-spec-sub">&lt; 5ms LAN Ping</div>
            </div>
            <div className="lab-spec-box">
              <div className="lab-spec-val">4K 60</div>
              <div className="lab-spec-title">Broadcast Desk</div>
              <div className="lab-spec-sub">Studio Setup</div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let data = null;
  try {
    data = await fetchClubData();
  } catch {
    // Supabase/Firestore unreachable — render page with empty state
  }
  return {
    props: {
      initialData: data || null,
    },
    revalidate: 60,
  };
};
