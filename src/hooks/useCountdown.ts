import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

/** Live countdown to a target ISO date-time. Ticks every second. */
export function useCountdown(targetIso: string | undefined): Countdown {
  const calc = (): Countdown => {
    if (!targetIso) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
    const diff = new Date(targetIso).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1_000) % 60),
      past: false,
    };
  };

  const [time, setTime] = useState<Countdown>(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIso]);

  return time;
}
