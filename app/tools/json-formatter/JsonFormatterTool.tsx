'use client';

import { useState, useCallback } from 'react';
import { InputOutput } from '@/components/tools/InputOutput';
import { CopyButton } from '@/components/tools/CopyButton';

export function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | undefined>();

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(undefined);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(undefined);
    } catch (e) {
      setError(`無効なJSONです: ${e instanceof Error ? e.message : '不明なエラー'}`);
      setOutput('');
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError(undefined);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(undefined);
    } catch (e) {
      setError(`無効なJSONです: ${e instanceof Error ? e.message : '不明なエラー'}`);
      setOutput('');
    }
  }, [input]);

  const actions = (
    <div className="flex gap-2">
      <button
        onClick={handleFormat}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        整形
      </button>
      <button
        onClick={handleMinify}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
      >
        圧縮
      </button>
      {output && <CopyButton text={output} />}
    </div>
  );

  return (
    <InputOutput
      inputLabel="JSON入力"
      outputLabel="出力結果"
      inputValue={input}
      outputValue={output}
      onInputChange={setInput}
      inputPlaceholder='{"key": "value", "number": 123}'
      error={error}
      actions={actions}
    />
  );
}
