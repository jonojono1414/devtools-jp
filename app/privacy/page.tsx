import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `プライバシーポリシー | ${SITE_NAME}`,
  description: `${SITE_NAME}のプライバシーポリシーです。Cookie、広告、アクセス解析、個人情報の取り扱いについてご説明します。`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        プライバシーポリシー
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            個人情報の取り扱いについて
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            {SITE_NAME}
            （以下「当サイト」）で提供するすべてのツールは、ブラウザ上（クライアントサイド）で動作します。
            ツールに入力されたデータがサーバーに送信されることはありません。
            当サイトでは、ツールの利用に際して個人情報を収集することはありません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Cookieの使用について
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            当サイトでは、サービスの改善およびユーザー体験の向上のためにCookieを使用しています。
            Cookieは、ウェブサイトがブラウザに保存する小さなテキストファイルです。
            ブラウザの設定によりCookieの受け入れを拒否することができますが、
            一部の機能が正しく動作しなくなる場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            アクセス解析ツールについて
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            当サイトでは、Googleによるアクセス解析ツール「Google
            Analytics」を使用しています。 Google
            Analyticsはトラフィックデータの収集のためにCookieを使用しています。
            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
            この機能はCookieを無効にすることで収集を拒否できます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            広告について
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            当サイトでは、第三者配信の広告サービス「Google
            AdSense」を利用しています。 Google
            AdSenseは、ユーザーの興味に応じた広告を配信するために、
            Cookie（DoubleClick
            Cookie）を使用することがあります。
            ユーザーは、Googleの広告設定ページからパーソナライズ広告を無効にすることができます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            免責事項
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            当サイトのツールやコンテンツの正確性・完全性について、可能な限り正確な情報を提供するよう努めておりますが、
            その正確性や安全性を保証するものではありません。
            当サイトの利用により生じたいかなる損害についても、当サイトは責任を負いかねます。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            お問い合わせ
          </h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            プライバシーポリシーに関するお問い合わせは、
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
