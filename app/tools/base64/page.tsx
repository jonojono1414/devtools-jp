import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { Base64Tool } from './Base64Tool';

const tool = getToolBySlug('base64')!;

const faq = [
  {
    question: 'Base64エンコードとは何ですか？',
    answer: 'Base64は、バイナリデータをASCII文字列に変換するエンコード方式です。メールの添付ファイルやデータURIなど、テキストのみ扱える環境でバイナリデータを安全にやり取りする際に使用されます。',
  },
  {
    question: '日本語のテキストもBase64エンコードできますか？',
    answer: 'はい、このツールはUTF-8エンコーディングに対応しているため、日本語を含むマルチバイト文字も正しくエンコード・デコードできます。',
  },
  {
    question: 'Base64エンコードはセキュリティのために使えますか？',
    answer: 'いいえ、Base64は暗号化ではなくエンコードです。誰でも簡単にデコードできるため、パスワードや機密情報の保護には適していません。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'テキストエリアに変換したいテキストを入力します',
    'エンコードまたはデコードのモードを選択します',
    '入力内容がリアルタイムで変換され、結果が出力エリアに表示されます',
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
        <Base64Tool />
      </ToolPageLayout>
    </>
  );
}
