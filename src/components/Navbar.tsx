import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StaggeredMenu } from './StaggeredMenu';

export function Navbar() {
  const router = useRouter();
  const pathname = router.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDeepScrolled, setIsDeepScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setIsDeepScrolled(y > window.innerHeight * 0.55);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navClasses = [
    'ink-nav',
    isScrolled ? 'scrolled' : '',
    isDeepScrolled ? 'nav-scrolled-deep' : '',
    isMobile ? 'mobile-nav-active' : ''
  ]
    .filter(Boolean)
    .join(' ');

  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'Studio', link: '/about' },
    { label: 'Live', link: '/live' },
    { label: 'Events', link: '/events' },
    { label: 'Community', link: '/community' },
    { label: 'Tools', link: '/tools' },
    { label: 'Join Club', link: 'https://forms.gle/xEpZBroHH5ro3Z9q8' },
  ];

  const socialItems = [
    { label: 'Discord', link: 'https://discord.gg/vrgc' },
    { label: 'Instagram', link: 'https://instagram.com/vrgc.vitb' },
    { label: 'LinkedIn', link: 'https://linkedin.com/company/vrgcvitb' }
  ];

  return (
    <header className={navClasses} id="ink-navbar">
      {!isMobile ? (
        <>
          <div className="nav-brand-wrap">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vrgc_logo.jpg" alt="VRGC Logo" className="nav-brand-logo" />
              <span className="nav-brand-text">VRGC</span>
            </Link>
          </div>
          <nav className="ink-nav-links" id="navLinks">
            <Link href="/" className={`ink-nl ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/about" className={`ink-nl ${pathname === '/about' ? 'active' : ''}`}>
              Studio
            </Link>
            <Link href="/live" className={`ink-nl ${pathname === '/live' ? 'active' : ''}`}>
              Live
            </Link>
            <Link href="/events" className={`ink-nl ${pathname === '/events' ? 'active' : ''}`}>
              Events
            </Link>
            <Link href="/community" className={`ink-nl ${pathname === '/community' ? 'active' : ''}`}>
              Community
            </Link>
            <Link href="/tools" className={`ink-nl ${pathname.startsWith('/tools') ? 'active' : ''}`}>
              Tools
            </Link>
          </nav>
          <div className="ink-nav-actions">
            <Link href="/events" className="btn-login">
              Events
            </Link>
            <a
              href="https://forms.gle/xEpZBroHH5ro3Z9q8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signup"
            >
              Join Club
            </a>
          </div>
        </>
      ) : (
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#1e0338', '#5e11a3']}
          logoUrl="/vrgc_logo.jpg"
          accentColor="#C084FC"
          onMenuOpen={() => setMobileOpen(true)}
          onMenuClose={() => setMobileOpen(false)}
          closeOnClickAway={true}
        />
      )}
    </header>
  );
}
