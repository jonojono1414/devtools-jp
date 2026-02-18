import Link from 'next/link';
import { getRelatedTools, type Tool } from '@/lib/tools-data';
import { Card } from '@/components/ui/Card';
import { AdBanner } from '@/components/ads/AdBanner';
import { AdSidebar } from '@/components/ads/AdSidebar';

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
  usage?: { title: string; steps: string[] };
  faq?: { question: string; answer: string }[];
}

export function ToolPageLayout({
  tool,
  children,
  usage,
  faq,
}: ToolPageLayoutProps) {
  const relatedTools = getRelatedTools(tool.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* パンくずリスト */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
          ホーム
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white">{tool.name}</span>
      </nav>

      <div className="flex gap-8">
        {/* メインコンテンツ */}
        <div className="min-w-0 flex-1">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            {tool.emoji} {tool.name}
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            {tool.description}
          </p>

          <AdBanner slot="tool-top" />

          <div className="my-8">{children}</div>

          <AdBanner slot="tool-bottom" />

          {/* 使い方セクション */}
          {usage && (
            <section className="mt-12">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {usage.title}
              </h2>
              <ol className="list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300">
                {usage.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQセクション */}
          {faq && faq.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                よくある質問
              </h2>
              <dl className="space-y-4">
                {faq.map((item, i) => (
                  <div key={i}>
                    <dt className="font-semibold text-gray-900 dark:text-white">
                      Q. {item.question}
                    </dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-300">
                      A. {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* 関連ツール */}
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              関連ツール
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedTools.map((t) => (
                <Card
                  key={t.id}
                  href={t.href}
                  emoji={t.emoji}
                  title={t.name}
                  description={t.description}
                  category={t.category}
                />
              ))}
            </div>
          </section>
        </div>

        {/* サイドバー（デスクトップのみ） */}
        <aside className="hidden w-[300px] shrink-0 lg:block">
          <AdSidebar />
        </aside>
      </div>
    </div>
  );
}
