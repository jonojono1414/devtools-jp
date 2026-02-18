import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { UnixTimestampTool } from './UnixTimestampTool';

const tool = getToolBySlug('unix-timestamp')!;

const faq = [
  {
    question: 'Unixタイムスタンプとは何ですか？',
    answer:
      'Unixタイムスタンプ（エポック秒）は、1970年1月1日00:00:00 UTC（Unix Epoch）からの経過秒数です。プログラミングやデータベースでの日時管理に広く使われており、タイムゾーンに依存しない日時表現として便利です。',
  },
  {
    question: 'ミリ秒のタイムスタンプにも対応していますか？',
    answer:
      'このツールでは秒単位のUnixタイムスタンプを扱います。ミリ秒のタイムスタンプ（13桁）が入力された場合は、自動的に秒単位に変換して処理します。',
  },
  {
    question: '表示されるタイムゾーンは変更できますか？',
    answer:
      '現在の日時表示はブラウザのローカルタイムゾーンとUTCの両方で表示されます。お使いのデバイスのタイムゾーン設定に基づいてローカル時刻が表示されます。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'ページ上部に現在のUnixタイムスタンプがリアルタイムで表示されます。',
    'Unixタイムスタンプを入力すると、人間が読める日時形式に変換されます。',
    '日時を入力すると、対応するUnixタイムスタンプに変換されます。',
    'コピーボタンで変換結果をクリップボードにコピーできます。',
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
        <UnixTimestampTool />
      </ToolPageLayout>
    </>
  );
}
