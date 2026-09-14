import React, { useState, useMemo } from 'react';
import {
  Car,
  Fuel,
  Users,
  Route,
  DollarSign,
  ArrowRightLeft,
  Navigation,
} from 'lucide-react';

export const FuelTripCalculator: React.FC = () => {
  const [distanceKm, setDistanceKm] = useState<number>(380); // e.g. Mumbai to Pune return
  const [mileageKmpl, setMileageKmpl] = useState<number>(16.5); // 16.5 km/L
  const [fuelPricePerLitre, setFuelPricePerLitre] = useState<number>(104.2); // ₹104.20 / Litre
  const [passengerCount, setPassengerCount] = useState<number>(4);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  const tripStats = useMemo(() => {
    const effectiveDistance = isRoundTrip ? distanceKm * 2 : distanceKm;
    const litresNeeded = effectiveDistance / (mileageKmpl || 1);
    const totalFuelCost = litresNeeded * fuelPricePerLitre;
    const costPerKm = totalFuelCost / (effectiveDistance || 1);
    const costPerPassenger = totalFuelCost / Math.max(1, passengerCount);

    return {
      effectiveDistance,
      litresNeeded: +litresNeeded.toFixed(1),
      totalFuelCost: Math.round(totalFuelCost),
      costPerKm: +costPerKm.toFixed(2),
      costPerPassenger: Math.round(costPerPassenger),
    };
  }, [distanceKm, mileageKmpl, fuelPricePerLitre, passengerCount, isRoundTrip]);

  const formatINR = (val: number) =>
    '₹' + Math.round(val).toLocaleString('en-IN');

  return (
    <div className="space-y-8">
      {/* Top Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Fuel Expense
          </div>
          <div className="text-3xl font-black text-[#FF671F] mt-1">
            {formatINR(tripStats.totalFuelCost)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {tripStats.litresNeeded} Litres required
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Cost Per Passenger
          </div>
          <div className="text-3xl font-black text-[#06038D] mt-1">
            {formatINR(tripStats.costPerPassenger)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Split equally across {passengerCount} people
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Running Cost per KM
          </div>
          <div className="text-3xl font-black text-[#046A38] mt-1">
            ₹{tripStats.costPerKm}
            <span className="text-xs text-slate-400 font-normal"> / km</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Total distance: {tripStats.effectiveDistance} km
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Trip & Vehicle Parameters</h3>
          <button
            onClick={() => setIsRoundTrip(!isRoundTrip)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${
              isRoundTrip
                ? 'bg-orange-50 text-[#FF671F] border-orange-300'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{isRoundTrip ? 'Round Trip (2x Distance)' : 'One Way'}</span>
          </button>
        </div>

        {/* Distance */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-700">One-Way Trip Distance (KM)</label>
            <span className="text-sm font-bold text-slate-900">{distanceKm} KM</span>
          </div>
          <input
            type="range"
            min={10}
            max={2000}
            step={10}
            value={distanceKm}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Mileage / Fuel Efficiency (km/L)
            </label>
            <input
              type="number"
              step={0.5}
              value={mileageKmpl}
              onChange={(e) => setMileageKmpl(Number(e.target.value) || 1)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#FF671F]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Fuel Price (₹ / Litre)
            </label>
            <input
              type="number"
              step={0.5}
              value={fuelPricePerLitre}
              onChange={(e) => setFuelPricePerLitre(Number(e.target.value) || 0)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#06038D]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Number of People Splitting
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={passengerCount}
              onChange={(e) => setPassengerCount(Number(e.target.value) || 1)}
              className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#046A38]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
