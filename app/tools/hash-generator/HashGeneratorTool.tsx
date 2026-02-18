'use client';

import { useState, useCallback } from 'react';
import { CopyButton } from '@/components/tools/CopyButton';

// Minimal MD5 implementation
function md5(input: string): string {
  function toUTF8(str: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 0x80) {
        bytes.push(c);
      } else if (c < 0x800) {
        bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      } else if (c < 0xd800 || c >= 0xe000) {
        bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      } else {
        i++;
        c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        bytes.push(
          0xf0 | (c >> 18),
          0x80 | ((c >> 12) & 0x3f),
          0x80 | ((c >> 6) & 0x3f),
          0x80 | (c & 0x3f)
        );
      }
    }
    return bytes;
  }

  function add32(a: number, b: number): number {
    return (a + b) & 0xffffffff;
  }

  function rotl(x: number, n: number): number {
    return ((x << n) | (x >>> (32 - n))) & 0xffffffff;
  }

  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const K = Array.from({ length: 64 }, (_, i) =>
    Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000)
  );

  const bytes = toUTF8(input);
  const bitLen = bytes.length * 8;

  // Padding
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);

  // Append length in bits as 64-bit little-endian
  for (let i = 0; i < 8; i++) {
    bytes.push((bitLen >>> (i * 8)) & 0xff);
  }

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const M: number[] = [];
    for (let j = 0; j < 16; j++) {
      const idx = offset + j * 4;
      M[j] = bytes[idx] | (bytes[idx + 1] << 8) | (bytes[idx + 2] << 16) | (bytes[idx + 3] << 24);
    }

    let A = a0, B = b0, C = c0, D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number, g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F & 0xffffffff);
      const temp = D;
      D = C;
      C = B;
      B = add32(B, rotl(add32(add32(A, F), add32(K[i], M[g])), S[i]));
      A = temp;
    }

    a0 = add32(a0, A);
    b0 = add32(b0, B);
    c0 = add32(c0, C);
    d0 = add32(d0, D);
  }

  function toHex(n: number): string {
    let s = '';
    for (let i = 0; i < 4; i++) {
      s += ((n >> (i * 8)) & 0xff).toString(16).padStart(2, '0');
    }
    return s;
  }

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

async function sha(algorithm: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface HashResult {
  name: string;
  value: string;
}

export function HashGeneratorTool() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<HashResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generate = useCallback(async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      const [sha1, sha256, sha512] = await Promise.all([
        sha('SHA-1', input),
        sha('SHA-256', input),
        sha('SHA-512', input),
      ]);
      const md5Hash = md5(input);

      setResults([
        { name: 'MD5', value: md5Hash },
        { name: 'SHA-1', value: sha1 },
        { name: 'SHA-256', value: sha256 },
        { name: 'SHA-512', value: sha512 },
      ]);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <label htmlFor="hash-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          テキスト入力
        </label>
        <textarea
          id="hash-input"
          rows={5}
          placeholder="ハッシュ化したいテキストを入力してください..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {input.length} 文字 / {new TextEncoder().encode(input).length} バイト
        </p>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        disabled={!input || isLoading}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? '計算中...' : 'ハッシュを生成'}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">生成結果</h3>
          {results.map((result) => (
            <div
              key={result.name}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {result.name}
                </span>
                <CopyButton text={result.value} />
              </div>
              <code className="block break-all font-mono text-sm text-gray-900 dark:text-gray-100">
                {result.value}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
