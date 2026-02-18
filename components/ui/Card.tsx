import Link from 'next/link';

interface CardProps {
  href: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
}

export function Card({ href, emoji, title, description, category }: CardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {category}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </Link>
  );
}
