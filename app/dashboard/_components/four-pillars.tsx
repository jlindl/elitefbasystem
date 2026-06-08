'use client';

import { useState, useEffect } from 'react';

const pillars = [
  {
    id: 1,
    number: '1',
    title: 'Sourcing Data vs. Software Laziness',
    icon: '📊',
    color: 'from-blue-500 to-blue-400',
    description: 'Finding real-world supply gaps, not copying software reports',
    details: [
      { type: 'bad', label: 'The Shortcut', text: 'Open software → Pull high-volume report → Copy 400 others' },
      { type: 'good', label: 'The Method', text: 'Physical shelf research + live analytics = unique opportunities' },
    ],
  },
  {
    id: 2,
    number: '2',
    title: 'Listing Optimization',
    icon: '📝',
    color: 'from-orange-500 to-orange-400',
    description: 'Coming next...',
    details: [],
  },
  {
    id: 3,
    number: '3',
    title: 'Inventory Management',
    icon: '📦',
    color: 'from-green-500 to-green-400',
    description: 'Coming next...',
    details: [],
  },
  {
    id: 4,
    number: '4',
    title: 'Performance Metrics',
    icon: '📈',
    color: 'from-purple-500 to-purple-400',
    description: 'Coming next...',
    details: [],
  },
];

export function FourPillars() {
  const [expandedId, setExpandedId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setExpandedId((prev) => {
        const validPillars = pillars.filter((p) => p.details.length > 0);
        const currentIndex = validPillars.findIndex((p) => p.id === prev);
        const nextIndex = (currentIndex + 1) % validPillars.length;
        return validPillars[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const expandedPillar = pillars.find((p) => p.id === expandedId);

  return (
    <div className="my-8 space-y-6">
      {/* Instruction */}
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
        <span className="text-lg">🏛️</span>
        <span>Click to explore each pillar</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-blue-500 via-orange-500 via-green-500 to-purple-500 transition-all duration-1000 ${
            isAutoPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${((expandedId - 1) / pillars.length) * 100 + (1 / pillars.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Four Pillars Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => {
              setIsAutoPlaying(false);
              setExpandedId(pillar.id);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            disabled={pillar.details.length === 0}
            className={`p-4 rounded-lg transition-all duration-200 border-2 text-center group relative ${
              expandedId === pillar.id
                ? `bg-gradient-to-br ${pillar.color} text-white border-opacity-0 shadow-lg scale-105`
                : pillar.details.length === 0
                  ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-200 hover:border-gray-300 cursor-pointer'
            }`}
            title={pillar.details.length === 0 ? 'Coming soon' : `View ${pillar.title}`}
          >
            <span className="text-3xl block mb-2">{pillar.icon}</span>
            <span className="text-xs font-bold">{pillar.number}</span>
            <p className="text-xs font-semibold mt-1 leading-tight">{pillar.title}</p>
            {expandedId === pillar.id && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 rounded-t-lg"></div>
            )}
          </button>
        ))}
      </div>

      {/* Expanded Content */}
      {expandedPillar && expandedPillar.details.length > 0 && (
        <div className={`p-6 rounded-xl bg-gradient-to-br ${expandedPillar.color} bg-opacity-5 border-2 border-opacity-20 space-y-4 animate-in fade-in duration-300`}>
          <div className="flex items-start gap-3 mb-4">
            <span className="text-4xl">{expandedPillar.icon}</span>
            <div className="text-left">
              <h3 className="font-bold text-ink text-lg">
                Pillar {expandedPillar.number}: {expandedPillar.title}
              </h3>
              <p className="text-sm text-ink-muted mt-1">{expandedPillar.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            {expandedPillar.details.map((detail, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  detail.type === 'bad'
                    ? 'bg-red-50 border-red-400 text-red-900'
                    : 'bg-green-50 border-green-400 text-green-900'
                }`}
              >
                <p className="font-semibold text-sm mb-1">
                  {detail.type === 'bad' ? '❌' : '✅'} {detail.label}
                </p>
                <p className="text-sm leading-relaxed">{detail.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon Notice */}
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
        <p className="text-sm text-yellow-800 font-medium">
          Pillars 2, 3, and 4 will be detailed in upcoming modules
        </p>
      </div>
    </div>
  );
}
