import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/about" className="hover:text-gray-900 dark:hover:text-white">
              サイト概要
            </Link>
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
