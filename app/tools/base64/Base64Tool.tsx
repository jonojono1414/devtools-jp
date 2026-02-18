'use client';

import { useState, useCallback, useEffect } from 'react';
import { InputOutput } from '@/components/tools/InputOutput';
import { CopyButton } from '@/components/tools/CopyButton';

type Mode = 'encode' | 'decode';

function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToUtf8(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

export function Base64Tool() {
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
        setOutput(utf8ToBase64(input));
      } else {
        setOutput(base64ToUtf8(input));
      }
      setError(undefined);
    } catch (e) {
      if (mode === 'decode') {
        setError('無効なBase64文字列です。入力を確認してください。');
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
      inputLabel={mode === 'encode' ? 'テキスト入力' : 'Base64入力'}
      outputLabel={mode === 'encode' ? 'Base64出力' : 'テキスト出力'}
      inputValue={input}
      outputValue={output}
      onInputChange={setInput}
      inputPlaceholder={
        mode === 'encode'
          ? 'エンコードしたいテキストを入力してください'
          : 'デコードしたいBase64文字列を入力してください'
      }
      error={error}
      actions={actions}
    />
  );
}
