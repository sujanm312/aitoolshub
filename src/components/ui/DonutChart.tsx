import React, { useState } from 'react';
import { ChartDataPoint } from '../../types';

interface DonutChartProps {
  data: ChartDataPoint[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  centerLabel = 'Breakdown',
  centerValue,
  size = 240,
  strokeWidth = 32,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
      {/* SVG Donut */}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 drop-shadow-sm"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />

          {total > 0 &&
            data.map((item, index) => {
              const itemPercent = item.value / total;
              const strokeDasharray = `${itemPercent * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedAngle * circumference;
              accumulatedAngle += itemPercent;

              const isHovered = hoveredIndex === index;

              return (
                <circle
                  key={item.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            {hoveredIndex !== null ? data[hoveredIndex].label : centerLabel}
          </span>
          <span className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {hoveredIndex !== null
              ? data[hoveredIndex].formattedValue || `${((data[hoveredIndex].value / (total || 1)) * 100).toFixed(1)}%`
              : centerValue || (total > 0 ? '100%' : '₹0')}
          </span>
          {hoveredIndex !== null && total > 0 && (
            <span className="text-xs font-semibold text-emerald-600">
              {((data[hoveredIndex].value / total) * 100).toFixed(1)}% of total
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 min-w-[170px] w-full sm:w-auto">
        {data.map((item, idx) => {
          const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isHovered
                  ? 'border-slate-300 bg-white shadow-md scale-102'
                  : 'border-slate-200/80 bg-slate-50/70 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-md shadow-xs flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                </div>
                <span className="text-xs font-bold text-slate-900 font-mono">{pct}%</span>
              </div>
              <div className="mt-1 pl-5 text-xs font-bold text-slate-900">
                {item.formattedValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
