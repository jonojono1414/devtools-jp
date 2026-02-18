'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
}

export function AdBanner({ slot }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) return;
    if (pushed.current) return;
    try {
      ((window as unknown as Record<string, unknown[]>).adsbygoogle =
        (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <div className="my-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
