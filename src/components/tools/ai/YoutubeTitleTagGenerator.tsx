import React, { useState } from 'react';
import {
  Youtube,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Tag,
  Hash,
  RefreshCw,
  Search,
} from 'lucide-react';

export const YoutubeTitleTagGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>('how to start a step up sip in india 2026');
  const [videoNiche, setVideoNiche] = useState<string>('finance');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Generated Title suggestions
  const [titles, setTitles] = useState<string[]>([
    'How to Start a Step-Up SIP in 2026 (Double Your Wealth with 10% Formula!)',
    'Step-Up SIP Explained for Beginners: Why Normal SIP Is Costing You Crores',
    'The 10% Step-Up SIP Strategy That Financial Advisors Don’t Want You to Know',
    'I Tested Step-Up SIP vs Normal SIP for 15 Years... Here Are the Real Results',
    'Best Step Up SIP Mutual Funds 2026: Complete Step-by-Step Tutorial',
  ]);

  // Description Hooks
  const [descriptionHook, setDescriptionHook] = useState<string>(
    `In this video, we break down the exact mathematics of how a Step-Up Systematic Investment Plan (SIP) outperforms a regular mutual fund SIP by over 85% over 15 to 20 years.\n\n📌 Timestamps:\n00:00 - Why Normal SIP is not enough\n02:15 - What is Step-Up SIP?\n05:40 - The 10% annual increment formula\n09:20 - Real math calculations & tax benefits\n12:50 - Action steps to start today\n\n👉 Calculate your step-up returns for free on aitoolshub.co.in`
  );

  // Tags
  const [tags, setTags] = useState<string[]>([
    'step up sip calculator',
    'mutual funds india 2026',
    'sip investment strategy',
    'how to invest in sip',
    'step up sip vs normal sip',
    'best mutual funds for 2026',
    'rupee cost averaging',
    'compounding interest tips',
    'financial freedom india',
  ]);

  // Hashtags
  const [hashtags, setHashtags] = useState<string[]>([
    '#StepUpSIP',
    '#MutualFundsIndia',
    '#SIPInvesting',
    '#PersonalFinanceIndia',
    '#WealthBuilding',
    '#aitoolshub',
  ]);

  const handleGenerate = () => {
    const cleanTopic = topic.trim() || 'Investment Tips';
    const words = cleanTopic.split(' ');
    const firstTwo = words.slice(0, 3).join(' ');

    setTitles([
      `${cleanTopic.toUpperCase()} (The Ultimate 2026 Step-by-Step Guide)`,
      `Don't Do ${cleanTopic} Before Watching This! (Costly Mistakes)`,
      `How to Master ${firstTwo} in 10 Minutes (Proven Beginner Framework)`,
      `The Secret to ${cleanTopic} That 99% of People Get Wrong`,
      `Stop Wasting Time on ${cleanTopic}: Do This Instead (2026 Strategy)`,
    ]);

    setDescriptionHook(
      `Everything you need to know about ${cleanTopic} in 2026.\n\nWe analyze the top strategies, avoid common pitfalls, and show you actionable takeaways you can apply right away.\n\n🔔 Subscribe for daily tech and finance tools!\n🌐 Free calculators & guides: https://aitoolshub.co.in`
    );

    setTags([
      cleanTopic.toLowerCase(),
      `${cleanTopic.toLowerCase()} guide`,
      `${cleanTopic.toLowerCase()} 2026`,
      'how to',
      'tutorial',
      'beginner guide',
      'best strategy',
      'tips and tricks',
      'aitoolshub',
    ]);

    setHashtags([
      `#${words[0] || 'Tutorial'}`,
      `#${words[1] || 'Guide'}`,
      '#YouTubeSEO',
      '#Trending',
      '#aitoolshub',
    ]);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-between gap-3 text-xs text-red-200">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500 shrink-0" />
          <span>
            <strong className="text-white">YouTube SEO Growth Suite:</strong> High-CTR Titles, Click-Worthy Description Hooks, and Viral Search Tags optimized for YouTube algorithm ranking.
          </span>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Enter Your Video Topic or Seed Keyword
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. how to start a step up sip, python full stack tutorial, iphone 16 review"
              className="w-full text-xs font-bold border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="sm:col-span-4 flex items-end">
            <button
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate SEO Package</span>
            </button>
          </div>
        </div>
      </div>

      {/* Output Sections */}
      <div className="space-y-6">
        {/* Titles Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span>High-CTR Clickable Titles (Algorithmic Formulas)</span>
            </h3>
            <span className="text-[11px] text-slate-400">Click any title to copy</span>
          </div>

          <div className="space-y-2">
            {titles.map((t, idx) => (
              <div
                key={idx}
                onClick={() => copyText(t, `title-${idx}`)}
                className="p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/20 text-xs font-bold text-slate-800 flex items-center justify-between gap-3 cursor-pointer transition"
              >
                <span>{t}</span>
                <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                  {copiedSection === `title-${idx}` ? (
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Tags Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description Hook */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Video Description Template
              </h3>
              <button
                onClick={() => copyText(descriptionHook, 'desc')}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'desc' ? 'Copied!' : 'Copy Description'}
              </button>
            </div>
            <textarea
              rows={8}
              readOnly
              value={descriptionHook}
              className="w-full text-xs text-slate-700 font-mono bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none"
            />
          </div>

          {/* Tags & Hashtags */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-red-500" />
                  <span>Comma-Separated Video Tags</span>
                </h3>
                <button
                  onClick={() => copyText(tags.join(', '), 'tags')}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'tags' ? 'Copied!' : 'Copy All Tags'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-red-500" />
                  <span>Hashtags</span>
                </h3>
                <button
                  onClick={() => copyText(hashtags.join(' '), 'hashtags')}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'hashtags' ? 'Copied!' : 'Copy Hashtags'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-red-600">
                {hashtags.map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
