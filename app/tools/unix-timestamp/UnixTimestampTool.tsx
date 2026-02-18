'use client';

import { useState, useEffect, useCallback } from 'react';
import { CopyButton } from '@/components/tools/CopyButton';

function formatDate(date: Date) {
  return {
    iso: date.toISOString(),
    utc: date.toUTCString(),
    locale: date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }),
  };
}

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function UnixTimestampTool() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));

  // Timestamp → Date
  const [inputTimestamp, setInputTimestamp] = useState('');
  const [convertedDate, setConvertedDate] = useState<ReturnType<typeof formatDate> | null>(null);
  const [timestampError, setTimestampError] = useState('');

  // Date → Timestamp
  const [inputDatetime, setInputDatetime] = useState('');
  const [convertedTimestamp, setConvertedTimestamp] = useState<number | null>(null);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timestamp → Date conversion
  const convertTimestampToDate = useCallback(() => {
    const raw = inputTimestamp.trim();
    if (!raw) {
      setTimestampError('タイムスタンプを入力してください');
      setConvertedDate(null);
      return;
    }

    let ts = Number(raw);
    if (isNaN(ts)) {
      setTimestampError('有効な数値を入力してください');
      setConvertedDate(null);
      return;
    }

    // Auto-detect milliseconds (13+ digits)
    if (raw.length >= 13) {
      ts = Math.floor(ts / 1000);
    }

    const date = new Date(ts * 1000);
    if (isNaN(date.getTime())) {
      setTimestampError('無効なタイムスタンプです');
      setConvertedDate(null);
      return;
    }

    setTimestampError('');
    setConvertedDate(formatDate(date));
  }, [inputTimestamp]);

  // Date → Timestamp conversion
  const convertDateToTimestamp = useCallback(() => {
    if (!inputDatetime) return;
    const date = new Date(inputDatetime);
    if (isNaN(date.getTime())) return;
    setConvertedTimestamp(Math.floor(date.getTime() / 1000));
  }, [inputDatetime]);

  return (
    <div className="space-y-8">
      {/* Current timestamp */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950">
        <p className="mb-2 text-sm font-medium text-blue-700 dark:text-blue-300">
          現在のUnixタイムスタンプ
        </p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-3xl font-bold text-blue-900 dark:text-blue-100">
            {currentTimestamp}
          </span>
          <CopyButton text={String(currentTimestamp)} />
        </div>
      </div>

      {/* Timestamp → Date */}
      <div className="space-y-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Unixタイムスタンプ → 日時
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="例: 1700000000"
            value={inputTimestamp}
            onChange={(e) => setInputTimestamp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && convertTimestampToDate()}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={convertTimestampToDate}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            変換
          </button>
        </div>
        {timestampError && (
          <p className="text-sm text-red-600 dark:text-red-400">{timestampError}</p>
        )}
        {convertedDate && (
          <div className="space-y-2 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">ISO 8601:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                  {convertedDate.iso}
                </code>
                <CopyButton text={convertedDate.iso} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">UTC:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                  {convertedDate.utc}
                </code>
                <CopyButton text={convertedDate.utc} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">ローカル:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                  {convertedDate.locale}
                </code>
                <CopyButton text={convertedDate.locale} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div className="space-y-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          日時 → Unixタイムスタンプ
        </h3>
        <div className="flex gap-3">
          <input
            type="datetime-local"
            step="1"
            value={inputDatetime}
            onChange={(e) => setInputDatetime(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={convertDateToTimestamp}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            変換
          </button>
        </div>
        <button
          onClick={() => {
            const now = new Date();
            setInputDatetime(toDatetimeLocalValue(now));
            setConvertedTimestamp(Math.floor(now.getTime() / 1000));
          }}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          現在の日時を設定
        </button>
        {convertedTimestamp !== null && (
          <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 dark:bg-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">タイムスタンプ:</span>
            <code className="font-mono text-lg font-bold text-gray-900 dark:text-gray-100">
              {convertedTimestamp}
            </code>
            <CopyButton text={String(convertedTimestamp)} />
          </div>
        )}
      </div>
    </div>
  );
}
