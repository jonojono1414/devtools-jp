'use client';

export function AdSidebar() {
  // AdSense承認後にスクリプトを有効化
  return (
    <div className="sticky top-24">
      <div
        className="flex h-[250px] w-[300px] items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-400 dark:bg-gray-800/50"
        data-ad-slot="sidebar"
      >
        {/* 広告スペース - AdSense承認後に有効化 */}
      </div>
    </div>
  );
}
