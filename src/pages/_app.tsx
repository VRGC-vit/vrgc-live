import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import '@/components/DriftWall.css';
import '@/components/ScrollFloat.css';
import '@/components/ScrollVelocity.css';
import '@/components/OptionWheel.css';
import '@/components/RadioDial.css';
import '@/components/StaggeredMenu.css';
import '@/styles/fixture-generator.css';
import { Header, Footer, RadioDial, PageTransitionLoader } from '@/components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VRGC — Virtual Reality &amp; Gaming Club | VIT Bhopal Campus</title>
        <meta
          name="description"
          content="Official VRGC club at VIT Bhopal. Join 1000+ collegiate gamers in varsity esports tournaments, game development workshops, bootcamps, and VR research labs."
        />
        <meta name="keywords" content="VRGC, Virtual Reality, Gaming Club, VIT Bhopal, Esports, Game Development, Workshops, Bootcamps, VR Research Lab, Collegiate Gamers" />
        <meta name="author" content="VRGC — Virtual Reality &amp; Gaming Club" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://vrgc.live/" />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vrgc.live/" />
        <meta property="og:site_name" content="VRGC VIT Bhopal" />
        <meta property="og:title" content="VRGC — Virtual Reality &amp; Gaming Club | VIT Bhopal" />
        <meta
          property="og:description"
          content="Premier college esports, game development studio, and immersive VR research at VIT Bhopal University. Join 1000+ student gamers."
        />
        <meta property="og:image" content="https://vrgc.live/vrgc_logo.jpg" />
        <meta property="og:image:alt" content="VRGC Logo" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vrgcvitb" />
        <meta name="twitter:creator" content="@vrgcvitb" />
        <meta name="twitter:title" content="VRGC — Virtual Reality &amp; Gaming Club | VIT Bhopal" />
        <meta
          name="twitter:description"
          content="Premier college esports, game development studio, and immersive VR research at VIT Bhopal University."
        />
        <meta name="twitter:image" content="https://vrgc.live/vrgc_logo.jpg" />

        {/* Theme and Mobile Viewport */}
        <meta name="theme-color" content="#080010" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data (Schema.org Organization & Club) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'VRGC - Virtual Reality and Gaming Club',
              alternateName: 'VRGC VIT Bhopal',
              url: 'https://vrgc.live',
              logo: 'https://vrgc.live/vrgc_logo.jpg',
              description:
                'Virtual Reality and Gaming Club at VIT Bhopal University. Fostering esports athletes, game developers, and immersive VR research.',
              sameAs: [
                'https://instagram.com/vrgc.vitb',
                'https://youtube.com/@vrgcvitb',
                'https://github.com/VRGC-vit',
              ],
            }),
          }}
        />
      </Head>
      <PageTransitionLoader />
      <Header />
      <Component {...pageProps} />
      <RadioDial />
      <Footer />
    </>
  );
}

