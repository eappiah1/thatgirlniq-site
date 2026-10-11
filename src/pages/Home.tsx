import { useCallback } from 'react';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { VideoGallery } from '@/sections/VideoGallery';
import { LiveShows } from '@/sections/LiveShows';
import { SocialProof } from '@/sections/SocialProof';
import { Connect } from '@/sections/Connect';
import { Footer } from '@/sections/Footer';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const { theme, toggle } = useTheme();
  const onToggleTheme = useCallback(toggle, [toggle]);

  return (
    <div className="grain min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero />
        <About />
        <VideoGallery />
        <LiveShows />
        <SocialProof />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
