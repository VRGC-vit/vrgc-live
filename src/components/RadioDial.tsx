import React, { useState, useRef, useEffect, useCallback } from 'react';
import { OptionWheel } from './OptionWheel';

export interface PlaylistTrack {
  id: string;
  title: string;
  genre: string;
  url: string;
  embedUrl: string;
  coverArt: string;
  type: 'playlist' | 'video';
  targetId: string;
}

export const PLAYLISTS: PlaylistTrack[] = [
  {
    id: 'gta-v',
    title: 'GTA V RADIO',
    genre: 'Los Santos Sound',
    url: 'https://music.youtube.com/playlist?list=PLgbI0QcBNn5isOvlIN0rRK9Y6bSQdheii&si=JaTYLsLBpa4uf5ik',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLgbI0QcBNn5isOvlIN0rRK9Y6bSQdheii&enablejsapi=1',
    coverArt: 'https://i.ytimg.com/vi/3_yZC9pa-ug/hqdefault.jpg',
    type: 'playlist',
    targetId: 'PLgbI0QcBNn5isOvlIN0rRK9Y6bSQdheii',
  },
  {
    id: '2016-hits',
    title: '2016 HITS',
    genre: 'Retro Electronic Pop',
    url: 'https://music.youtube.com/playlist?list=PL788cqrhfEcYf1KsGlpRVm2YFlX5PZJuL&si=AUlbcodTD7116uzX',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PL788cqrhfEcYf1KsGlpRVm2YFlX5PZJuL&enablejsapi=1',
    coverArt: 'https://i.ytimg.com/vi/u-YGV5xt-jk/hqdefault.jpg',
    type: 'playlist',
    targetId: 'PL788cqrhfEcYf1KsGlpRVm2YFlX5PZJuL',
  },
  {
    id: 'gaming-hits',
    title: 'GAMING HITS',
    genre: 'Collegiate Esports Anthem',
    url: 'https://music.youtube.com/playlist?list=PLD2MrnSI-2rpTd2KLUkW4dBk1emi7paMb&si=jKX8v4lPJRMuStm_',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLD2MrnSI-2rpTd2KLUkW4dBk1emi7paMb&enablejsapi=1',
    coverArt: 'https://i.ytimg.com/vi/A7E-jPMolJ0/hqdefault.jpg',
    type: 'playlist',
    targetId: 'PLD2MrnSI-2rpTd2KLUkW4dBk1emi7paMb',
  },
  {
    id: 'asphalt-9',
    title: 'ASPHALT 9',
    genre: 'Hypercar Nitro OST',
    url: 'https://music.youtube.com/watch?v=IF4RpltPk1k&si=B-KdXn51INcih6uk',
    embedUrl: 'https://www.youtube-nocookie.com/embed/IF4RpltPk1k?enablejsapi=1',
    coverArt: 'https://i.ytimg.com/vi/IF4RpltPk1k/maxresdefault.jpg',
    type: 'video',
    targetId: 'IF4RpltPk1k',
  },
  {
    id: 'phonk',
    title: 'PHONK',
    genre: 'Heavy 808 Drift',
    url: 'https://music.youtube.com/playlist?list=PL9mEo4EdiFzPjTxoUxx4L3bSpp-GCImeN',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PL9mEo4EdiFzPjTxoUxx4L3bSpp-GCImeN&enablejsapi=1',
    coverArt: 'https://i.ytimg.com/vi/vo_X4XZ2Jqk/hqdefault.jpg',
    type: 'playlist',
    targetId: 'PL9mEo4EdiFzPjTxoUxx4L3bSpp-GCImeN',
  },
  {
    id: 'cyberpunk',
    title: 'CYBERPUNK',
    genre: 'Night City Overdrive',
    url: 'https://music.youtube.com/playlist?list=OLAK5uy_kMPdH8PZ2kqc59Y4BJ3ChrCn_U5EKKKbU&si=InrqyD1YfZ3yYr09',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=OLAK5uy_kMPdH8PZ2kqc59Y4BJ3ChrCn_U5EKKKbU&enablejsapi=1',
    coverArt: 'https://i9.ytimg.com/s_p/OLAK5uy_kMPdH8PZ2kqc59Y4BJ3ChrCn_U5EKKKbU/mqdefault.jpg',
    type: 'playlist',
    targetId: 'OLAK5uy_kMPdH8PZ2kqc59Y4BJ3ChrCn_U5EKKKbU',
  },
  {
    id: 'epidemic-pop',
    title: 'EPIDEMIC POP',
    genre: 'Vibrant Modern Pop',
    url: 'https://music.youtube.com/playlist?list=PLuIQYSWMlyQV8ZQe0yM01I1_sFdYnIk2f&si=RbHRfRtOGbiJqyDc',
    embedUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLuIQYSWMlyQV8ZQe0yM01I1_sFdYnIk2f&enablejsapi=1',
    coverArt: 'https://i.ytimg.com/vi/vo_X4XZ2Jqk/hqdefault.jpg',
    type: 'playlist',
    targetId: 'PLuIQYSWMlyQV8ZQe0yM01I1_sFdYnIk2f',
  },
];

const DEFAULT_STATION_TRACKS: Record<string, string> = {
  'gta-v': 'The Set Up — Favored Nations',
  '2016-hits': 'Closer — The Chainsmokers ft. Halsey',
  'gaming-hits': 'Warriors — Imagine Dragons (Esports OST)',
  'asphalt-9': 'Legendary Nitro OST — High Speed Drift',
  'phonk': 'Murder In My Mind — Kordhell',
  'cyberpunk': 'Spoiler — Hyper (Cyberpunk 2077 OST)',
  'epidemic-pop': 'Faster Car — Loving Caliber',
};

const FALLBACK_ART = '/vrgc_logo.jpg';

declare global {
  interface Window {
    YT?: {
      Player: any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const RadioDial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState<string>('');
  const [currentArtist, setCurrentArtist] = useState<string>('');
  const [isApiReady, setIsApiReady] = useState(false);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shuffleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const apiDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const titleContainerRef = useRef<HTMLDivElement | null>(null);
  const [isMarquee, setIsMarquee] = useState(false);

  const currentTrack = PLAYLISTS[selectedIndex] || PLAYLISTS[0];

  // Artwork to display: hovered station artwork if hovering, otherwise active station
  const activeArtIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const activeArtTrack = PLAYLISTS[activeArtIndex] || currentTrack;
  const displayedArt = activeArtTrack.coverArt || FALLBACK_ART;

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
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.025);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      /* autoplay policy silent ignore */
    }
  }, []);

  // Update track title and artist from YouTube Player videoData
  const updateTrackData = useCallback((player: any) => {
    try {
      if (player && typeof player.getVideoData === 'function') {
        const data = player.getVideoData();
        if (data && data.title && data.title.trim().length > 0) {
          setCurrentSongTitle(data.title.trim());
          if (data.author && data.author.trim().length > 0) {
            setCurrentArtist(data.author.trim());
          }
        }
      }
    } catch {
      /* cross-origin guard */
    }
  }, []);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player('vrgc-radio-yt-player', {
          height: '1',
          width: '1',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsApiReady(true);
              // Cue the initial station so audio is primed
              const init = PLAYLISTS[0];
              if (init.type === 'playlist') {
                event.target.cuePlaylist({
                  listType: 'playlist',
                  list: init.targetId,
                  index: Math.floor(Math.random() * 10),
                });
                event.target.setLoop(true);
                if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
                shuffleTimerRef.current = setTimeout(() => {
                  if (event.target && typeof event.target.setShuffle === 'function') {
                    event.target.setShuffle(true);
                  }
                }, 1200);
              } else {
                event.target.cueVideoById(init.targetId);
              }
            },
            onStateChange: (event: any) => {
              // 1: PLAYING, 2: PAUSED, 3: BUFFERING, 0: ENDED
              if (event.data === 1) {
                setIsPlaying(true);
                updateTrackData(event.target);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 3) {
                // Buffering — fetch title immediately
                updateTrackData(event.target);
                setTimeout(() => updateTrackData(event.target), 350);
              } else if (event.data === 0) {
                // Video ended, in playlist YouTube moves to next
                setTimeout(() => updateTrackData(event.target), 400);
              }
            },
            onError: (event: any) => {
              // Auto skip unplayable/blocked videos in playlist
              try {
                event.target.nextVideo();
              } catch {
                /* ignore */
              }
            },
          },
        });
      } catch (err) {
        console.warn('VRGC Radio YouTube Player initialization error:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      // Inject YouTube IFrame API script tag
      if (!document.getElementById('yt-iframe-api')) {
        const script = document.createElement('script');
        script.id = 'yt-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        const first = document.getElementsByTagName('script')[0];
        first?.parentNode?.insertBefore(script, first);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        setupPlayer();
      };
    }

    return () => {
      // cleanup on unmount
    };
  }, [updateTrackData]);

  // Guaranteed visible song title: Live YouTube song title, or curated station track
  const displayedTitle =
    currentSongTitle || DEFAULT_STATION_TRACKS[currentTrack.id] || currentTrack.title;

  // Toggle marquee if title is long
  useEffect(() => {
    if (displayedTitle.length > 22) {
      setIsMarquee(true);
    } else {
      setIsMarquee(false);
    }
  }, [displayedTitle]);

  // Open with smooth panel expansion
  const openPanel = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsRendered(true);
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  // Close with extended, ultra-smooth 680ms exit transition
  const closePanel = useCallback(() => {
    setIsOpen(false);
    setHoveredIndex(null);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsRendered(false);
    }, 680); // Synchronized with 0.68s CSS animation
  }, []);

  // Switch station smoothly via YouTube API
  const handleStationChange = (index: number) => {
    setSelectedIndex(index);
    const track = PLAYLISTS[index];
    playTickSound();

    // Reset title to fallback preview for instant user feedback
    const fallbackTitle = DEFAULT_STATION_TRACKS[track.id] || track.title;
    setCurrentSongTitle(fallbackTitle);
    setCurrentArtist('');

    if (apiDebounceTimerRef.current) clearTimeout(apiDebounceTimerRef.current);
    
    apiDebounceTimerRef.current = setTimeout(() => {
      if (playerRef.current && isApiReady) {
        try {
          if (track.type === 'playlist') {
            if (isPlaying) {
              playerRef.current.stopVideo(); // Purge old playlist queue
              playerRef.current.loadPlaylist({
                listType: 'playlist',
                list: track.targetId,
                index: Math.floor(Math.random() * 10),
              });
            } else {
              playerRef.current.cuePlaylist({
                listType: 'playlist',
                list: track.targetId,
                index: Math.floor(Math.random() * 10),
              });
            }
            
            playerRef.current.setLoop(true);
            if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
            
            shuffleTimerRef.current = setTimeout(() => {
              if (playerRef.current && typeof playerRef.current.setShuffle === 'function') {
                playerRef.current.setShuffle(true);
              }
            }, 1200);
          } else {
            if (isPlaying) {
              playerRef.current.loadVideoById(track.targetId);
              playerRef.current.playVideo();
            } else {
              playerRef.current.cueVideoById(track.targetId);
            }
          }
        } catch (err) {
          console.warn('Error loading station playlist:', err);
        }
      }
    }, 450); // Robust debounce so wheel spins don't overload API
  };

  // Toggle Play / Pause smoothly
  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);

    if (playerRef.current && isApiReady) {
      try {
        if (next) {
          const track = PLAYLISTS[selectedIndex];
          // If player is unstarted or ended, load current station with shuffle
          if (typeof playerRef.current.getPlayerState === 'function') {
            const state = playerRef.current.getPlayerState();
            if (state === -1 || state === 5 || state === 0) {
              if (track.type === 'playlist') {
                playerRef.current.loadPlaylist({
                  listType: 'playlist',
                  list: track.targetId,
                  index: Math.floor(Math.random() * 10),
                });
                playerRef.current.setLoop(true);
                if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
                shuffleTimerRef.current = setTimeout(() => {
                  if (playerRef.current && typeof playerRef.current.setShuffle === 'function') {
                    playerRef.current.setShuffle(true);
                  }
                }, 1200);
              } else {
                playerRef.current.loadVideoById(track.targetId);
              }
            }
          }
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (err) {
        console.warn('Error toggling play:', err);
      }
    }
  };

  // Skip to next song in playlist
  const handleForwardSong = () => {
    playTickSound();
    if (playerRef.current && isApiReady) {
      try {
        playerRef.current.nextVideo();
        setTimeout(() => updateTrackData(playerRef.current), 400);
      } catch {
        /* ignore */
      }
    }
  };

  // Skip to previous song in playlist
  const handleRewindSong = () => {
    playTickSound();
    if (playerRef.current && isApiReady) {
      try {
        playerRef.current.previousVideo();
        setTimeout(() => updateTrackData(playerRef.current), 400);
      } catch {
        /* ignore */
      }
    }
  };

  // Mouse hover expansion — strictly enabled only on pointer: fine devices
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      openPanel();
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        closePanel();
      }, 450);
    }
  };

  // 1-Tap handler for mobile & desktop
  const handleTabClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
      if (apiDebounceTimerRef.current) clearTimeout(apiDebounceTimerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <aside
      className={`radio-dial-container ${isOpen ? 'is-open' : 'is-closed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="VRGC Radio Player"
    >
      {/* Persistent YouTube IFrame API Target: Keep in DOM for continuous background streaming */}
      <div
        id="vrgc-radio-yt-player"
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0.001,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* ── Collapsed Docked Tab: Edge Floating Pill (1-tap open) ── */}
      <button
        type="button"
        className={`radio-dial-tab ${isOpen ? 'tab-hidden' : ''}`}
        onClick={handleTabClick}
        aria-expanded={isOpen}
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

      {/* ── Expanded Deck: Screen Edge Docked with Black Gradient & Cool Animations ── */}
      {isRendered && (
        <div className={`radio-dial-deck ${isOpen ? 'deck-active' : 'deck-closing'}`}>
          {/* Edge Black Gradient Fade-Out Background */}
          <div className="radio-deck-bg-scrim"></div>

          {/* Bubbling Album Art Behind OptionWheel */}
          <div
            className={`radio-deck-album-art ${hoveredIndex !== null ? 'is-hovering' : 'is-idle'}`}
            style={{
              backgroundImage: `url(${displayedArt})`,
            }}
          >
            <div className="radio-deck-album-overlay"></div>
          </div>

          <div className="radio-deck-ring"></div>
          <div className="radio-deck-inner-ring"></div>

          {/* Top Header */}
          <div className="radio-deck-top">
            <span className="radio-deck-badge">VRGC RADIO DIAL</span>
            <button
              type="button"
              className="radio-deck-close"
              onClick={closePanel}
              title="Close"
              aria-label="Close Radio"
            >
              &times;
            </button>
          </div>

          {/* Center: OptionWheel Dial with Album Art Hover & Staggered Items */}
          <div className="radio-deck-wheel-zone">
            <div className="radio-deck-reticle"></div>
            <div className="radio-deck-reticle-dot"></div>
            <div className="radio-deck-wheel-container">
              <OptionWheel
                items={PLAYLISTS.map(p => p.title)}
                defaultSelected={selectedIndex}
                side="right"
                fontSize={1.45}
                spacing={1.6}
                curve={1.15}
                tilt={7}
                blur={1.6}
                fade={0.28}
                textColor="#8a8a95"
                activeColor="#C084FC"
                inset={50}
                loop={true}
                draggable={true}
                smoothing={150}
                onChange={handleStationChange}
                onItemHover={idx => setHoveredIndex(idx)}
              />
            </div>
          </div>

          {/* Bottom: Song Title, Station Info & Controls */}
          <div className="radio-deck-bottom">
            <div className="radio-deck-meta">
              {/* Live Status Tag */}
              <div className="radio-deck-status-tag">
                <span className={`radio-status-dot ${!isPlaying ? 'paused' : ''}`}></span>
                <span>{isPlaying ? 'ON AIR' : 'PAUSED'}</span>
                <span className="radio-status-sep">&bull;</span>
                <span className="radio-station-badge">{currentTrack.title}</span>
              </div>

              {/* Prominent Song Title with Marquee */}
              <div className="radio-deck-name-wrap" ref={titleContainerRef}>
                <div className={`radio-deck-name ${isMarquee ? 'is-marquee' : ''}`}>
                  {isMarquee ? (
                    <>
                      <span>{displayedTitle}</span>
                      <span className="radio-marquee-spacer">&bull;</span>
                      <span>{displayedTitle}</span>
                      <span className="radio-marquee-spacer">&bull;</span>
                    </>
                  ) : (
                    displayedTitle
                  )}
                </div>
              </div>

              {/* Artist and Genre Subtitle */}
              <div className="radio-deck-genre">
                {currentArtist ? `${currentArtist} • ${currentTrack.genre}` : currentTrack.genre}
              </div>
            </div>

            <div className="radio-deck-controls">
              {/* Previous song in playlist */}
              <button
                type="button"
                className="radio-ctrl-step"
                onClick={handleRewindSong}
                title="Previous Track"
                aria-label="Previous Track"
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

              {/* Next song in playlist */}
              <button
                type="button"
                className="radio-ctrl-step"
                onClick={handleForwardSong}
                title="Next Track"
                aria-label="Next Track"
              >
                ⏭
              </button>

              {/* YouTube Music direct link */}
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


