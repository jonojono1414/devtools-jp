export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  category: string;
  emoji: string;
  keywords: string[];
}

export const categories = [
  'データ変換',
  'エンコード',
  '日時',
  '生成',
  'セキュリティ',
  '開発',
  'デザイン',
] as const;

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON整形・検証',
    description:
      'JSONデータを見やすく整形・フォーマットし、構文エラーを検証します。',
    href: '/tools/json-formatter',
    category: 'データ変換',
    emoji: '📋',
    keywords: ['JSON', '整形', 'フォーマット', '検証', 'バリデーション'],
  },
  {
    id: 'base64',
    name: 'Base64エンコード・デコード',
    description: 'テキストをBase64形式にエンコード・デコード変換します。',
    href: '/tools/base64',
    category: 'エンコード',
    emoji: '🔤',
    keywords: ['Base64', 'エンコード', 'デコード', '変換'],
  },
  {
    id: 'url-encoder',
    name: 'URLエンコード・デコード',
    description: 'URLの特殊文字をエンコード・デコード変換します。',
    href: '/tools/url-encoder',
    category: 'エンコード',
    emoji: '🔗',
    keywords: ['URL', 'エンコード', 'デコード', 'パーセントエンコーディング'],
  },
  {
    id: 'unix-timestamp',
    name: 'UNIXタイムスタンプ変換',
    description:
      'UNIXタイムスタンプと日付・時刻を相互変換します。',
    href: '/tools/unix-timestamp',
    category: '日時',
    emoji: '⏰',
    keywords: ['UNIX', 'タイムスタンプ', 'エポック', '日時変換'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID生成',
    description: 'ランダムなUUID（v4）を生成します。一括生成にも対応。',
    href: '/tools/uuid-generator',
    category: '生成',
    emoji: '🆔',
    keywords: ['UUID', 'GUID', '一意識別子', '生成'],
  },
  {
    id: 'password-generator',
    name: 'パスワード生成',
    description:
      '安全なランダムパスワードを生成します。文字種・長さをカスタマイズ可能。',
    href: '/tools/password-generator',
    category: '生成',
    emoji: '🔑',
    keywords: ['パスワード', '生成', 'ランダム', 'セキュリティ'],
  },
  {
    id: 'hash-generator',
    name: 'ハッシュ生成（MD5/SHA）',
    description:
      'テキストのMD5、SHA-1、SHA-256、SHA-512ハッシュ値を生成します。',
    href: '/tools/hash-generator',
    category: 'セキュリティ',
    emoji: '#️⃣',
    keywords: ['ハッシュ', 'MD5', 'SHA', 'SHA-256', 'チェックサム'],
  },
  {
    id: 'regex-tester',
    name: '正規表現テスター',
    description:
      '正規表現パターンをリアルタイムでテスト・検証します。マッチ結果をハイライト表示。',
    href: '/tools/regex-tester',
    category: '開発',
    emoji: '🔍',
    keywords: ['正規表現', 'regex', 'パターンマッチ', 'テスト'],
  },
  {
    id: 'qr-code-generator',
    name: 'QRコード作成',
    description:
      'テキストやURLからQRコードを生成します。PNG画像でダウンロード可能。',
    href: '/tools/qr-code-generator',
    category: '生成',
    emoji: '📱',
    keywords: ['QRコード', '二次元コード', '生成', 'ダウンロード'],
  },
  {
    id: 'color-converter',
    name: 'カラーコード変換',
    description:
      'HEX、RGB、HSLなどのカラーコードを相互変換します。カラーピッカー付き。',
    href: '/tools/color-converter',
    category: 'デザイン',
    emoji: '🎨',
    keywords: ['カラーコード', 'HEX', 'RGB', 'HSL', '色変換'],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.id === slug);
}

export function getRelatedTools(currentId: string, limit = 3): Tool[] {
  const current = tools.find((t) => t.id === currentId);
  if (!current) return tools.slice(0, limit);
  const sameCategory = tools.filter(
    (t) => t.category === current.category && t.id !== currentId
  );
  const others = tools.filter(
    (t) => t.category !== current.category && t.id !== currentId
  );
  return [...sameCategory, ...others].slice(0, limit);
}
