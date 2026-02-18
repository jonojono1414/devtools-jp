import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { RegexTesterTool } from './RegexTesterTool';

const tool = getToolBySlug('regex-tester')!;

const faq = [
  {
    question: '正規表現のフラグ（g, i, m, s）はそれぞれ何を意味しますか？',
    answer:
      'g（グローバル）は全てのマッチを検索します。i（大文字小文字無視）は大文字・小文字を区別しません。m（複数行）は^と$が各行の先頭・末尾にマッチします。s（dotAll）は.が改行文字にもマッチします。',
  },
  {
    question: '入力した正規表現やテスト文字列はサーバーに送信されますか？',
    answer:
      'いいえ、すべての処理はブラウザ上で行われます。入力データがサーバーに送信されることはありません。安心してご利用ください。',
  },
  {
    question: 'キャプチャグループの結果も確認できますか？',
    answer:
      'はい、名前付きグループを含むキャプチャグループの結果がマッチ結果の詳細に表示されます。各グループのインデックスとマッチしたテキストを確認できます。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    '正規表現パターンを上部の入力欄に入力します。',
    '必要に応じてフラグ（g, i, m, s）のチェックボックスを選択します。',
    'テスト文字列をテキストエリアに入力します。',
    'マッチ結果がリアルタイムでハイライト表示され、詳細情報が下部に表示されます。',
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
        <RegexTesterTool />
      </ToolPageLayout>
    </>
  );
}
