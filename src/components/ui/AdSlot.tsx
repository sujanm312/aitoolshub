import React from 'react';

interface AdSlotProps {
  slotId: string;
  position: 'top-banner' | 'inline-below-calc' | 'sidebar' | 'in-article';
  title?: string;
  enabled?: boolean;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  position,
  title = 'Sponsored Advertisement',
  enabled = true,
}) => {
  if (!enabled) return null;

  const getContainerStyle = () => {
    switch (position) {
      case 'top-banner':
        return 'min-h-[90px] md:min-h-[100px] w-full my-6';
      case 'inline-below-calc':
        return 'min-h-[120px] md:min-h-[140px] w-full my-8';
      case 'sidebar':
        return 'min-h-[250px] md:min-h-[300px] w-full my-4';
      case 'in-article':
        return 'min-h-[180px] md:min-h-[250px] w-full my-8';
      default:
        return 'min-h-[100px] w-full my-6';
    }
  };

  return (
    /* <!-- Google AdSense Responsive Ad Slot --> */
    <div
      id={`adsense-slot-${slotId}`}
      className={`relative rounded-xl border border-dashed border-slate-300 bg-gradient-to-b from-slate-50/80 to-slate-100/60 p-4 transition-all duration-200 overflow-hidden flex flex-col items-center justify-center text-center ${getContainerStyle()}`}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    >
      {/* AdSense Technical Compliance Header */}
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
          Advertisement
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="AdSense Ready Container" />
      </div>
      <div className="absolute top-2 right-3">
        <span className="text-[10px] text-slate-400 font-mono">
          Slot: {slotId}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-3 px-4 max-w-md">
        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs mb-1.5">
          Ad
        </div>
        <p className="text-xs font-medium text-slate-700">
          {title}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Google AdSense Responsive Unit · Safe, Non-Intrusive Placement
        </p>
      </div>

      {/* Subtle Corner accent for clean wireframe */}
      <div className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-mono">
        aitoolshub AdSense Safe
      </div>
    </div>
  );
};
