'use client';

import { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

const SIZE_OPTIONS = [
  { label: '小 (200px)', value: 200 },
  { label: '中 (400px)', value: 400 },
  { label: '大 (600px)', value: 600 },
] as const;

export function QrCodeTool() {
  const [text, setText] = useState('');
  const [size, setSize] = useState<number>(400);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const generateQrCode = useCallback(async () => {
    if (!text.trim()) {
      setQrDataUrl('');
      setError('');
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(dataUrl);
      setError('');
    } catch (err) {
      setError('QRコードの生成に失敗しました。入力内容を確認してください。');
      setQrDataUrl('');
    }
  }, [text, size]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQrCode();
    }, 300);
    return () => clearTimeout(timer);
  }, [generateQrCode]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label htmlFor="qr-text" className="block text-sm font-medium text-gray-700 mb-1">
          テキストまたはURL
        </label>
        <input
          id="qr-text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
      </div>

      {/* Size selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">サイズ</label>
        <div className="flex gap-3">
          {SIZE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSize(option.value)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                size === option.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* QR Code display */}
      {qrDataUrl && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 inline-block">
            <img
              src={qrDataUrl}
              alt="生成されたQRコード"
              width={size}
              height={size}
              className="block"
            />
          </div>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            ダウンロード (PNG)
          </button>
        </div>
      )}

      {!text.trim() && (
        <div className="text-center text-gray-400 py-8">
          テキストまたはURLを入力するとQRコードが生成されます
        </div>
      )}
    </div>
  );
}
