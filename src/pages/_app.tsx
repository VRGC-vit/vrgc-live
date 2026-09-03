import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import '@/components/DriftWall.css';
import '@/components/ScrollFloat.css';
import '@/components/ScrollVelocity.css';
import '@/components/OptionWheel.css';
import '@/components/RadioDial.css';
import '@/components/StaggeredMenu.css';
import { Header, Footer, RadioDial } from '@/components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VRGC — Virtual Reality &amp; Gaming Club | VIT Bhopal</title>
        <meta
          name="description"
          content="Virtual Reality &amp; Gaming Club — VIT Bhopal University. Esports, Development, Workshop, Bootcamp."
        />
        <meta name="theme-color" content="#080010" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <RadioDial />
      <Footer />
    </>
  );
}
