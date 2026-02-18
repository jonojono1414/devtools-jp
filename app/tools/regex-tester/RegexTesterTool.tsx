'use client';

import { useState, useMemo } from 'react';

interface MatchResult {
  text: string;
  index: number;
  groups: Record<string, string> | undefined;
}

const FLAG_OPTIONS = [
  { label: 'g', description: 'グローバル' },
  { label: 'i', description: '大文字小文字無視' },
  { label: 'm', description: '複数行' },
  { label: 's', description: 'dotAll' },
] as const;

export function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState<Set<string>>(new Set(['g']));
  const [testString, setTestString] = useState('');

  const toggleFlag = (flag: string) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) {
        next.delete(flag);
      } else {
        next.add(flag);
      }
      return next;
    });
  };

  const { matches, error, highlightedHtml } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [] as MatchResult[], error: '', highlightedHtml: '' };
    }

    try {
      const flagStr = Array.from(flags).sort().join('');
      const regex = new RegExp(pattern, flagStr);

      const matchResults: MatchResult[] = [];

      if (flagStr.includes('g')) {
        let match: RegExpExecArray | null;
        // Reset lastIndex
        regex.lastIndex = 0;
        while ((match = regex.exec(testString)) !== null) {
          matchResults.push({
            text: match[0],
            index: match.index,
            groups: match.groups ? { ...match.groups } : undefined,
          });
          // Prevent infinite loop on zero-length matches
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matchResults.push({
            text: match[0],
            index: match.index,
            groups: match.groups ? { ...match.groups } : undefined,
          });
        }
      }

      // Build highlighted HTML
      let html = '';
      let lastIndex = 0;
      for (const m of matchResults) {
        // Escape and add text before this match
        html += escapeHtml(testString.slice(lastIndex, m.index));
        // Add highlighted match
        html += `<mark class="bg-yellow-300 text-black rounded px-0.5">${escapeHtml(m.text)}</mark>`;
        lastIndex = m.index + m.text.length;
      }
      // Add remaining text
      html += escapeHtml(testString.slice(lastIndex));

      return { matches: matchResults, error: '', highlightedHtml: html };
    } catch (err) {
      return {
        matches: [] as MatchResult[],
        error: err instanceof Error ? err.message : '無効な正規表現です',
        highlightedHtml: '',
      };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="space-y-6">
      {/* Pattern input */}
      <div>
        <label htmlFor="regex-pattern" className="block text-sm font-medium text-gray-700 mb-1">
          正規表現パターン
        </label>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-lg">/</span>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[a-zA-Z0-9]+"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
          <span className="text-gray-400 text-lg">/{Array.from(flags).sort().join('')}</span>
        </div>
      </div>

      {/* Flags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">フラグ</label>
        <div className="flex gap-4 flex-wrap">
          {FLAG_OPTIONS.map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flags.has(opt.label)}
                onChange={() => toggleFlag(opt.label)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-mono text-sm font-bold">{opt.label}</span>
              <span className="text-xs text-gray-500">({opt.description})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Test string */}
      <div>
        <label htmlFor="test-string" className="block text-sm font-medium text-gray-700 mb-1">
          テスト文字列
        </label>
        <textarea
          id="test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="ここにテスト文字列を入力..."
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-y"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          <span className="font-medium">エラー:</span> {error}
        </div>
      )}

      {/* Highlighted result */}
      {highlightedHtml && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">マッチ結果（ハイライト）</h3>
          <div
            className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {/* Match details */}
      {matches.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            マッチ詳細（{matches.length}件）
          </h3>
          <div className="space-y-2">
            {matches.map((m, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm"
              >
                <div className="flex gap-4 flex-wrap">
                  <span>
                    <span className="text-gray-500">マッチ {i + 1}:</span>{' '}
                    <code className="bg-yellow-100 px-1 rounded">{m.text}</code>
                  </span>
                  <span>
                    <span className="text-gray-500">位置:</span> {m.index}
                  </span>
                </div>
                {m.groups && Object.keys(m.groups).length > 0 && (
                  <div className="mt-2">
                    <span className="text-gray-500">グループ:</span>
                    <div className="ml-4 mt-1 space-y-1">
                      {Object.entries(m.groups).map(([key, val]) => (
                        <div key={key}>
                          <code className="text-blue-600">{key}</code>:{' '}
                          <code className="bg-gray-100 px-1 rounded">{val}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {pattern && testString && !error && matches.length === 0 && (
        <div className="text-center text-gray-400 py-4">マッチする箇所がありません</div>
      )}
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
