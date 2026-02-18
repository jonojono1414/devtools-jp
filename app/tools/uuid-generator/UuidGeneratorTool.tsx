'use client';

import { useState, useCallback } from 'react';
import { CopyButton } from '@/components/tools/CopyButton';

export function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generateSingle = useCallback(() => {
    const uuid = crypto.randomUUID();
    setUuids([uuid]);
  }, []);

  const generateMultiple = useCallback(() => {
    const clampedCount = Math.min(Math.max(1, count), 100);
    const generated: string[] = [];
    for (let i = 0; i < clampedCount; i++) {
      generated.push(crypto.randomUUID());
    }
    setUuids(generated);
  }, [count]);

  const allText = uuids.join('\n');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={generateSingle}
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          UUIDを生成
        </button>

        <div className="flex items-center gap-2">
          <label htmlFor="uuid-count" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            生成数:
          </label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={generateMultiple}
            className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            一括生成
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              生成結果（{uuids.length}件）
            </h3>
            {uuids.length > 1 && <CopyButton text={allText} />}
          </div>

          <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {uuids.map((uuid, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    {uuid}
                  </code>
                  <CopyButton text={uuid} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
