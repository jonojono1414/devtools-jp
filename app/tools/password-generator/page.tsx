import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { PasswordGeneratorTool } from './PasswordGeneratorTool';

const tool = getToolBySlug('password-generator')!;

const faq = [
  {
    question: '生成されたパスワードはどこかに保存されますか？',
    answer:
      'いいえ。パスワードの生成はすべてブラウザ内で行われ、サーバーに送信されることは一切ありません。ページを閉じるとパスワードは消去されます。安全に利用できます。',
  },
  {
    question: '安全なパスワードの長さはどのくらいですか？',
    answer:
      '一般的に、16文字以上で大文字・小文字・数字・記号を含むパスワードが推奨されます。重要なアカウントには20文字以上のパスワードを使用することをお勧めします。',
  },
  {
    question: 'パスワードの強度はどのように判定されますか？',
    answer:
      'パスワードの長さと使用される文字種（大文字、小文字、数字、記号）の組み合わせに基づいて強度を判定しています。文字種が多く、長いパスワードほど強度が高くなります。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'スライダーでパスワードの長さを設定します（8〜128文字）。',
    '使用する文字種（大文字、小文字、数字、記号）をチェックボックスで選択します。',
    '「パスワードを生成」ボタンをクリックして、パスワードを生成します。',
    'コピーボタンをクリックして、生成されたパスワードをクリップボードにコピーします。',
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
        <PasswordGeneratorTool />
      </ToolPageLayout>
    </>
  );
}
