'use client';

interface AdBannerProps {
  slot: string;
}

export function AdBanner({ slot }: AdBannerProps) {
  // AdSense承認後にスクリプトを有効化
  return (
    <div
      className="flex min-h-[90px] items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400 dark:bg-gray-800/50"
      data-ad-slot={slot}
    >
      {/* 広告スペース - AdSense承認後に有効化 */}
    </div>
  );
}
