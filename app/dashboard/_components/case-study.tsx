'use client';

import { useState } from 'react';

const phases = [
  {
    id: 1,
    phase: 'The Discovery',
    subtitle: 'Spotting the Value Gap',
    icon: '🔍',
    color: 'from-blue-500 to-blue-400',
    duration: '1-2 weeks',
    findings: [
      { label: 'Retail Price per Unit', value: '£1-5', emoji: '🏪' },
      { label: 'Amazon Competitors', value: '30+ sellers', emoji: '⚔️' },
      { label: 'Customer Demand', value: 'Multi-units preferred', emoji: '📦' },
    ],
    description: 'While conducting physical shelf research, we looked at high-turnover, everyday consumer products and noticed a significant value gap between retail and Amazon marketplaces.',
    keyInsights: [
      'Single units dominated by price wars with 30+ sellers',
      'Customers wanted convenience bundles, not individual units',
      'Opportunity existed in creating multi-unit value packs'
    ]
  },
  {
    id: 2,
    phase: 'The Validation Bundle',
    subtitle: 'The Strategy with 3 Key Steps',
    icon: '📋',
    color: 'from-purple-500 to-purple-400',
    duration: '2-4 weeks',
    steps: [
      { number: 1, title: 'GTIN Exemption', description: 'Applied for free digital waiver to list bundle without expensive barcodes', cost: 'FREE' },
      { number: 2, title: 'Generic Brand Name', description: 'Created listing under "Generic" brand to bypass trademark costs before validation', cost: 'FREE' },
      { number: 3, title: 'Test Batch', description: 'Purchased 12 units of each component from retail shelves and sent to Amazon FC', cost: '£60-100' },
    ],
    keyInsights: [
      'Risk-minimized validation approach',
      'Zero upfront branding costs',
      'Small batch testing = big data insights'
    ]
  },
  {
    id: 3,
    phase: 'The Result & Scale',
    subtitle: 'From Test to Protected Asset',
    icon: '🚀',
    color: 'from-green-500 to-green-400',
    duration: '30+ days',
    milestones: [
      { milestone: 'Test Batch Sold Out', timeframe: 'Within days', icon: '✅' },
      { milestone: '100% Buy Box Ownership', timeframe: 'Day 1-30', icon: '👑' },
      { milestone: 'Scale with Wholesale', timeframe: 'Day 30+', icon: '📈' },
    ],
    outcomes: [
      'Formed Limited Company & Registered Trademark',
      'Applied for Amazon Brand Registry to lock listing',
      'Cut stock costs in half via wholesale distributors',
      'Multiplied net profit with bulk purchasing'
    ],
    keyInsights: [
      'Protection through uniqueness and brand registry',
      '50% cost reduction through wholesale scaling',
      'Automated, scalable commercial asset created'
    ]
  }
];

export function CaseStudy() {
  const [expandedPhase, setExpandedPhase] = useState<number>(1);

  return (
    <div className="my-8 space-y-8">
      {/* Hero Section */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 border border-slate-700">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Case Study: Our Blueprint</h2>
        <p className="text-lg text-slate-200 leading-relaxed max-w-3xl">
          To understand how this framework operates in the real world, let's look at a concrete case study of how a simple, generic multi-item bundle is built from scratch.
        </p>
        <div className="flex items-center gap-3 pt-2 border-t border-slate-700">
          <span className="text-2xl">💡</span>
          <p className="text-slate-300 text-sm">This system doesn't start with expensive websites, warehouses, or thousands in investment. It starts on clearance shelves.</p>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="space-y-4">
        <h3 className="font-semibold text-ink text-lg">The Journey</h3>
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2">
          {phases.map((p, index) => (
            <div key={p.id} className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <button
                onClick={() => setExpandedPhase(p.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap border-2 hover:shadow-lg ${
                  expandedPhase === p.id
                    ? `bg-gradient-to-r ${p.color} text-white border-opacity-0 shadow-lg`
                    : 'bg-white border-gray-200 text-ink hover:border-gray-400'
                }`}
                title={`View ${p.phase}`}
              >
                {p.phase}
              </button>
              {index < phases.length - 1 && (
                <div className="hidden md:block w-6 h-1 bg-gradient-to-r from-gray-300 to-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phase Details */}
      <div className="space-y-6">
        {phases.map((phase) => (
          expandedPhase === phase.id && (
            <div key={phase.id} className="animate-in fade-in duration-300">
              {/* Phase Header */}
              <div className={`p-6 rounded-xl bg-gradient-to-br ${phase.color} text-white space-y-2 border border-opacity-20`}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{phase.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{phase.phase}</h3>
                    <p className="text-sm text-white/80">{phase.subtitle}</p>
                    <p className="text-xs text-white/60 mt-1">⏱️ {phase.duration}</p>
                  </div>
                </div>
              </div>

              {/* Phase Content */}
              <div className="mt-6 space-y-6">
                {/* Phase 1: Findings */}
                {phase.id === 1 && (
                  <div className="space-y-4">
                    <p className="text-ink-muted leading-relaxed">{phase.description}</p>

                    {/* Key Findings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {phase.findings?.map((finding, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-blue-50 border border-blue-200 hover:shadow-lg hover:border-blue-400 transition-all duration-200 group cursor-pointer"
                        >
                          <p className="text-sm text-blue-700 mb-2">{finding.label}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-blue-900">{finding.value}</span>
                            <span className="text-2xl">{finding.emoji}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Insights */}
                    <div className="p-4 rounded-lg bg-blue-100 border-l-4 border-blue-500">
                      <p className="font-semibold text-blue-900 mb-2">🎯 Key Insights</p>
                      <ul className="space-y-2">
                        {phase.keyInsights?.map((insight, idx) => (
                          <li key={idx} className="text-sm text-blue-800 flex gap-2">
                            <span>✓</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Phase 2: Steps */}
                {phase.id === 2 && (
                  <div className="space-y-4">
                    <p className="text-ink-muted leading-relaxed">{phase.description}</p>

                    {/* Strategy Steps */}
                    <div className="space-y-3">
                      {phase.steps?.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-50/50 border border-purple-200 hover:shadow-lg hover:border-purple-400 transition-all duration-200 group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-400 text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                              {step.number}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-purple-900">{step.title}</h4>
                              <p className="text-sm text-purple-800 mt-1">{step.description}</p>
                              <div className="mt-2 inline-block px-2 py-1 rounded text-xs font-medium bg-purple-200 text-purple-900">
                                Cost: {step.cost}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Insights */}
                    <div className="p-4 rounded-lg bg-purple-100 border-l-4 border-purple-500">
                      <p className="font-semibold text-purple-900 mb-2">🎯 Key Insights</p>
                      <ul className="space-y-2">
                        {phase.keyInsights?.map((insight, idx) => (
                          <li key={idx} className="text-sm text-purple-800 flex gap-2">
                            <span>✓</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Phase 3: Results & Scale */}
                {phase.id === 3 && (
                  <div className="space-y-6">
                    <p className="text-ink-muted leading-relaxed">
                      The test batch sold out completely within days. Because we had created a unique combination of items, we owned 100% of the Buy Box.
                    </p>

                    {/* Milestones Timeline */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-ink">Timeline of Success</h4>
                      {phase.milestones?.map((milestone, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-50/50 border border-green-200 hover:shadow-lg hover:border-green-400 transition-all duration-200 flex items-center gap-4"
                        >
                          <span className="text-3xl">{milestone.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-green-900">{milestone.milestone}</p>
                            <p className="text-sm text-green-700">{milestone.timeframe}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Execution Steps */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-ink">Scaling Strategy (Phase 4)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.outcomes?.map((outcome, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg bg-green-50 border border-green-200 hover:shadow-md hover:border-green-400 transition-all duration-200 flex gap-3"
                          >
                            <span className="text-xl flex-shrink-0">✅</span>
                            <p className="text-sm text-green-900">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="p-4 rounded-lg bg-green-100 border-l-4 border-green-500">
                      <p className="font-semibold text-green-900 mb-2">🎯 Key Insights</p>
                      <ul className="space-y-2">
                        {phase.keyInsights?.map((insight, idx) => (
                          <li key={idx} className="text-sm text-green-800 flex gap-2">
                            <span>✓</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Impact Summary */}
              {expandedPhase === 3 && (
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 space-y-4">
                  <h4 className="font-semibold text-amber-900 flex items-center gap-2">
                    <span className="text-2xl">📊</span> From Experiment to Scalable Asset
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border border-amber-200 hover:shadow-md transition-all duration-200">
                      <p className="text-3xl font-bold text-amber-600">12</p>
                      <p className="text-sm text-amber-900 mt-1">Units Starting Test</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-amber-200 hover:shadow-md transition-all duration-200">
                      <p className="text-3xl font-bold text-amber-600">100%</p>
                      <p className="text-sm text-amber-900 mt-1">Buy Box Ownership</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-amber-200 hover:shadow-md transition-all duration-200">
                      <p className="text-3xl font-bold text-amber-600">50%</p>
                      <p className="text-sm text-amber-900 mt-1">Cost Reduction</p>
                    </div>
                  </div>
                  <p className="text-sm text-amber-900 italic">
                    What began as a 12-unit experiment on a local shop shelf became a protected, automated, and highly scalable commercial asset.
                  </p>
                </div>
              )}
            </div>
          )
        ))}
      </div>

      {/* Call to Action */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300">
        <h4 className="font-semibold text-ink mb-2 flex items-center gap-2">
          <span>🚀</span> The Framework in Action
        </h4>
        <p className="text-ink-muted mb-4">
          This case study demonstrates the entire framework working in perfect sequence: Discovery → Validation → Protection → Scale. Each phase builds on the last, with minimal risk at each step.
        </p>
        <p className="text-sm text-ink-muted">
          The key insight? You don't need capital or infrastructure upfront. You need <span className="font-semibold text-ink">customer validation first</span>, then you scale with confidence.
        </p>
      </div>
    </div>
  );
}
