import { tools } from '@/lib/tools-data';
import { Card } from '@/components/ui/Card';
import { SITE_NAME } from '@/lib/constants';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          🛠️ {SITE_NAME}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          開発者のための無料オンラインツール集。
          すべてのツールがブラウザ上で動作し、データがサーバーに送信されることはありません。
        </p>
      </section>

      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card
              key={tool.id}
              href={tool.href}
              emoji={tool.emoji}
              title={tool.name}
              description={tool.description}
              category={tool.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
