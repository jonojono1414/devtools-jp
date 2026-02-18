'use client';

import { useState, useCallback, useEffect } from 'react';
import { InputOutput } from '@/components/tools/InputOutput';
import { CopyButton } from '@/components/tools/CopyButton';

type Mode = 'encode' | 'decode';

export function UrlEncoderTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [error, setError] = useState<string | undefined>();

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(undefined);
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError(undefined);
    } catch (e) {
      if (mode === 'decode') {
        setError('無効なURLエンコード文字列です。入力を確認してください。');
      } else {
        setError(`エンコードエラー: ${e instanceof Error ? e.message : '不明なエラー'}`);
      }
      setOutput('');
    }
  }, [input, mode]);

  useEffect(() => {
    convert();
  }, [convert]);

  const actions = (
    <div className="flex gap-2 items-center">
      <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'encode'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          エンコード
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          デコード
        </button>
      </div>
      {output && <CopyButton text={output} />}
    </div>
  );

  return (
    <InputOutput
      inputLabel={mode === 'encode' ? 'テキスト入力' : 'URLエンコード入力'}
      outputLabel={mode === 'encode' ? 'URLエンコード出力' : 'テキスト出力'}
      inputValue={input}
      outputValue={output}
      onInputChange={setInput}
      inputPlaceholder={
        mode === 'encode'
          ? 'エンコードしたいテキストを入力してください（例: こんにちは 世界）'
          : 'デコードしたい文字列を入力してください（例: %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF）'
      }
      error={error}
      actions={actions}
    />
  );
}
