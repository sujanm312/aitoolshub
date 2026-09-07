'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calculator,
  FileText,
  DollarSign,
  ShieldCheck,
  Code2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export type AdminTab = 'metrics' | 'calculators' | 'editor' | 'seo' | 'ads' | 'security';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  adminEmail?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  adminEmail = 'designer.sujanmondal@gmail.com',
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const toggleCollapse = onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: string }[] = [
    {
      id: 'metrics',
      label: 'Dashboard / Overview',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      id: 'calculators',
      label: 'Calculators & Tools',
      icon: Calculator,
      badge: '6 Active',
    },
    {
      id: 'editor',
      label: 'Editorial & Guides',
      icon: FileText,
    },
    {
      id: 'seo',
      label: 'SEO & Code Injection',
      icon: Code2,
      badge: 'Head/Body',
    },
    {
      id: 'ads',
      label: 'AdSense Units',
      icon: DollarSign,
    },
    {
      id: 'security',
      label: 'Security & Profile',
      icon: ShieldCheck,
      badge: 'Protected',
    },
  ];

  return (
    <>
      {/* Mobile Drawer Trigger Button (Visible only on small screens) */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2.5 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-xl cursor-pointer hover:bg-slate-800 transition active:scale-95"
          aria-label="Toggle Navigation Menu"
        >
          {mobileDrawerOpen ? <X className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col justify-between bg-[#0F172A] border-r border-slate-800 text-slate-300 transition-all duration-300 shadow-2xl ${
          isCollapsed ? 'w-20' : 'w-68'
        } ${
          mobileDrawerOpen
            ? 'translate-x-0 w-72'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header: Brand & Collapse Toggle */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
            <a href="/" className="flex items-center gap-3 group overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF671F] via-orange-500 to-[#046A38] p-0.5 flex-shrink-0 shadow-md">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-black text-xs text-white">
                  AH
                </div>
              </div>
              {!isCollapsed && (
                <div className="transition-opacity duration-200">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-base tracking-tight text-white group-hover:text-orange-300 transition">
                      aitoolshub
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F]" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-bold block">
                    Admin Perimeter
                  </span>
                </div>
              )}
            </a>

            {/* Desktop Collapse / Expand Button */}
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white items-center justify-center transition cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse to Rail'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1.5 mt-2">
            {!isCollapsed && (
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Management Modules
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative cursor-pointer group ${
                    isActive
                      ? 'bg-slate-800/90 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Saffron Tricolor Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#FF671F] rounded-r-full shadow-[0_0_12px_#FF671F]" />
                  )}

                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-[#FF671F]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />

                  {!isCollapsed && (
                    <div className="flex-1 flex items-center justify-between truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isActive
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Admin Identity & 3D Logout Button */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/30">
          {!isCollapsed && (
            <div className="mb-3 px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center text-xs font-black text-orange-400">
                  SM
                </div>
                {/* Pulsing Active Green Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <div className="truncate flex-1">
                <div className="text-xs font-bold text-white truncate">{adminEmail}</div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                  <span>●</span> Authorized Superadmin
                </div>
              </div>
            </div>
          )}

          {/* One-Click 3D-styled Logout Button */}
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 active:translate-y-0.5 shadow-[0_3px_0_#991b1b] transition-all cursor-pointer ${
              isCollapsed ? 'px-0' : ''
            }`}
            title="Logout Session"
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>End Session</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
export default AdminSidebar;
