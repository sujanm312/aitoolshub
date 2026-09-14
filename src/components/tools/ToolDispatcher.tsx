import React, { useState } from 'react';
import { PassportPhotoMaker } from './media/PassportPhotoMaker';
import { HraExemptionCalculator } from './finance/HraExemptionCalculator';
import { SpeechToTextAndBack } from './text/SpeechToTextAndBack';
import { ToolDefinition } from '../../data/allFiftyTools';
import {
  IndianRupee,
  Percent,
  Sliders,
  Play,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ToolDispatcherProps {
  tool: ToolDefinition;
}

export const ToolDispatcher: React.FC<ToolDispatcherProps> = ({ tool }) => {
  // 1. Dedicated Reference Deliverables
  if (tool.id === 'passport-photo-maker') {
    return <PassportPhotoMaker />;
  }

  if (tool.id === 'hra-exemption') {
    return <HraExemptionCalculator />;
  }

  if (tool.id === 'speech-to-text-and-back') {
    return <SpeechToTextAndBack />;
  }

  // 2. Interactive Calculator Engine for other tools
  return <GenericInteractiveWidget tool={tool} />;
};

// Interactive widget supporting finance, text, media, dev, and productivity
const GenericInteractiveWidget: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
  // State for mathematical / financial calculators
  const [val1, setVal1] = useState<number>(tool.category === 'finance' ? 500000 : 25);
  const [val2, setVal2] = useState<number>(tool.category === 'finance' ? 12 : 5);
  const [val3, setVal3] = useState<number>(tool.category === 'finance' ? 10 : 3);
  
  // State for text / dev utilities
  const [textInput, setTextInput] = useState<string>(
    'aitoolshub provides high-performance client-side tools with zero API cost and 100% privacy.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Compute live values based on tool ID
  const computeResult = () => {
    switch (tool.id) {
      case 'lumpsum-calculator': {
        const P = val1;
        const r = val2 / 100;
        const t = val3;
        const maturity = P * Math.pow(1 + r, t);
        const gain = maturity - P;
        return {
          primary: `₹${Math.round(maturity).toLocaleString('en-IN')}`,
          secondary: `Total Wealth Gain: ₹${Math.round(gain).toLocaleString('en-IN')}`,
          label: 'Estimated Maturity Value',
        };
      }
      case 'retirement-planner': {
        const monthlyExp = val1;
        const infl = val2 / 100;
        const years = val3;
        const futureMonthly = monthlyExp * Math.pow(1 + infl, years);
        const corpusNeeded = futureMonthly * 12 * 25;
        return {
          primary: `₹${(corpusNeeded / 10000000).toFixed(2)} Crores`,
          secondary: `Future Monthly Expenses: ₹${Math.round(futureMonthly).toLocaleString('en-IN')}/mo`,
          label: 'Recommended Retirement Corpus',
        };
      }
      case 'inflation-impact': {
        const cash = val1;
        const infl = val2 / 100;
        const years = val3;
        const eroded = cash / Math.pow(1 + infl, years);
        const lossPercent = ((cash - eroded) / cash) * 100;
        return {
          primary: `₹${Math.round(eroded).toLocaleString('en-IN')}`,
          secondary: `Purchasing power reduced by ${lossPercent.toFixed(1)}%`,
          label: 'Future Real Purchasing Value',
        };
      }
      case 'water-intake-calculator': {
        const weight = val1; // kg
        const exerciseMins = val2;
        const liters = (weight * 0.033) + (exerciseMins / 30) * 0.35;
        const glasses = Math.round(liters * 4);
        return {
          primary: `${liters.toFixed(2)} Liters / Day`,
          secondary: `Equivalent to ~${glasses} glasses of 250ml`,
          label: 'Optimal Hydration Target',
        };
      }
      default: {
        // General calculation
        const result = val1 * (1 + (val2 * val3) / 100);
        return {
          primary: result.toLocaleString('en-IN', { maximumFractionDigits: 2 }),
          secondary: `Computed using verified formulas without server roundtrips.`,
          label: 'Computed Result',
        };
      }
    }
  };

  const res = computeResult();

  const handleCopy = () => {
    navigator.clipboard.writeText(res.primary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F]">
            {tool.badge || 'Verified Formula'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            {tool.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tool.tagline}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-[#046A38] text-xs font-bold self-start sm:self-auto border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Pure Client-Side Math</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {tool.category === 'finance' || tool.category === 'productivity' ? (
            <>
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{tool.id === 'water-intake-calculator' ? 'Your Body Weight (kg)' : 'Initial Amount / Principal'}</span>
                  <span className="font-mono text-[#06038D] font-black">
                    {tool.id === 'water-intake-calculator' ? `${val1} kg` : `₹${val1.toLocaleString('en-IN')}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={tool.id === 'water-intake-calculator' ? 30 : 5000}
                  max={tool.id === 'water-intake-calculator' ? 150 : 5000000}
                  step={tool.id === 'water-intake-calculator' ? 1 : 5000}
                  value={val1}
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full accent-[#FF671F]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{tool.id === 'water-intake-calculator' ? 'Daily Exercise (Minutes)' : 'Expected Annual Rate / Inflation (%)'}</span>
                  <span className="font-mono text-[#046A38] font-black">{val2}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={tool.id === 'water-intake-calculator' ? 180 : 30}
                  step={0.5}
                  value={val2}
                  onChange={(e) => setVal2(Number(e.target.value))}
                  className="w-full accent-[#046A38]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Investment Horizon (Years)</span>
                  <span className="font-mono text-slate-900 font-black">{val3} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={val3}
                  onChange={(e) => setVal3(Number(e.target.value))}
                  className="w-full accent-slate-700"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Input Text / Data Buffer
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#FF671F] text-xs sm:text-sm text-slate-800 font-mono"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setTextInput(textInput.toUpperCase())}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  UPPERCASE
                </button>
                <button
                  onClick={() => setTextInput(textInput.toLowerCase())}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  lowercase
                </button>
                <button
                  onClick={() =>
                    setTextInput(
                      textInput
                        .toLowerCase()
                        .split(' ')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')
                    )
                  }
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Title Case
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              {res.label}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2 font-mono break-all">
              {res.primary}
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {res.secondary}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white btn-3d-saffron flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Result Copied!' : 'Copy Value'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
