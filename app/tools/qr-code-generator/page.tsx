import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { QrCodeTool } from './QrCodeTool';

const tool = getToolBySlug('qr-code-generator')!;

const faq = [
  {
    question: '生成したQRコードに有効期限はありますか？',
    answer:
      'いいえ、生成したQRコードに有効期限はありません。QRコードはテキストやURLをエンコードした画像であり、ダウンロード後は永久にご利用いただけます。',
  },
  {
    question: 'QRコードの生成にデータはサーバーに送信されますか？',
    answer:
      'いいえ、すべての処理はブラウザ上で完結します。入力されたテキストやURLがサーバーに送信されることはありません。',
  },
  {
    question: '日本語のテキストもQRコードにできますか？',
    answer:
      'はい、日本語を含むUTF-8テキストをQRコードに変換できます。ただし、文字数が多いとQRコードが複雑になり、読み取りにくくなる場合があります。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'テキストまたはURLを入力欄に入力します。',
    '必要に応じてQRコードのサイズを選択します。',
    'QRコードがリアルタイムで生成・表示されます。',
    '「ダウンロード」ボタンをクリックしてPNG画像として保存します。',
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
        <QrCodeTool />
      </ToolPageLayout>
    </>
  );
}
