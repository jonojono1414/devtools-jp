'use client';

import { CopyButton } from './CopyButton';

interface InputOutputProps {
  inputLabel: string;
  outputLabel: string;
  inputValue: string;
  outputValue: string;
  onInputChange: (value: string) => void;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  inputRows?: number;
  outputRows?: number;
  readonly?: boolean;
  error?: string;
  actions?: React.ReactNode;
}

export function InputOutput({
  inputLabel,
  outputLabel,
  inputValue,
  outputValue,
  onInputChange,
  inputPlaceholder,
  outputPlaceholder,
  inputRows = 6,
  outputRows = 6,
  readonly = true,
  error,
  actions,
}: InputOutputProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {inputLabel}
        </label>
        <textarea
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={inputPlaceholder}
          rows={inputRows}
          className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {actions && <div className="mt-2 flex gap-2">{actions}</div>}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {outputLabel}
          </label>
          {outputValue && <CopyButton text={outputValue} />}
        </div>
        <textarea
          value={outputValue}
          readOnly={readonly}
          placeholder={outputPlaceholder}
          rows={outputRows}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
