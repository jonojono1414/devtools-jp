import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { JsonFormatterTool } from './JsonFormatterTool';

const tool = getToolBySlug('json-formatter')!;

const faq = [
  {
    question: 'JSON整形ツールは無料で使えますか？',
    answer: 'はい、完全無料でご利用いただけます。ブラウザ上で動作するため、データがサーバーに送信されることもありません。',
  },
  {
    question: '大きなJSONファイルも整形できますか？',
    answer: 'ブラウザのメモリが許す範囲であれば、大きなJSONデータも整形可能です。ただし、非常に大きなデータの場合は処理に時間がかかることがあります。',
  },
  {
    question: 'JSONの圧縮（minify）とは何ですか？',
    answer: 'JSON圧縮は、不要な空白や改行を取り除いてデータサイズを最小化する処理です。APIリクエストやデータ転送時にサイズを削減したい場合に便利です。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'テキストエリアにJSONデータを貼り付けます',
    '「整形」ボタンをクリックすると、見やすくインデントされたJSONが出力されます',
    '「圧縮」ボタンをクリックすると、空白を除去した最小化JSONが出力されます',
    '出力結果をコピーして利用できます',
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
        <JsonFormatterTool />
      </ToolPageLayout>
    </>
  );
}
