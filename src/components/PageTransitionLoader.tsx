import React, { useEffect, useState } from 'react';
import Router from 'next/router';

export const PageTransitionLoader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;

    const handleStart = () => {
      setLoading(true);
      setProgress(15);
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + Math.floor(Math.random() * 15 + 10);
        });
      }, 150);
    };

    const handleComplete = () => {
      clearInterval(progressTimer);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 350);
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      clearInterval(progressTimer);
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #7B2FFF, #c084fc, #38bdf8)',
          boxShadow: '0 0 12px rgba(192, 132, 252, 0.8), 0 0 24px rgba(123, 47, 255, 0.6)',
          transition: 'width 0.25s ease-out, opacity 0.35s ease',
          opacity: loading ? 1 : 0,
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
};

export default PageTransitionLoader;
