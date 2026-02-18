'use client';

import { useEffect, useRef } from 'react';

export function AdSidebar() {
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
    <div className="sticky top-24">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot="sidebar"
        data-ad-format="vertical"
        data-full-width-responsive="false"
      />
    </div>
  );
}
