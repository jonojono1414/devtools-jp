import { SITE_NAME, SITE_URL } from '@/lib/constants';
import type { Tool } from '@/lib/tools-data';

interface StructuredDataProps {
  tool: Tool;
  faq?: { question: string; answer: string }[];
}

export function StructuredData({ tool, faq }: StructuredDataProps) {
  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${tool.name} - ${SITE_NAME}`,
    description: tool.description,
    url: `${SITE_URL}${tool.href}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.name,
        item: `${SITE_URL}${tool.href}`,
      },
    ],
  };

  const faqSchema =
    faq && faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
