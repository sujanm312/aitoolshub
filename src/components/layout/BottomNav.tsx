import React from 'react';
import { Home, TrendingUp, Landmark, Award, BookOpen } from 'lucide-react';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onNavigate }) => {
  const items = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'SIP', path: '/calculators/sip-calculator', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'EMI', path: '/calculators/emi-calculator', icon: <Landmark className="w-5 h-5" /> },
    { label: 'Gratuity', path: '/calculators/gratuity-calculator', icon: <Award className="w-5 h-5" /> },
    { label: 'Blog', path: '/blog', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 text-slate-400 py-2 px-3 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.label}
            onClick={() => onNavigate(item.path)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition cursor-pointer ${
              isActive ? 'text-[#FF671F] font-bold' : 'hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-[11px] font-medium tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
