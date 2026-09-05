import Link from 'next/link';

export function Footer() {
  return (
    <footer className="ink-footer">
      <div className="if-top">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vrgc_logo.jpg" alt="VRGC" style={{ height: '38px', borderRadius: '4px' }} />
            <span className="if-brand-title">VRGC</span>
          </div>
          <p className="if-brand-desc">
            Virtual Reality and Gaming Club &mdash; VIT Bhopal University.<br />
            E-SPORTS &bull; DEVELOPMENT &bull; WORKSHOP &bull; BOOTCAMP
          </p>
        </div>
        <div className="if-links-grid">
          <div className="if-col">
            <h4>PAGES</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">Studio &amp; About</Link></li>
              <li><Link href="/events">Tournaments</Link></li>
              <li><Link href="/live">Live Arena</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/tools">Organizer Tools</Link></li>
            </ul>
          </div>
          <div className="if-col">
            <h4>CONNECT</h4>
            <ul>
              <li><a href="https://discord.gg/BjB2Xyr9tP" target="_blank" rel="noreferrer">Discord Server</a></li>
              <li><a href="https://instagram.com/vrgc.vitb" target="_blank" rel="noreferrer">Instagram @vrgcvitbhopal</a></li>
              <li><a href="https://youtube.com/@vrgcvitb" target="_blank" rel="noreferrer">YouTube Channel</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="if-bottom">
        <span>&copy; {new Date().getFullYear()} VIRTUAL REALITY AND GAMING CLUB (VRGC) &mdash; VIT BHOPAL. ALL RIGHTS RESERVED. &bull; <Link href="/sitemap.xml" target="_blank" style={{ textDecoration: 'underline' }}>SITEMAP</Link></span>
        <span style={{ color: '#7c3aed' }}>E-SPORTS | DEVELOPMENT | WORKSHOP | BOOTCAMP</span>
      </div>
    </footer>
  );
}
