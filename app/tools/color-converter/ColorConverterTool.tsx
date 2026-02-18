'use client';

import { useState, useCallback } from 'react';
import { CopyButton } from '@/components/tools/CopyButton';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

// --- Conversion helpers ---

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): RGB | null {
  const match = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!match) return null;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / delta + 2) / 6;
    } else {
      h = ((rNorm - gNorm) / delta + 4) / 6;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c; g = x; b = 0;
  } else if (h < 120) {
    r = x; g = c; b = 0;
  } else if (h < 180) {
    r = 0; g = c; b = x;
  } else if (h < 240) {
    r = 0; g = x; b = c;
  } else if (h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// --- Component ---

export function ColorConverterTool() {
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hex, setHex] = useState('#3b82f6');
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });

  const updateFromRgb = useCallback((newRgb: RGB) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb));
    setHsl(rgbToHsl(newRgb));
  }, []);

  const updateFromHex = useCallback((newHex: string) => {
    setHex(newHex);
    const parsed = hexToRgb(newHex);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    }
  }, []);

  const updateFromHsl = useCallback((newHsl: HSL) => {
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb));
  }, []);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFromHex(value);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    }
  };

  const handleRgbChange = (channel: keyof RGB, value: string) => {
    const num = parseInt(value) || 0;
    const clamped = Math.max(0, Math.min(255, num));
    const newRgb = { ...rgb, [channel]: clamped };
    updateFromRgb(newRgb);
  };

  const handleHslChange = (channel: keyof HSL, value: string) => {
    const num = parseInt(value) || 0;
    let clamped: number;
    if (channel === 'h') {
      clamped = Math.max(0, Math.min(360, num));
    } else {
      clamped = Math.max(0, Math.min(100, num));
    }
    const newHsl = { ...hsl, [channel]: clamped };
    updateFromHsl(newHsl);
  };

  const hexStr = hex.toUpperCase();
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-6">
      {/* Color preview and picker */}
      <div className="flex items-start gap-6 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">カラーピッカー</label>
          <input
            type="color"
            value={hex.length === 7 ? hex : '#3b82f6'}
            onChange={handleColorPicker}
            className="w-16 h-16 rounded-lg cursor-pointer border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">プレビュー</label>
          <div
            className="w-32 h-16 rounded-lg border border-gray-300 shadow-inner"
            style={{ backgroundColor: hex.length === 7 ? hex : '#3b82f6' }}
          />
        </div>
      </div>

      {/* HEX */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">HEX</label>
          <CopyButton text={hexStr} />
        </div>
        <input
          type="text"
          value={hex}
          onChange={handleHexInput}
          maxLength={7}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
      </div>

      {/* RGB */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">RGB</label>
          <CopyButton text={rgbStr} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['r', 'g', 'b'] as const).map((channel) => (
            <div key={channel}>
              <label className="block text-xs text-gray-500 mb-1 uppercase">{channel}</label>
              <input
                type="number"
                min={0}
                max={255}
                value={rgb[channel]}
                onChange={(e) => handleRgbChange(channel, e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* HSL */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">HSL</label>
          <CopyButton text={hslStr} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">H (0-360)</label>
            <input
              type="number"
              min={0}
              max={360}
              value={hsl.h}
              onChange={(e) => handleHslChange('h', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">S (0-100%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={hsl.s}
              onChange={(e) => handleHslChange('s', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">L (0-100%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={hsl.l}
              onChange={(e) => handleHslChange('l', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* CSS output summary */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm space-y-1">
        <div>
          <span className="text-gray-400">/* HEX */</span> color: {hexStr};
        </div>
        <div>
          <span className="text-gray-400">/* RGB */</span> color: {rgbStr};
        </div>
        <div>
          <span className="text-gray-400">/* HSL */</span> color: {hslStr};
        </div>
      </div>
    </div>
  );
}
