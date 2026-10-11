import { useCallback, useEffect } from 'react';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { VideoGallery } from '@/sections/VideoGallery';
import { LiveShows } from '@/sections/LiveShows';
import { SocialProof } from '@/sections/SocialProof';
import { Connect } from '@/sections/Connect';
import { Footer } from '@/sections/Footer';
import { NiqBot } from '@/components/NiqBot';
import { ShareBar } from '@/components/ShareBar';
import { ToastProvider, useToast } from '@/components/Toast';
import { useShareNudge } from '@/hooks/useShareNudge';
import { useTheme } from '@/hooks/useTheme';

function Page() {
  const { theme, toggle } = useTheme();
  const onToggleTheme = useCallback(toggle, [toggle]);
  const { toast } = useToast();

  useShareNudge(() => toast('Vibing? Share ThatGirlNiq with a friend 🎤🔥'));

  // shared clip links (thatgirlniq.com/#clip-<id>) land on the Video Vault
  useEffect(() => {
    if (window.location.hash.startsWith('#clip-')) {
      window.setTimeout(() => {
        document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }
  }, []);

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
      <NiqBot />
      <ShareBar />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <Page />
    </ToastProvider>
  );
}
