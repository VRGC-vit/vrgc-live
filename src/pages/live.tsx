import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { ScrollFloat } from '@/components';


type StageData = {
  streamUrl: string;
  team1Name: string;
  team1Tag: string;
  team1Logo: string;
  team2Name: string;
  team2Tag: string;
  team2Logo: string;
  mapName: string;
  scoreVal: string;
  matchTimer: string;
  viewers: string;
  killfeed: Array<{ k: string; w: string; v: string }>;
};

const STAGE_DATA: Record<string, StageData> = {
  stage1: {
    streamUrl: 'https://player.twitch.tv/?channel=riotgames&parent=localhost&parent=vrgcvitb.in',
    team1Name: 'VRGC ALPHA',
    team1Tag: '#1 SEED • VARSITY',
    team1Logo: '/vrgc_logo.jpg',
    team2Name: 'SHADOW ROYALS',
    team2Tag: '#3 SEED • CONTENDER',
    team2Logo: '/event_trophy.jpg',
    mapName: 'MAP 2: BIND',
    scoreVal: '11 : 9',
    matchTimer: 'ROUND 21 • 01:24',
    viewers: '1,420 ONLINE',
    killfeed: [
      { k: 'VRGC Phantom', w: '[Vandal]', v: 'SHD Cypher' },
      { k: 'VRGC Aether', w: '[Operator]', v: 'SHD Jett' },
      { k: 'SHD Viper', w: '[Snakebite]', v: 'VRGC Blade' },
      { k: 'VRGC Rexxar', w: '[Defuse 0.4s]', v: 'ROUND WIN' },
    ],
  },
  stage2: {
    streamUrl: 'https://player.twitch.tv/?channel=pgl&parent=localhost&parent=vrgcvitb.in',
    team1Name: 'TITAN SQUAD',
    team1Tag: '#2 SEED • CS2 ROSTER',
    team1Logo: '/hero_purple.jpg',
    team2Name: 'REAPER ESPORTS',
    team2Tag: '#4 SEED • QUALIFIER',
    team2Logo: '/vrgc_logo.jpg',
    mapName: 'MAP 1: INFERNO',
    scoreVal: '14 : 12',
    matchTimer: 'OVERTIME • 00:45',
    viewers: '980 ONLINE',
    killfeed: [
      { k: 'TITAN Ghost', w: '[AWP]', v: 'REAPER Apex' },
      { k: 'TITAN Neo', w: '[AK-47 HS]', v: 'REAPER Swift' },
      { k: 'REAPER Blade', w: '[Deagle]', v: 'TITAN Helix' },
      { k: 'TITAN Ghost', w: '[Bomb Planted]', v: 'SITE B' },
    ],
  },
  stage3: {
    streamUrl: 'https://player.twitch.tv/?channel=esl_csgo&parent=localhost&parent=vrgcvitb.in',
    team1Name: 'SOUL SURVIVORS',
    team1Tag: 'MATCH 4 • ERANGEL',
    team1Logo: '/event_trophy.jpg',
    team2Name: 'CAMPUS ALL-STARS',
    team2Tag: '25 SQUADS • 42 ALIVE',
    team2Logo: '/hero_purple.jpg',
    mapName: 'ERANGEL: ZONE 5',
    scoreVal: '42 ALIVE',
    matchTimer: 'ZONE COLLAPSE 01:10',
    viewers: '2,150 ONLINE',
    killfeed: [
      { k: 'SOUL Rexxar', w: '[M416]', v: 'GODL Scout' },
      { k: 'SOUL Nomad', w: '[Grenade Knock]', v: 'HYDRA Star' },
      { k: 'ALL-STAR Sky', w: '[Kar98k]', v: 'SOUL Viper' },
      { k: 'SOUL Rexxar', w: '[Squad Wipe]', v: 'WWCD CONTENDER' },
    ],
  },
};

type ChatMessage = {
  badge: 'VANGUARD' | 'VARSITY' | 'CONTENDER' | 'CADET';
  badgeClass: string;
  sender: string;
  content: string;
};

export default function LivePage() {
  useScrollAnimations();

  const [currentStageKey, setCurrentStageKey] = useState<string>('stage1');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      badge: 'VANGUARD',
      badgeClass: 'badge-vanguard',
      sender: 'Parardha:',
      content: 'Welcome to the Grand Finals everyone! Make some noise in chat!',
    },
    {
      badge: 'VARSITY',
      badgeClass: 'badge-varsity',
      sender: 'Aether:',
      content: 'A-site defense is completely locked down this half!',
    },
    {
      badge: 'CONTENDER',
      badgeClass: 'badge-contender',
      sender: 'Krypton:',
      content: 'THAT FLICK FROM PHANTOM WAS DISGUSTING 🔥🔥🔥',
    },
    {
      badge: 'CADET',
      badgeClass: 'badge-cadet',
      sender: 'Rookie_09:',
      content: 'First time watching collegiate finals, the production quality is insane!',
    },
    {
      badge: 'VARSITY',
      badgeClass: 'badge-varsity',
      sender: 'Ghost_CS:',
      content: 'Economy reset incoming for Shadow Royals if they lose round 21.',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Apply theme-crimson to document body while on this page
  useEffect(() => {
    document.body.classList.add('theme-crimson');
    return () => {
      document.body.classList.remove('theme-crimson');
    };
  }, []);

  const stage = STAGE_DATA[currentStageKey];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        badge: 'CADET',
        badgeClass: 'badge-cadet',
        sender: 'You:',
        content: inputMsg.trim(),
      },
    ]);
    setInputMsg('');
  };

  return (
    <>
      <Head>
        <title>Live Arena &amp; Broadcast Network — VRGC VIT Bhopal</title>
        <meta
          name="description"
          content="Official VRGC collegiate esports broadcast network. Live stadium stream, real-time scoreboard, tier-ranked community chat, and match archive."
        />
        <meta name="theme-color" content="#0c0003" />
      </Head>

      <main>
        {/* ══════════════════════════════════════════════════
             FULL RED LIVE ARENA HERO (STAGE & CHAT)
             ══════════════════════════════════════════════════ */}
        <section className="crimson-arena-hero">
          <div className="crimson-glow-backlight"></div>

          <div className="crimson-badge-pill">
            <span className="crimson-dot"></span>
            VRGC BROADCAST NETWORK &bull; STADIUM DESK ACTIVE
          </div>

          <h1
            className="ink-mega-title"
            style={{ marginBottom: '1.25rem', fontSize: 'clamp(3.8rem, 9.5vw, 8rem)' }}
          >
            LIVE <span className="crimson-title-accent">ARENA</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.05rem',
              maxWidth: '680px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Welcome to the central coliseum. High-stakes collegiate grand finals, tactical telemetry,
            real-time match scoreboard, and rank-tier live chat.
          </p>

          <div className="live-arena-wrapper">
            {/* Functional Stage Switcher Tabs */}
            <div className="filter-bar" style={{ marginBottom: '2rem' }}>
              <button
                className={`crimson-filter-pill ${currentStageKey === 'stage1' ? 'active' : ''}`}
                onClick={() => setCurrentStageKey('stage1')}
              >
                STAGE 01: VALORANT FINALS
              </button>
              <button
                className={`crimson-filter-pill ${currentStageKey === 'stage2' ? 'active' : ''}`}
                onClick={() => setCurrentStageKey('stage2')}
              >
                STAGE 02: CS2 BATTLEGROUND
              </button>
              <button
                className={`crimson-filter-pill ${currentStageKey === 'stage3' ? 'active' : ''}`}
                onClick={() => setCurrentStageKey('stage3')}
              >
                STAGE 03: CAMPUS BGMI LAN
              </button>
            </div>

            {/* 2-Column Broadcast Grid: Player/Scoreboard + Live Chat */}
            <div className="live-broadcast-grid">
              {/* Left Column: Video + Stadium Scoreboard + Killfeed */}
              <div className="live-player-col">
                {/* 16:9 Stream Box */}
                <div className="crimson-stream-box" style={{ aspectRatio: '16/9', width: '100%' }}>
                  <iframe
                    id="mainStreamFrame"
                    src={stage.streamUrl}
                    style={{ border: 0, width: '100%', height: '100%' }}
                    allowFullScreen={true}
                    scrolling="no"
                    title="Live Stream Broadcast"
                  ></iframe>
                </div>

                {/* Full Stadium Scoreboard Strip */}
                <div className="stadium-scoreboard" id="stadiumScoreboard">
                  {/* Team 1 */}
                  <div className="sb-team">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={stage.team1Logo} alt="Team 1" className="sb-team-logo" />
                    <div>
                      <h4 className="sb-team-name">{stage.team1Name}</h4>
                      <span className="sb-team-tag">{stage.team1Tag}</span>
                    </div>
                  </div>

                  {/* Match Center Score & Timer */}
                  <div className="sb-center">
                    <div className="sb-map-label">{stage.mapName}</div>
                    <div className="sb-score-num">{stage.scoreVal}</div>
                    <div className="sb-timer-wrap">
                      <span>{stage.matchTimer}</span>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="sb-team sb-right">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={stage.team2Logo} alt="Team 2" className="sb-team-logo" />
                    <div>
                      <h4 className="sb-team-name">{stage.team2Name}</h4>
                      <span className="sb-team-tag" style={{ color: '#60a5fa' }}>
                        {stage.team2Tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scrolling Kill-Feed Ticker */}
                <div className="killfeed-strip" id="killFeedStrip">
                  {stage.killfeed.map((kf, i) => (
                    <div key={i} className="kf-item">
                      <span className="kf-killer">{kf.k}</span>{' '}
                      <span className="kf-weapon">{kf.w}</span>{' '}
                      <span className="kf-victim">{kf.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Rank-Tiered Live Chat Panel */}
              <div className="live-chat-panel">
                <div className="chat-head">
                  <span className="chat-head-title">ARENA LIVE CHAT</span>
                  <span className="chat-viewers-count" id="chatViewersBadge">
                    {stage.viewers}
                  </span>
                </div>

                {/* Scrollable Message Body */}
                <div className="chat-msgs-body" id="chatMsgsBody">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="chat-msg-row">
                      <span className={`chat-badge ${msg.badgeClass}`}>{msg.badge}</span>
                      <span className="chat-sender">{msg.sender}</span>
                      <span className="chat-content">{msg.content}</span>
                    </div>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form className="chat-input-bar" onSubmit={handleSendChat}>
                  <input
                    type="text"
                    className="chat-input"
                    id="chatInput"
                    placeholder="Send a message as Cadet..."
                    required
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn">
                    SEND
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
             CALM NEAR-BLACK SURFACE (BELOW THE FOLD)
             ══════════════════════════════════════════════════ */}
        <section className="calm-arena-section">
          <div className="live-arena-wrapper">
            {/* 1. MINI TOURNAMENT BRACKET VIEWER */}
            <div className="mini-bracket-container">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: '2rem',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div className="ink-sec-tag" style={{ color: '#ef4444' }}>
                    <span className="tag-sq" style={{ background: '#ef4444' }}></span> TOURNAMENT
                    ROADMAP
                  </div>
                  <ScrollFloat
                    as="h3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.8rem',
                      color: '#fff',
                      lineHeight: 1,
                      marginTop: '0.35rem',
                    }}
                  >
                    LIVE TOURNAMENT BRACKET
                  </ScrollFloat>
                </div>
                <Link
                  href="/events"
                  className="btn-ink-outline"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem' }}
                >
                  Full Events &amp; Standings &nbsp;&nearr;
                </Link>
              </div>

              <div className="bracket-rounds-grid">
                {/* Quarter Finals */}
                <div className="bracket-round-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--white-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    QUARTER-FINALS (BO3)
                  </span>

                  <div className="bracket-match-node">
                    <div className="bmn-team winner">
                      <span>VRGC Alpha</span> <span className="bmn-score">2</span>
                    </div>
                    <div className="bmn-team">
                      <span>Titan Squad</span>{' '}
                      <span className="bmn-score" style={{ color: 'var(--white-dim)' }}>
                        0
                      </span>
                    </div>
                  </div>

                  <div className="bracket-match-node">
                    <div className="bmn-team winner">
                      <span>Shadow Royals</span> <span className="bmn-score">2</span>
                    </div>
                    <div className="bmn-team">
                      <span>Vortex Gaming</span>{' '}
                      <span className="bmn-score" style={{ color: 'var(--white-dim)' }}>
                        1
                      </span>
                    </div>
                  </div>
                </div>

                {/* Semi Finals */}
                <div className="bracket-round-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--white-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    SEMI-FINALS (BO3)
                  </span>

                  <div className="bracket-match-node">
                    <div className="bmn-team winner">
                      <span>VRGC Alpha</span> <span className="bmn-score">2</span>
                    </div>
                    <div className="bmn-team">
                      <span>MIT Gaming</span>{' '}
                      <span className="bmn-score" style={{ color: 'var(--white-dim)' }}>
                        1
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grand Finals (ACTIVE LIVE) */}
                <div className="bracket-round-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#ef4444',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    ● GRAND FINALS (NOW LIVE)
                  </span>

                  <div className="bracket-match-node active-live">
                    <div className="bmn-team winner">
                      <span style={{ color: '#ef4444' }}>★ VRGC Alpha</span>{' '}
                      <span className="bmn-score">11</span>
                    </div>
                    <div className="bmn-team">
                      <span style={{ color: '#fff' }}>Shadow Royals</span>{' '}
                      <span className="bmn-score">9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. MATCH ARCHIVE / VOD GRID (6 REPLAYS) */}
            <div style={{ marginBottom: '6rem' }}>
              <div className="ink-sec-tag">
                <span className="tag-sq" style={{ background: '#ef4444' }}></span> ON-DEMAND REPLAYS
              </div>
              <ScrollFloat
                as="h2"
                containerClassName="ipb-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                  marginBottom: '2.5rem',
                  color: '#fff',
                }}
              >
                MATCH ARCHIVE
              </ScrollFloat>

              <div
                className="vod-grid"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
              >
                {/* VOD 1 */}
                <div className="vod-card crimson-card">
                  <div className="vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/games/valorant.jpg" alt="VALORANT Semi-Finals" />
                    <span className="vod-duration-badge">2h 14m</span>
                    <div className="play-btn-overlay">
                      <div className="play-circle" style={{ background: '#ef4444' }}>
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="vod-info">
                    <h3 className="vod-title" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      VALORANT SEMI-FINALS: VRGC VS MIT
                    </h3>
                    <div className="vod-meta">
                      <span style={{ color: '#ff4d6d' }}>VALORANT &bull; ASCENT</span>
                      <span>DEC 02, 2024</span>
                    </div>
                  </div>
                </div>

                {/* VOD 2 */}
                <div className="vod-card crimson-card">
                  <div className="vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/games/bgmi.jpg" alt="BGMI Dominance" />
                    <span className="vod-duration-badge">3h 45m</span>
                    <div className="play-btn-overlay">
                      <div className="play-circle" style={{ background: '#ef4444' }}>
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="vod-info">
                    <h3 className="vod-title" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      BGMI ERANGEL DOMINANCE DAY 2
                    </h3>
                    <div className="vod-meta">
                      <span style={{ color: '#ff4d6d' }}>BGMI &bull; ERANGEL</span>
                      <span>NOV 28, 2024</span>
                    </div>
                  </div>
                </div>

                {/* VOD 3 */}
                <div className="vod-card crimson-card">
                  <div className="vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/vrgc_logo.jpg" alt="CS2 Upper Bracket" />
                    <span className="vod-duration-badge">1h 38m</span>
                    <div className="play-btn-overlay">
                      <div className="play-circle" style={{ background: '#ef4444' }}>
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="vod-info">
                    <h3 className="vod-title" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      CS2 UPPER BRACKET OT THRILLER
                    </h3>
                    <div className="vod-meta">
                      <span style={{ color: '#ff4d6d' }}>CS2 &bull; ANUBIS</span>
                      <span>NOV 25, 2024</span>
                    </div>
                  </div>
                </div>

                {/* VOD 4 */}
                <div className="vod-card crimson-card">
                  <div className="vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/events/blackbox.jpg" alt="BlackBox VR Jam" />
                    <span className="vod-duration-badge">1h 12m</span>
                    <div className="play-btn-overlay">
                      <div className="play-circle" style={{ background: '#ef4444' }}>
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="vod-info">
                    <h3 className="vod-title" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      VR GAME JAM 48H FINAL PROTOTYPES
                    </h3>
                    <div className="vod-meta">
                      <span style={{ color: '#ff4d6d' }}>VR DEV &bull; QUEST 3</span>
                      <span>NOV 18, 2024</span>
                    </div>
                  </div>
                </div>

                {/* VOD 5 */}
                <div className="vod-card crimson-card">
                  <div className="vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/games/fifa.jpg" alt="EA FC 25 Derby" />
                    <span className="vod-duration-badge">42m</span>
                    <div className="play-btn-overlay">
                      <div className="play-circle" style={{ background: '#ef4444' }}>
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="vod-info">
                    <h3 className="vod-title" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      EA FC 25 CAMPUS DERBY GRAND FINALS
                    </h3>
                    <div className="vod-meta">
                      <span style={{ color: '#ff4d6d' }}>EA FC 25 &bull; 1v1</span>
                      <span>NOV 14, 2024</span>
                    </div>
                  </div>
                </div>

                {/* VOD 6 */}
                <div className="vod-card crimson-card">
                  <div className="vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/events/gamers_asylum.jpg" alt="Gamer's Asylum" />
                    <span className="vod-duration-badge">55m</span>
                    <div className="play-btn-overlay">
                      <div className="play-circle" style={{ background: '#ef4444' }}>
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </div>
                  <div className="vod-info">
                    <h3 className="vod-title" style={{ fontSize: '1.5rem', color: '#fff' }}>
                      GAMER&apos;S ASYLUM MEGA ARENA HIGHLIGHTS
                    </h3>
                    <div className="vod-meta">
                      <span style={{ color: '#ff4d6d' }}>LAN &bull; FINALS</span>
                      <span>NOV 08, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. UPCOMING BROADCASTS SCHEDULE */}
            <div style={{ marginBottom: '6rem' }}>
              <div className="ink-sec-tag">
                <span className="tag-sq" style={{ background: '#ef4444' }}></span> BROADCAST RUN
                SHEET
              </div>
              <ScrollFloat
                as="h2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '2rem',
                }}
              >
                UPCOMING SCHEDULE
              </ScrollFloat>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  className="schedule-row-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '1.25rem 2rem',
                    borderRadius: '8px',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#ef4444',
                        fontWeight: 700,
                      }}
                    >
                      STAGE 02 &bull; TODAY 17:30 IST
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        color: '#fff',
                        marginTop: '0.2rem',
                      }}
                    >
                      BGMI SUPER SERIES // FINALS ERANGEL &amp; MIRAMAR
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--white-muted)' }}>
                      Top 25 Collegiate Squads battling for ₹2,00,000 seasonal points.
                    </p>
                  </div>
                  <button
                    className="gta-tab-btn"
                    onClick={() => alert('Reminder set for BGMI Finals!')}
                  >
                    SET REMINDER
                  </button>
                </div>

                <div
                  className="schedule-row-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '1.25rem 2rem',
                    borderRadius: '8px',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#60a5fa',
                        fontWeight: 700,
                      }}
                    >
                      STAGE 03 &bull; TODAY 20:00 IST
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        color: '#fff',
                        marginTop: '0.2rem',
                      }}
                    >
                      CS2 INTER-COLLEGIATE CLASH // UPPER BRACKET
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--white-muted)' }}>
                      Double elimination bracket MR12 regulation play.
                    </p>
                  </div>
                  <button
                    className="gta-tab-btn"
                    onClick={() => alert('Reminder set for CS2 Match!')}
                  >
                    SET REMINDER
                  </button>
                </div>

                <div
                  className="schedule-row-card"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '1.25rem 2rem',
                    borderRadius: '8px',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#ffd700',
                        fontWeight: 700,
                      }}
                    >
                      STAGE 01 &bull; TOMORROW 18:00 IST
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        color: '#fff',
                        marginTop: '0.2rem',
                      }}
                    >
                      VR GAME JAM // 48-HOUR FINAL DEMO REVEAL
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--white-muted)' }}>
                      Live spatial hardware testing on Meta Quest 3 with industry guest judges.
                    </p>
                  </div>
                  <button
                    className="gta-tab-btn"
                    onClick={() => alert('Reminder set for VR Game Jam!')}
                  >
                    SET REMINDER
                  </button>
                </div>
              </div>
            </div>

            {/* 4. CASTER DESK COMMENTARY TEAM */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <div className="ink-sec-tag" style={{ justifyContent: 'center' }}>
                <span className="tag-sq" style={{ background: '#ef4444' }}></span> ON-AIR COMMENTARY
              </div>
              <ScrollFloat
                as="h2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  color: '#fff',
                  lineHeight: 1,
                  marginBottom: '3rem',
                }}
              >
                THE CASTER DESK
              </ScrollFloat>

              <div
                className="circular-team-grid"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '2rem',
                  maxWidth: '960px',
                  margin: '0 auto',
                }}
              >
                <div className="circ-member-card">
                  <div className="circ-avatar-wrap">
                    <div className="circ-ring" style={{ borderColor: 'rgba(239,68,68,0.4)' }}></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/event_trophy.jpg"
                      alt="Caster Aether"
                      className="circ-avatar"
                      style={{ borderColor: '#ef4444' }}
                    />
                  </div>
                  <h3 className="circ-name" style={{ color: '#fff', fontSize: '1.6rem' }}>
                    AETHER
                  </h3>
                  <span className="circ-role" style={{ color: '#ff4d6d' }}>
                    Lead Play-by-Play
                  </span>
                  <p className="circ-bio" style={{ color: 'var(--white-muted)' }}>
                    High-energy tactical FPS shoutcaster. Covered over 150 collegiate games with
                    electric energy.
                  </p>
                </div>

                <div className="circ-member-card">
                  <div className="circ-avatar-wrap">
                    <div className="circ-ring" style={{ borderColor: 'rgba(239,68,68,0.4)' }}></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hero_purple.jpg"
                      alt="Caster Vortex"
                      className="circ-avatar"
                      style={{ borderColor: '#ef4444' }}
                    />
                  </div>
                  <h3 className="circ-name" style={{ color: '#fff', fontSize: '1.6rem' }}>
                    VORTEX
                  </h3>
                  <span className="circ-role" style={{ color: '#ff4d6d' }}>
                    Color Analyst
                  </span>
                  <p className="circ-bio" style={{ color: 'var(--white-muted)' }}>
                    Ex-radiant collegiate player breaking down utility timings, eco rounds, and
                    micro-positioning.
                  </p>
                </div>

                <div className="circ-member-card">
                  <div className="circ-avatar-wrap">
                    <div className="circ-ring" style={{ borderColor: 'rgba(239,68,68,0.4)' }}></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/vrgc_logo.jpg"
                      alt="Observer Ghost"
                      className="circ-avatar"
                      style={{ borderColor: '#ef4444' }}
                    />
                  </div>
                  <h3 className="circ-name" style={{ color: '#fff', fontSize: '1.6rem' }}>
                    GHOST
                  </h3>
                  <span className="circ-role" style={{ color: '#ff4d6d' }}>
                    Head Observer
                  </span>
                  <p className="circ-bio" style={{ color: 'var(--white-muted)' }}>
                    Directing in-game cinematic free-cams, instant slow-motion replays, and catching
                    every entry frag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
