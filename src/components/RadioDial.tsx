import React, { useState, useRef, useEffect, useCallback } from 'react';
import { OptionWheel } from './OptionWheel';

export interface PlaylistTrack {
  id: string;
  title: string;
  genre: string;
  url: string;
  embedUrl: string;
}

const PLAYLISTS: PlaylistTrack[] = [
  {
    id: 'gta-v',
    title: 'GTA V RADIO',
    genre: 'Los Santos Sound',
    url: 'https://music.youtube.com/playlist?list=PLgbI0QcBNn5isOvlIN0rRK9Y6bSQdheii&si=JaTYLsLBpa4uf5ik',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLgbI0QcBNn5isOvlIN0rRK9Y6bSQdheii&enablejsapi=1',
  },
  {
    id: '2016-hits',
    title: '2016 HITS',
    genre: 'Retro Electronic Pop',
    url: 'https://music.youtube.com/playlist?list=PL788cqrhfEcYf1KsGlpRVm2YFlX5PZJuL&si=AUlbcodTD7116uzX',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PL788cqrhfEcYf1KsGlpRVm2YFlX5PZJuL&enablejsapi=1',
  },
  {
    id: 'gaming-hits',
    title: 'GAMING HITS',
    genre: 'Collegiate Esports Anthem',
    url: 'https://music.youtube.com/playlist?list=PLD2MrnSI-2rpTd2KLUkW4dBk1emi7paMb&si=jKX8v4lPJRMuStm_',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLD2MrnSI-2rpTd2KLUkW4dBk1emi7paMb&enablejsapi=1',
  },
  {
    id: 'asphalt-9',
    title: 'ASPHALT 9',
    genre: 'Hypercar Nitro OST',
    url: 'https://music.youtube.com/watch?v=IF4RpltPk1k&si=B-KdXn51INcih6uk',
    embedUrl: 'https://www.youtube-nocookie.com/embed/IF4RpltPk1k?enablejsapi=1',
  },
  {
    id: 'phonk',
    title: 'PHONK',
    genre: 'Heavy 808 Drift',
    url: 'https://music.youtube.com/playlist?list=PLGBKsNyGY-afmc5ff3n1HOYGTmZO1xJGw&si=KRNy210g6Hfy9AGt',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLGBKsNyGY-afmc5ff3n1HOYGTmZO1xJGw&enablejsapi=1',
  },
  {
    id: 'cyberpunk',
    title: 'CYBERPUNK',
    genre: 'Night City Overdrive',
    url: 'https://music.youtube.com/playlist?list=OLAK5uy_kMPdH8PZ2kqc59Y4BJ3ChrCn_U5EKKKbU&si=InrqyD1YfZ3yYr09',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=OLAK5uy_kMPdH8PZ2kqc59Y4BJ3ChrCn_U5EKKKbU&enablejsapi=1',
  },
  {
    id: 'epidemic-pop',
    title: 'EPIDEMIC POP',
    genre: 'Vibrant Modern Pop',
    url: 'https://music.youtube.com/playlist?list=PLuIQYSWMlyQV8ZQe0yM01I1_sFdYnIk2f&si=RbHRfRtOGbiJqyDc',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLuIQYSWMlyQV8ZQe0yM01I1_sFdYnIk2f&enablejsapi=1',
  },
];

export const RadioDial: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentTrack = PLAYLISTS[selectedIndex] || PLAYLISTS[0];

  // Synthesize a clean radio dial tick via Web Audio API
  const playTickSound = useCallback(() => {
    try {
      const ctx =
        audioCtxRef.current ||
        new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      /* autoplay policy */
    }
  }, []);

  // Send YouTube iframe API commands
  const sendIframeCommand = useCallback((func: string) => {
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args: '' }),
          '*'
        );
      }
    } catch {
      /* cross-origin silenced */
    }
  }, []);

  // Station changed via OptionWheel dial
  const handleStationChange = (index: number) => {
    setSelectedIndex(index);
    playTickSound();
    // The iframe src will update on re-render
  };

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    sendIframeCommand(next ? 'playVideo' : 'pauseVideo');
  };

  // Forward/Rewind navigate WITHIN the current playlist (next/prev song)
  const handleForwardSong = () => {
    playTickSound();
    sendIframeCommand('nextVideo');
  };

  const handleRewindSong = () => {
    playTickSound();
    sendIframeCommand('previousVideo');
  };

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setIsExpanded(false), 500);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <aside
      className="radio-dial-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="VRGC Radio Player"
    >
      {/* Hidden YouTube Iframe — plays the currently selected playlist */}
      <iframe
        ref={iframeRef}
        key={currentTrack.id}
        src={`${currentTrack.embedUrl}${isPlaying ? '&autoplay=1' : ''}`}
        title="VRGC Radio Stream"
        style={{ display: 'none', width: 0, height: 0, border: 'none' }}
        allow="autoplay; encrypted-media"
      />

      {/* ── Collapsed Tab: Enhanced Floating Pill ── */}
      <button
        type="button"
        className="radio-dial-tab"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-expanded={isExpanded}
        title="Open VRGC Radio"
      >
        <span className="radio-tab-icon">&#128251;</span>
        <div className={`radio-tab-bars ${!isPlaying ? 'paused' : ''}`}>
          <div className="radio-tab-bar"></div>
          <div className="radio-tab-bar"></div>
          <div className="radio-tab-bar"></div>
          <div className="radio-tab-bar"></div>
        </div>
        <span className="radio-tab-text">RADIO</span>
        <span className="radio-tab-now">{isPlaying ? '▶ ON' : '— OFF'}</span>
      </button>

      {/* ── Expanded: Circular Transparent Black Deck ── */}
      {isExpanded && (
        <div className="radio-dial-deck">
          <div className="radio-deck-ring"></div>
          <div className="radio-deck-inner-ring"></div>

          {/* Top Header */}
          <div className="radio-deck-top">
            <span className="radio-deck-badge">VRGC RADIO DIAL</span>
            <button
              type="button"
              className="radio-deck-close"
              onClick={() => setIsExpanded(false)}
              title="Close"
            >
              &times;
            </button>
          </div>

          {/* Center: OptionWheel Dial with Enlarged Text */}
          <div className="radio-deck-wheel-zone">
            <div className="radio-deck-reticle"></div>
            <div className="radio-deck-reticle-dot"></div>
            <div className="radio-deck-wheel-container">
              <OptionWheel
                items={PLAYLISTS.map(p => p.title)}
                defaultSelected={selectedIndex}
                side="left"
                fontSize={1.55}
                spacing={1.65}
                curve={1.1}
                tilt={7}
                blur={1.5}
                fade={0.3}
                textColor="rgba(255, 255, 255, 0.35)"
                activeColor="#ffffff"
                inset={55}
                loop={true}
                draggable={true}
                smoothing={140}
                onChange={handleStationChange}
              />
            </div>
          </div>

          {/* Bottom: Station Info & Aesthetic Controls */}
          <div className="radio-deck-bottom">
            <div className="radio-deck-meta">
              <div className="radio-deck-name">{currentTrack.title}</div>
              <div className="radio-deck-genre">{currentTrack.genre}</div>
            </div>

            <div className="radio-deck-controls">
              {/* Rewind: Goes to previous SONG within the playlist */}
              <button
                type="button"
                className="radio-ctrl-step"
                onClick={handleRewindSong}
                title="Previous Song"
                aria-label="Previous Song"
              >
                ⏮
              </button>

              {/* Play / Pause */}
              <button
                type="button"
                className={`radio-ctrl-play ${isPlaying ? 'is-playing' : ''}`}
                onClick={togglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>

              {/* Forward: Goes to next SONG within the playlist */}
              <button
                type="button"
                className="radio-ctrl-step"
                onClick={handleForwardSong}
                title="Next Song"
                aria-label="Next Song"
              >
                ⏭
              </button>

              {/* Open in YouTube Music */}
              <a
                href={currentTrack.url}
                target="_blank"
                rel="noreferrer noopener"
                className="radio-ctrl-ytm"
                title="Open on YouTube Music"
              >
                <span>YTM</span>
                <span>&nearr;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default RadioDial;
