import React, { useState } from 'react';
import { formatINRCompact } from '../../utils/formatters';

interface YearlyPoint {
  year: number;
  invested: number;
  returns: number;
  total: number;
}

interface GrowthBarChartProps {
  data: YearlyPoint[];
  investedLabel?: string;
  returnsLabel?: string;
}

export const GrowthBarChart: React.FC<GrowthBarChartProps> = ({
  data,
  investedLabel = 'Invested Principal',
  returnsLabel = 'Estimated Returns',
}) => {
  const [activeYear, setActiveYear] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  // Pick sample points if data is dense (e.g. up to 15 bars for clean mobile layout)
  const displayData = data.length > 15 
    ? data.filter((_, idx) => idx === 0 || (idx + 1) % Math.ceil(data.length / 12) === 0 || idx === data.length - 1)
    : data;

  const maxVal = Math.max(...displayData.map((d) => d.total), 1);

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-6 border border-slate-200/90 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Yearly Wealth Trajectory</h4>
          <p className="text-xs text-slate-500">Cumulative progression of capital vs interest multiplier</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#06038D]" />
            <span className="text-slate-700">{investedLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-[#046A38]" />
            <span className="text-slate-700">{returnsLabel}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-44 md:h-56 flex items-end gap-1.5 md:gap-3 pt-6 pb-2 px-1 border-b border-slate-200">
        {displayData.map((item) => {
          const investedHeight = (item.invested / maxVal) * 100;
          const returnsHeight = (item.returns / maxVal) * 100;
          const isHovered = activeYear === item.year;

          return (
            <div
              key={item.year}
              className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
              onMouseEnter={() => setActiveYear(item.year)}
              onMouseLeave={() => setActiveYear(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-14 z-20 bg-slate-900 text-white text-[11px] py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-orange-400">Year {item.year}</div>
                  <div>Total: {formatINRCompact(item.total)}</div>
                  <div className="text-emerald-400">Profit: {formatINRCompact(item.returns)}</div>
                </div>
              )}

              {/* Stacked Bars */}
              <div className="w-full max-w-[28px] flex flex-col justify-end h-full rounded-t-md overflow-hidden transition-all duration-200 group-hover:scale-y-105">
                {/* Returns (Green) on top */}
                <div
                  style={{ height: `${returnsHeight}%` }}
                  className="w-full bg-[#046A38] opacity-90 transition-all group-hover:opacity-100"
                />
                {/* Invested (Ashoka Navy) at base */}
                <div
                  style={{ height: `${investedHeight}%` }}
                  className="w-full bg-[#06038D] opacity-90 transition-all group-hover:opacity-100"
                />
              </div>

              <span className="text-[10px] md:text-xs font-semibold text-slate-500 mt-2">
                Y{item.year}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
        <span>Starting Year (Y1)</span>
        <span>Maturity (Y{data[data.length - 1].year})</span>
      </div>
    </div>
  );
};
