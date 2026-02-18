'use client';

import { useState, useCallback } from 'react';
import { CopyButton } from '@/components/tools/CopyButton';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

type CharsetKey = keyof typeof CHARSETS;

function getStrength(password: string, options: Record<CharsetKey, boolean>): { label: string; color: string; percent: number } {
  const len = password.length;
  const typesUsed = Object.values(options).filter(Boolean).length;

  let score = 0;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (len >= 16) score++;
  if (len >= 24) score++;
  score += typesUsed;

  if (score <= 2) return { label: '弱い', color: 'bg-red-500', percent: 25 };
  if (score <= 4) return { label: '普通', color: 'bg-yellow-500', percent: 50 };
  if (score <= 6) return { label: '強い', color: 'bg-green-500', percent: 75 };
  return { label: 'とても強い', color: 'bg-emerald-500', percent: 100 };
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<Record<CharsetKey, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');

  const toggleOption = (key: CharsetKey) => {
    const next = { ...options, [key]: !options[key] };
    // Ensure at least one option is checked
    if (Object.values(next).some(Boolean)) {
      setOptions(next);
    }
  };

  const generate = useCallback(() => {
    let charset = '';
    for (const [key, enabled] of Object.entries(options)) {
      if (enabled) charset += CHARSETS[key as CharsetKey];
    }
    if (charset.length === 0) return;

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  }, [length, options]);

  const strength = password ? getStrength(password, options) : null;

  const optionLabels: Record<CharsetKey, string> = {
    uppercase: '大文字 (A-Z)',
    lowercase: '小文字 (a-z)',
    numbers: '数字 (0-9)',
    symbols: '記号 (!@#$...)',
  };

  return (
    <div className="space-y-6">
      {/* Length slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="pw-length" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            パスワードの長さ
          </label>
          <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
            {length}
          </span>
        </div>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      {/* Character type options */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">使用する文字種</p>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(CHARSETS) as CharsetKey[]).map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => toggleOption(key)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 accent-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{optionLabels[key]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        パスワードを生成
      </button>

      {/* Result */}
      {password && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <code className="flex-1 break-all font-mono text-base text-gray-900 dark:text-gray-100">
              {password}
            </code>
            <CopyButton text={password} />
          </div>

          {/* Strength indicator */}
          {strength && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">強度:</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {strength.label}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full rounded-full transition-all ${strength.color}`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
