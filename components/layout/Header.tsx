import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <span className="text-2xl">🛠️</span>
          {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 sm:flex dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
            ツール一覧
          </Link>
          <Link href="/about" className="hover:text-gray-900 dark:hover:text-white">
            このサイトについて
          </Link>
        </nav>
      </div>
    </header>
  );
}
