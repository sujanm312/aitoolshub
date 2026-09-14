import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Cake,
  Sparkles,
  Hourglass,
  CheckCircle,
} from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1998-08-15');
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const ageData = useMemo(() => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total difference metrics
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Upcoming Birthday Countdown
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilNextBday = Math.ceil(
      (nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Day of the week born
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfBirth = dayNames[birth.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      daysUntilNextBday,
      dayOfBirth,
    };
  }, [birthDate, targetDate]);

  return (
    <div className="space-y-8">
      {/* Top Banner Metric */}
      {ageData && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-emerald-500/10 border border-orange-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#FF671F] uppercase tracking-wider mb-1">
                Chronological Age
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                {ageData.years} Years, {ageData.months} Months, {ageData.days} Days
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Born on a <strong className="text-slate-800 font-semibold">{ageData.dayOfBirth}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-center shrink-0">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
                <Cake className="w-4 h-4 text-[#FF671F]" />
                <span>Next Birthday</span>
              </div>
              <div className="text-2xl font-black text-[#06038D] mt-0.5">
                {ageData.daysUntilNextBday} Days
              </div>
              <div className="text-[11px] text-slate-400">Countdown</div>
            </div>
          </div>
        </div>
      )}

      {/* Date Pickers */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Select Birth Date & As-Of Date
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Date of Birth (DOB)
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#FF671F]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Calculate Age As Of
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#06038D]"
            />
          </div>
        </div>
      </div>

      {/* Breakdown Metrics Grid */}
      {ageData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Weeks</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {ageData.totalWeeks.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Days Lived</div>
            <div className="text-2xl font-black text-[#FF671F] mt-1">
              {ageData.totalDays.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Hours</div>
            <div className="text-2xl font-black text-[#06038D] mt-1">
              {ageData.totalHours.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Minutes</div>
            <div className="text-2xl font-black text-[#046A38] mt-1">
              {ageData.totalMinutes.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
