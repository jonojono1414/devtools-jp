import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { UuidGeneratorTool } from './UuidGeneratorTool';

const tool = getToolBySlug('uuid-generator')!;

const faq = [
  {
    question: 'UUID v4とは何ですか？',
    answer:
      'UUID v4はランダムに生成される128ビットの一意識別子です。暗号学的に安全な乱数を使用して生成されるため、衝突の可能性は極めて低く、データベースの主キーやセッションIDなど幅広い用途で利用されています。',
  },
  {
    question: '生成されたUUIDは安全ですか？',
    answer:
      'はい。このツールはブラウザのcrypto.randomUUID() APIを使用しており、暗号学的に安全な乱数生成器に基づいています。すべての処理はブラウザ内で完結し、サーバーにデータが送信されることはありません。',
  },
  {
    question: 'UUIDの重複が発生する可能性はありますか？',
    answer:
      'UUID v4は122ビットのランダムデータを含むため、理論的には重複する可能性がありますが、その確率は天文学的に低いです。毎秒10億個のUUIDを生成し続けても、重複が発生するまでに約85年かかると言われています。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    '「UUIDを生成」ボタンをクリックして、1つのUUID v4を生成します。',
    '複数のUUIDが必要な場合は、生成数を入力して「一括生成」ボタンをクリックします。',
    '生成されたUUIDの横にあるコピーボタンで個別にコピーできます。',
    '「すべてコピー」ボタンで、生成されたすべてのUUIDを一括コピーできます。',
  ],
};

export const metadata: Metadata = {
  title: `${tool.name} - 無料オンラインツール`,
  description: tool.description,
  keywords: tool.keywords,
  openGraph: {
    title: `${tool.name} | ${SITE_NAME}`,
    description: tool.description,
  },
};

export default function Page() {
  return (
    <>
      <StructuredData tool={tool} faq={faq} />
      <ToolPageLayout tool={tool} usage={usage} faq={faq}>
        <UuidGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
