import React, { useState, useEffect } from 'react';
import {
  Lock,
  Key,
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Sliders,
} from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(18);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUpper) charset += avoidAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += avoidAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += avoidAmbiguous ? '23456789' : '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, avoidAmbiguous]);

  // Entropy calculation: L * log2(poolSize)
  const calculateEntropy = () => {
    let pool = 0;
    if (includeUpper) pool += 26;
    if (includeLower) pool += 26;
    if (includeNumbers) pool += 10;
    if (includeSymbols) pool += 32;
    if (pool === 0) return 0;
    return Math.round(length * Math.log2(pool));
  };

  const entropy = calculateEntropy();

  const getStrengthLabel = () => {
    if (entropy < 40) return { label: 'Weak', color: 'text-red-500', bg: 'bg-red-500' };
    if (entropy < 65) return { label: 'Moderate', color: 'text-amber-500', bg: 'bg-amber-500' };
    if (entropy < 90) return { label: 'Strong', color: 'text-emerald-500', bg: 'bg-emerald-500' };
    return { label: 'Uncrackable (Military Grade)', color: 'text-[#06038D]', bg: 'bg-[#06038D]' };
  };

  const strength = getStrengthLabel();

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Password Display Box */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#FF671F]" />
            <span>Cryptographically Secure Password</span>
          </span>
          <span className={`text-xs font-bold ${strength.color}`}>
            {strength.label} ({entropy} bits entropy)
          </span>
        </div>

        {/* Password field & copy */}
        <div className="flex items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="font-mono text-base sm:text-lg text-emerald-400 font-bold tracking-wider break-all select-all">
            {password || 'Select character rules'}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generatePassword}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyPassword}
              className="px-4 py-2 rounded-lg bg-[#046A38] hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md btn-3d-green transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${strength.bg} transition-all duration-300`}
            style={{ width: `${Math.min(100, (entropy / 110) * 100)}%` }}
          />
        </div>
      </div>

      {/* Settings Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Customize Rules & Complexity
        </h3>

        {/* Length Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-700">Password Length</label>
            <span className="text-base font-extrabold text-[#06038D]">{length} Characters</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#06038D]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>8 chars</span>
            <span>32 chars</span>
            <span>64 chars</span>
          </div>
        </div>

        {/* Checkbox Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="rounded text-[#FF671F] focus:ring-[#FF671F]"
            />
            <span>Include Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="rounded text-[#FF671F] focus:ring-[#FF671F]"
            />
            <span>Include Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded text-[#FF671F] focus:ring-[#FF671F]"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded text-[#FF671F] focus:ring-[#FF671F]"
            />
            <span>Include Symbols (!@#$%^&*)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer sm:col-span-2">
            <input
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={(e) => setAvoidAmbiguous(e.target.checked)}
              className="rounded text-[#FF671F] focus:ring-[#FF671F]"
            />
            <span>Exclude Confusing Characters (e.g. 1, l, I, 0, O)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
