'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminTab } from '../../components/admin/Sidebar';
import { ExternalLink, Clock, ShieldCheck } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      document.cookie = 'aitoolshub_admin_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict';
      window.location.href = '/admin/login';
    } catch {
      window.location.href = '/admin/login';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans">
      {/* Fixed Collapsible Sidebar */}
      <AdminSidebar
        activeTab="metrics"
        onSelectTab={(tab) => {
          if (tab === 'metrics') window.location.href = '/admin/dashboard';
        }}
        onLogout={handleLogout}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-68'
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 h-16 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 pl-12 lg:pl-0">
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF671F]" />
              <span>Admin Management Perimeter</span>
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-[#FF671F] uppercase tracking-wider border border-orange-200">
              aitoolshub.co.in
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Server Timestamp */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentTime || 'IST Live Sync...'}</span>
            </div>

            {/* Quick View Live Site External Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#06038D] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
