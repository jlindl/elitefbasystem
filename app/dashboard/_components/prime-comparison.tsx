'use client';

import { useState, useEffect } from 'react';

const comparisons = [
  {
    category: 'Trust Level',
    prime: 'Instant Amazon-backed trust',
    nonPrime: 'Unknown seller, buyer hesitation',
    primeIcon: '✅',
    nonPrimeIcon: '❌',
  },
  {
    category: 'Customer Filter Visibility',
    prime: 'Visible to 80%+ of active buyers',
    nonPrime: 'Hidden from "Prime Only" filters',
    primeIcon: '👁️',
    nonPrimeIcon: '🙈',
  },
  {
    category: 'Delivery Speed',
    prime: 'Next-day delivery',
    nonPrime: '5-14 day delivery',
    primeIcon: '⚡',
    nonPrimeIcon: '🐢',
  },
  {
    category: 'Price Flexibility',
    prime: 'Can charge premium prices',
    nonPrime: 'Must compete on price',
    primeIcon: '💰',
    nonPrimeIcon: '📉',
  },
  {
    category: 'Customer Support',
    prime: 'Amazon handles returns & issues',
    nonPrime: 'You handle everything',
    primeIcon: '🛡️',
    nonPrimeIcon: '😰',
  },
];

export function PrimeComparison() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setExpandedIndex((prev) => {
        const nextIndex = prev === null ? 0 : (prev + 1) % comparisons.length;
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="my-8 space-y-4">
      {/* Instruction */}
      <div className="flex items-center gap-2 text-sm text-accent font-medium mb-3">
        <span className="text-lg">💡</span>
        <span>Click to compare benefits</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-accent/20 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-900 ${
            isAutoPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${((expandedIndex ?? 0) / comparisons.length) * 100 + (1 / comparisons.length) * 100}%`,
          }}
        ></div>
      </div>

      <div className="grid gap-3">
        {comparisons.map((comparison, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setExpandedIndex(expandedIndex === index ? null : index);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className={`text-left transition-all duration-200 rounded-xl border-2 overflow-hidden group relative hover:shadow-md ${
              expandedIndex === index
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-black/10 bg-surface hover:border-black/20 hover:bg-surface/80'
            } ${index === 0 && expandedIndex !== 0 ? 'animate-pulse' : ''}`}
            title="Click to expand and compare"
          >
            {expandedIndex === index && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-transparent animate-pulse"></div>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-ink mb-3">{comparison.category}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prime Column */}
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{comparison.primeIcon}</span>
                    <div>
                      <p className="font-medium text-green-900 text-sm">Prime (FBA)</p>
                      <p className="text-sm text-green-800 mt-1">{comparison.prime}</p>
                    </div>
                  </div>
                </div>

                {/* Non-Prime Column */}
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{comparison.nonPrimeIcon}</span>
                    <div>
                      <p className="font-medium text-red-900 text-sm">Non-Prime (FBM)</p>
                      <p className="text-sm text-red-800 mt-1">{comparison.nonPrime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-50/50 border-2 border-blue-200 mt-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🚀</span>
          <div>
            <h4 className="font-semibold text-ink mb-1">Why We Only Use Prime (FBA)</h4>
            <p className="text-sm text-ink-muted">
              As a new seller with zero history, the Prime badge is your superpower. It instantly makes your listings compete with established sellers, filters you into the most active buyer segment, and lets you maintain healthy profit margins without a price war.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
