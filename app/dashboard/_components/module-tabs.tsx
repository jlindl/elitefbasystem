'use client';

import { useState, ReactNode } from 'react';

interface ModuleTab {
  id: string;
  label: string;
  icon: string;
  content: ReactNode;
}

interface ModuleTabsProps {
  tabs: ModuleTab[];
}

export function ModuleTabs({ tabs }: ModuleTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '');

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="flex gap-6">
      {/* Vertical Tab Navigation */}
      <div className="sticky top-4 z-10 h-fit flex flex-col gap-2 w-48 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 text-left border-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-accent to-accent/80 text-white border-accent shadow-md'
                : 'bg-white text-ink-muted hover:text-ink hover:bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="text-xl flex-shrink-0">{tab.icon}</span>
            <span className="text-sm leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTabData && (
        <div className="flex-1 animate-in fade-in duration-300">
          {activeTabData.content}
        </div>
      )}
    </div>
  );
}
