import type { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { ToolPageLayout } from '@/components/tools/ToolPageLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { SITE_NAME } from '@/lib/constants';
import { ColorConverterTool } from './ColorConverterTool';

const tool = getToolBySlug('color-converter')!;

const faq = [
  {
    question: 'HEX、RGB、HSLの違いは何ですか？',
    answer:
      'HEXは16進数で色を表現する形式（例：#FF5733）、RGBは赤・緑・青の3色の値（0-255）で表現する形式、HSLは色相・彩度・明度で表現する形式です。用途に応じて使い分けますが、すべて同じ色を異なる方法で表現しています。',
  },
  {
    question: '変換結果は正確ですか？',
    answer:
      'はい、数学的に正確な変換を行っています。ただし、HSLからRGB/HEXへの変換時に小数点の丸めが発生するため、ごくわずかな差異が生じる場合があります。',
  },
  {
    question: 'CSSでそのまま使える形式で出力されますか？',
    answer:
      'はい、HEX（#RRGGBB）、RGB（rgb(r, g, b)）、HSL（hsl(h, s%, l%)）のいずれもCSSでそのまま使用できる形式で出力されます。コピーボタンでクリップボードにコピーできます。',
  },
];

const usage = {
  title: '使い方',
  steps: [
    'カラーピッカーから色を選択するか、HEX/RGB/HSLの値を直接入力します。',
    'いずれかの値を変更すると、他の形式の値が自動的に同期されます。',
    '必要な形式のコピーボタンをクリックしてクリップボードにコピーします。',
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
        <ColorConverterTool />
      </ToolPageLayout>
    </>
  );
}
