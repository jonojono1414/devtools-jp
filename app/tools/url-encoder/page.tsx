import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { UrlEncoderTool } from './UrlEncoderTool';

const tool = getToolBySlug('url-encoder')!;

const faq = [
  {
    question: 'URLエンコードとは何ですか？',
    answer: 'URLエンコード（パーセントエンコーディング）は、URLに含められない特殊文字や日本語などのマルチバイト文字を、%に続く16進数で表現する変換方式です。',
  },
  {
    question: 'URLエンコードはいつ必要ですか？',
    answer: 'クエリパラメータに日本語や特殊文字（&、=、スペースなど）を含める場合に必要です。APIリクエストの作成やリンクの生成時によく使用されます。',
  },
  {
    question: 'encodeURIとencodeURIComponentの違いは何ですか？',
    answer: 'このツールではencodeURIComponentを使用しています。encodeURIComponentはURL全体ではなく、クエリパラメータの値など部分的なエンコードに適しており、/:@などの文字もエンコードします。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'テキストエリアにエンコードまたはデコードしたい文字列を入力します',
    'エンコードまたはデコードのモードを選択します',
    '入力内容がリアルタイムで変換され、結果が表示されます',
    'コピーボタンで結果をクリップボードにコピーできます',
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
        <UrlEncoderTool />
      </ToolPageLayout>
    </>
  );
}
