import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `このサイトについて | ${SITE_NAME}`,
  description: `${SITE_NAME}は開発者向けの無料オンラインツール集です。すべてのツールはブラウザ上で動作し、データがサーバーに送信されることはありません。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        このサイトについて
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            {SITE_NAME}とは
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            {SITE_NAME}
            は、開発者のための無料オンラインツールコレクションです。
            JSON整形、Base64エンコード、正規表現テスト、カラー変換など、
            日常的な開発作業で必要となるさまざまなツールを提供しています。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            プライバシーとセキュリティ
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            すべてのツールはクライアントサイド（ブラウザ上）で動作します。
            入力されたデータがサーバーに送信されることは一切ありません。
            安心して機密性の高いデータの処理にもご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            技術スタック
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            本サイトは以下の技術を使用して構築されています。
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
            <li>Next.js (App Router)</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Vercel (ホスティング)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            お問い合わせ
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            ご意見・ご要望・バグ報告などは、
            <Link
              href="/contact"
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
}
