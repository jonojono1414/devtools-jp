import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { HashGeneratorTool } from './HashGeneratorTool';

const tool = getToolBySlug('hash-generator')!;

const faq = [
  {
    question: 'ハッシュとは何ですか？',
    answer:
      'ハッシュは、任意の長さのデータを固定長の文字列に変換する一方向の関数です。同じ入力からは常に同じハッシュ値が生成されますが、ハッシュ値から元のデータを復元することはできません。データの整合性検証やパスワードの保存などに使われます。',
  },
  {
    question: 'MD5は安全ですか？',
    answer:
      'MD5は衝突攻撃に対して脆弱であることが知られており、セキュリティ目的での使用は推奨されません。ファイルのチェックサム確認など、セキュリティが重要でない用途では引き続き使われることがありますが、セキュリティ用途にはSHA-256以上を推奨します。',
  },
  {
    question: '入力データはサーバーに送信されますか？',
    answer:
      'いいえ。すべてのハッシュ計算はブラウザ内のWeb Crypto APIとJavaScriptで処理されます。入力データがサーバーに送信されることは一切ありません。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'テキストエリアにハッシュ化したい文字列を入力します。',
    '「ハッシュを生成」ボタンをクリックします。',
    'MD5、SHA-1、SHA-256、SHA-512の4種類のハッシュ値が同時に生成されます。',
    '各ハッシュ値の横にあるコピーボタンでクリップボードにコピーできます。',
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
        <HashGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
