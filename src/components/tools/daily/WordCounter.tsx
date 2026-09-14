import React, { useState, useMemo } from 'react';
import {
  FileText,
  Clock,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(
    'The quick brown fox jumps over the lazy dog. Writing clean, impactful copy requires precision and rhythm. Use this word counter to check reading times, character counts, and keyword density before publishing.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        topKeywords: [],
      };
    }

    const wordsArray = raw.split(/\s+/).filter(Boolean);
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;

    const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (raw ? 1 : 0);
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Average reading speed: 225 wpm; Speaking speed: 130 wpm
    const readingTimeMinutes = Math.max(0.1, +(words / 225).toFixed(1));
    const speakingTimeMinutes = Math.max(0.1, +(words / 130).toFixed(1));

    // Keyword density
    const frequencyMap: { [k: string]: number } = {};
    wordsArray.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean.length > 3) {
        frequencyMap[clean] = (frequencyMap[clean] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / words) * 100).toFixed(1),
      }));

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      topKeywords,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(
      text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    );
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Total Words</div>
          <div className="text-3xl font-black text-[#FF671F] mt-1">
            {stats.words.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Characters</div>
          <div className="text-3xl font-black text-[#06038D] mt-1">
            {stats.charsWithSpaces.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {stats.charsNoSpaces} (no spaces)
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Sentences</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {stats.sentences.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {stats.paragraphs} paragraphs
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Reading Time</div>
          <div className="text-3xl font-black text-[#046A38] mt-1">
            {stats.readingTimeMinutes}m
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {stats.speakingTimeMinutes}m speaking
          </div>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Quick Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={toUpperCase}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
            >
              UPPERCASE
            </button>
            <button
              onClick={toLowerCase}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
            >
              lowercase
            </button>
            <button
              onClick={toTitleCase}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
            >
              Title Case
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg bg-orange-50 text-[#FF671F] font-bold text-xs flex items-center gap-1 hover:bg-orange-100 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => setText('')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs hover:bg-red-50 hover:text-red-600 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Text Input Area */}
        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your content here..."
          className="w-full text-sm text-slate-800 leading-relaxed border border-slate-200 rounded-xl p-4 focus:outline-none focus:border-[#FF671F]"
        />

        {/* Keyword Frequency Analysis */}
        {stats.topKeywords.length > 0 && (
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Top Keywords & Frequency Density
            </span>
            <div className="flex flex-wrap gap-2">
              {stats.topKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
                >
                  <span className="font-bold text-slate-900">{kw.word}</span>
                  <span className="text-[10px] text-slate-400">
                    ({kw.count}x · {kw.percent}%)
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
