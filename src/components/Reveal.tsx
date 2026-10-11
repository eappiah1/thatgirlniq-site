import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li';
}

/** Wraps children with a scroll-triggered fade/slide-in (`.reveal`). */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const { ref, visible } = useInView<HTMLLIElement>();
  const Tag = as as 'li';
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
