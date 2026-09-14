import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Key,
  Hash,
  Share2,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type Platform = 'instagram' | 'linkedin' | 'twitter';
type Tone = 'professional' | 'viral' | 'funny' | 'minimal' | 'executive';

export const BioCaptionGenerator: React.FC = () => {
  const [mode, setMode] = useState<'bio' | 'caption'>('bio');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [tone, setTone] = useState<Tone>('professional');
  const [keywords, setKeywords] = useState<string>('full stack developer, react, cloud architecture, coffee lover');
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generated outputs
  const [generatedResults, setGeneratedResults] = useState<string[]>([
    '💻 Building high-scale web apps & cloud architectures\n🚀 React, Node.js & TypeScript enthusiast\n☕ Fueled by curiosity and dark roast coffee\n👇 Explore my latest open-source projects',
    'Full-Stack Developer transforming complex systems into seamless digital experiences. Specializing in high-performance web applications and serverless architecture. Let’s connect.',
    'I write code that works 99% of the time. The other 1% is spent searching Stack Overflow for missing semicolons. | Full-Stack Dev | Builder',
  ]);

  // Fast client-side rule templates if no API key is provided
  const generateRuleBased = () => {
    const list: string[] = [];
    const kw = keywords.trim() || 'Tech creator & developer';

    if (mode === 'bio') {
      if (platform === 'linkedin') {
        list.push(
          `Helping tech teams scale with modern solutions. Specializing in ${kw}. Passionate about clean code, developer productivity, and building durable software products. Open for strategic advisory & speaking.`,
          `${kw.split(',')[0] || 'Professional'} | Innovating at the intersection of technology and product. Track record of high-impact execution. Let's talk tech and growth.`,
          `Building digital futures. Passionate practitioner in ${kw}. Committed to continuous learning, architectural excellence, and engineering leadership.`
        );
      } else if (platform === 'twitter') {
        list.push(
          `Obsessed with ${kw}. Building in public. Sharing daily learnings on code, growth & systems. 🚀`,
          `Engineering thoughtful products. ${kw}. ☕ Powered by caffeine and curiosity. DM for collaborations.`,
          `Talking about ${kw}, tech leverage, and modern building. Follow along on the journey.`
        );
      } else {
        // Instagram
        list.push(
          `✨ Crafting digital experiences\n📍 Based in India | Global Mindset\n💡 Passionate about ${kw}\n🔗 Tap below to see what I'm creating 👇`,
          `🚀 Turning coffee into code & ideas into reality\n⚡ ${kw}\n📩 Collabs & DMs welcome`,
          `Creating with purpose.\n${kw}.\n🌱 Documenting the daily journey.`
        );
      }
    } else {
      // Captions
      list.push(
        `Here is the biggest lesson I learned this week about ${kw}: The difference between good execution and extraordinary execution isn't complexity—it's consistency.\n\nDrop your thoughts below! 👇 #growth #mindset #tech #creator`,
        `Swipe left to see how we approached ${kw}. When you focus on fundamentals first, the rest falls into place naturally. What's your take? 🚀 #learning #building #insights`,
        `Real talk: ${kw} is never as straightforward as people make it look online. Here is what actually happens behind the scenes... 💡`
      );
    }

    setGeneratedResults(list);
  };

  const handleGenerate = async () => {
    setIsLoading(true);

    if (geminiApiKey.trim()) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiApiKey.trim() });
        const prompt = `Generate 3 distinct, high-performing, high-CTR ${platform} ${mode}s for someone whose focus is: "${keywords}".
Tone: ${tone}.
Make each option ready-to-copy, with appropriate spacing, formatting, and line breaks. Return only the 3 options separated by three dashes (---).`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text || '';
        const splits = text.split('---').map((s) => s.trim()).filter(Boolean);
        if (splits.length > 0) {
          setGeneratedResults(splits);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', err);
      }
    }

    // Fallback heuristic engine
    setTimeout(() => {
      generateRuleBased();
      setIsLoading(false);
    }, 300);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Optional Gemini API key */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white">
              Instant AI Bio & Caption Studio
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Works 100% free with built-in creative heuristic templates. Optional: Connect your free Gemini API key for infinite variations.
          </p>
        </div>

        <button
          onClick={() => setShowApiKeyInput(!showApiKeyInput)}
          className="self-start sm:self-auto text-xs font-semibold text-amber-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
        >
          <Key className="w-3.5 h-3.5" />
          <span>{showApiKeyInput ? 'Hide API Key' : 'Add Free Gemini Key (Optional)'}</span>
        </button>
      </div>

      {showApiKeyInput && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
          <label className="font-bold text-amber-900 block">
            Custom Google Gemini API Key (Client-Side Only)
          </label>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-amber-300 bg-white focus:outline-none focus:border-amber-500"
          />
          <p className="text-[11px] text-amber-800">
            Keys are never stored on our servers and stay purely in your active browser session.
          </p>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            {/* Mode: Bio vs Caption */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                What are you generating?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('bio')}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    mode === 'bio'
                      ? 'bg-[#FF671F] text-white border-[#FF671F]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Profile Bio
                </button>
                <button
                  onClick={() => setMode('caption')}
                  className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    mode === 'caption'
                      ? 'bg-[#06038D] text-white border-[#06038D]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Post Caption
                </button>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Target Social Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['instagram', 'linkedin', 'twitter'] as Platform[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize border transition cursor-pointer ${
                      platform === p
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p === 'twitter' ? 'X (Twitter)' : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Tone of Voice
              </label>
              <div className="flex flex-wrap gap-2">
                {(['professional', 'viral', 'funny', 'minimal', 'executive'] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize border transition cursor-pointer ${
                      tone === t
                        ? 'bg-orange-100 text-[#FF671F] border-orange-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic / Keywords Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Describe your role, niche, or post topic
              </label>
              <textarea
                rows={3}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. founder, SaaS marketing, AI productivity tools, remote lifestyle"
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-[#FF671F]"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#046A38] hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md btn-3d-green transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Crafting Hooks...' : 'Generate 3 Fresh Variations'}</span>
            </button>
          </div>
        </div>

        {/* Right Output Variations */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Ready-to-Use Copy Options
          </h3>

          <div className="space-y-3">
            {generatedResults.map((result, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-slate-300 transition"
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Option {idx + 1}
                  </span>
                  <button
                    onClick={() => copyToClipboard(result, idx)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-xs font-bold cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
