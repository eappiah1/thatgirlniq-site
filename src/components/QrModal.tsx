import { useEffect, useRef, useState } from 'react';
import { CloseIcon, DownloadIcon } from '@/components/Icons';
import { trackShare } from '@/lib/share';

/**
 * QR modal — renders a scannable QR code of the current URL with the
 * ThatGirlNiq logo in the center. The `qrcode` library is lazy-loaded
 * only when the modal opens.
 */

interface QrModalProps {
  url: string;
  open: boolean;
  onClose: () => void;
}

export function QrModal({ url, open, onClose }: QrModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    trackShare('share_qr_open', { url });
    let cancelled = false;

    (async () => {
      try {
        const QRCode = await import('qrcode');
        if (cancelled || !canvasRef.current) return;
        await QRCode.toCanvas(canvasRef.current, url, {
          width: 260,
          margin: 2,
          errorCorrectionLevel: 'H', // high — survives the center logo
          color: { dark: '#0a0a0a', light: '#ffffff' },
        });
        // center logo overlay
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = '/assets/avatar.jpg';
        img.onload = () => {
          if (cancelled) return;
          const size = 56;
          const x = (canvas.width - size) / 2;
          const y = (canvas.height - size) / 2;
          ctx!.fillStyle = '#ffffff';
          ctx!.beginPath();
          ctx!.roundRect(x - 5, y - 5, size + 10, size + 10, 12);
          ctx!.fill();
          ctx!.drawImage(img, x, y, size, size);
        };
      } catch {
        if (!cancelled) setError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, url]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const download = () => {
    const a = document.createElement('a');
    a.href = canvasRef.current?.toDataURL('image/png') || '';
    a.download = 'thatgirlniq-qr.png';
    a.click();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QR code to share ThatGirlNiq"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-xs rounded-3xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold uppercase">Scan to Share</h3>
          <button onClick={onClose} aria-label="Close QR code" className="opacity-60 hover:opacity-100">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-4 text-sm text-[var(--ink-dim)]">Scan to share ThatGirlNiq with a friend</p>
        <div className="mx-auto mb-4 w-fit rounded-2xl bg-white p-3">
          {error ? (
            <p className="p-6 text-sm text-black">QR failed to load — your link still works: {url}</p>
          ) : (
            <canvas ref={canvasRef} className="block" aria-label={`QR code for ${url}`} />
          )}
        </div>
        <button onClick={download} className="btn btn-primary w-full justify-center !py-2.5 text-xs">
          <DownloadIcon className="h-4 w-4" />
          Download QR (PNG)
        </button>
      </div>
    </div>
  );
}
