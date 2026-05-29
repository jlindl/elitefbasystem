'use client';

import { useState } from 'react';

const trapSections = [
  {
    id: 1,
    title: 'The Big Brand Trap',
    subtitle: 'Intellectual Property Issues',
    icon: '🚫',
    color: 'from-red-500 to-red-400',
    bgLight: 'from-red-50 to-red-100/50',
    borderColor: 'border-red-200',
    problem: {
      title: 'Why Big Brands Are Dangerous',
      items: [
        'Famous brands spend millions protecting their IP',
        'Unauthorized listings trigger instant flags',
        'Amazon pauses your listing immediately',
        'One IP claim can start a chain reaction',
        'Multiple flags lead to permanent account ban'
      ]
    },
    example: {
      title: 'The Wrong Way',
      items: [
        'Buy Nike shoes from a discount shop',
        'List them on Amazon\'s existing Nike page',
        'Nike\'s lawyers detect unauthorized seller',
        'Listing paused, account flagged',
        'Repeat this a few times = permanent ban'
      ]
    },
    solution: {
      title: 'Our Strategy: The Generic Bundle',
      items: [
        'Source unbranded everyday items',
        'Create unique combinations',
        'List under brand name "Generic"',
        'You own 100% of the listing',
        'Zero IP conflicts, no competition'
      ]
    }
  },
  {
    id: 2,
    title: 'Retail Receipts vs. Wholesale Invoices',
    subtitle: 'Proof of Authenticity',
    icon: '📄',
    color: 'from-orange-500 to-orange-400',
    bgLight: 'from-orange-50 to-orange-100/50',
    borderColor: 'border-orange-200',
    problem: {
      title: 'The Receipt Myth',
      items: [
        'Shop receipt = consumer proof only',
        'Amazon doesn\'t accept retail receipts for verification',
        'Fails quality checks and compliance reviews',
        'Won\'t clear restricted categories',
        'Puts your account at risk'
      ]
    },
    example: {
      title: 'Why Retail Receipts Fail',
      items: [
        'No business-to-business (B2B) relationship',
        'Can\'t prove bulk wholesale sourcing',
        'No supplier verification',
        'Doesn\'t show your business details',
        'Amazon\'s automated systems reject them'
      ]
    },
    solution: {
      title: 'Official Wholesale Invoices Required',
      items: [
        'B2B invoice from verified wholesaler',
        'Shows your business name and address',
        'Minimum 10+ units documented',
        'Clears Amazon quality checks',
        'Unlocks restricted categories safely'
      ]
    }
  }
];

export function AccountSafety() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  return (
    <div className="my-8 space-y-8">
      {/* Critical Warning Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-red-900 to-red-800 text-white border-2 border-red-700 space-y-3">
        <h2 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          Account Safety & Compliance
        </h2>
        <p className="text-red-100 leading-relaxed">
          Amazon is not a casual selling platform. It is a strict, automated marketplace run by algorithms. If you break their rules (even by accident), the system will instantly lock your account, freeze your inventory, and hold your money.
        </p>
        <div className="pt-3 border-t border-red-700">
          <p className="text-sm text-red-100">
            <span className="font-semibold">When you are starting lean, an account suspension can completely end your business before it starts.</span> Compliance is not a boring legal detail; it is your shield.
          </p>
        </div>
      </div>

      {/* Two Main Sections */}
      <div className="space-y-6">
        {trapSections.map((section) => (
          <div key={section.id} className="space-y-4">
            {/* Section Header */}
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className={`w-full p-6 rounded-xl bg-gradient-to-r ${section.bgLight} border-2 ${section.borderColor} transition-all duration-200 hover:shadow-lg text-left`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{section.icon}</span>
                    <h3 className="text-xl font-bold text-ink">{section.title}</h3>
                  </div>
                  <p className="text-sm text-ink-muted">{section.subtitle}</p>
                </div>
                <span className={`text-2xl transition-transform duration-300 flex-shrink-0 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedSection === section.id && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Problem */}
                <div className="p-5 rounded-lg bg-red-50 border border-red-200 space-y-3 hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-red-900 flex items-center gap-2">
                    <span>❌</span> {section.problem.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.problem.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-red-800 flex gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example */}
                <div className="p-5 rounded-lg bg-amber-50 border border-amber-200 space-y-3 hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-amber-900 flex items-center gap-2">
                    <span>⚠️</span> {section.example.title}
                  </h4>
                  <div className="space-y-2">
                    {section.example.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-amber-800">
                        <span className="font-bold text-amber-600">{idx + 1}.</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution */}
                <div className="p-5 rounded-lg bg-green-50 border border-green-200 space-y-3 hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-green-900 flex items-center gap-2">
                    <span>✅</span> {section.solution.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.solution.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-green-800 flex gap-2">
                        <span className="flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison: Receipts vs Invoices */}
      <div className="p-6 rounded-xl bg-slate-50 border-2 border-slate-200 space-y-4">
        <h3 className="font-bold text-ink text-lg">Receipt vs. Invoice Comparison</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Retail Receipt */}
          <div className="p-4 rounded-lg bg-white border-2 border-red-200 space-y-3 hover:shadow-md transition-all duration-200">
            <h4 className="font-semibold text-red-900 flex items-center gap-2">
              <span className="text-2xl">🧾</span> Retail Receipt
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-red-700 font-medium">From high-street shops</p>
              <div className="space-y-1">
                <p className="text-red-800">❌ Consumer proof only</p>
                <p className="text-red-800">❌ Fails Amazon quality checks</p>
                <p className="text-red-800">❌ No B2B relationship</p>
                <p className="text-red-800">❌ Restricted categories locked</p>
              </div>
            </div>
          </div>

          {/* Wholesale Invoice */}
          <div className="p-4 rounded-lg bg-white border-2 border-green-200 space-y-3 hover:shadow-md transition-all duration-200">
            <h4 className="font-semibold text-green-900 flex items-center gap-2">
              <span className="text-2xl">📋</span> Wholesale Invoice
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-700 font-medium">From official suppliers</p>
              <div className="space-y-1">
                <p className="text-green-800">✅ B2B business document</p>
                <p className="text-green-800">✅ Clears quality checks</p>
                <p className="text-green-800">✅ Verified wholesaler</p>
                <p className="text-green-800">✅ Unlocks all categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Sourcing Standard */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 space-y-4">
        <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">
          <span>🎯</span> Our Sourcing Standard
        </h3>
        <div className="space-y-3">
          <p className="text-blue-900 leading-relaxed">
            Because retail receipts won't clear serious compliance checks, we treat physical shops only as a low-risk testing lab.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Testing Phase */}
            <div className="p-4 rounded-lg bg-white border border-blue-200 space-y-2">
              <h4 className="font-semibold text-blue-900">Testing Phase</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Initial batches: 10-12 units only</li>
                <li>• From retail shops</li>
                <li>• Minimal financial risk</li>
                <li>• Validate demand first</li>
              </ul>
            </div>

            {/* Scaling Phase */}
            <div className="p-4 rounded-lg bg-white border border-blue-200 space-y-2">
              <h4 className="font-semibold text-blue-900">Scaling Phase</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• From verified wholesalers</li>
                <li>• Official B2B invoices</li>
                <li>• Bulk quantities</li>
                <li>• Zero compliance risk</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-100 rounded-lg border border-blue-300">
            <p className="text-sm text-blue-900 font-medium">
              We never spend thousands of pounds on stock that only has a shop receipt behind it. We only scale into high volumes when we move to buying directly from official wholesalers who give us proper commercial invoices.
            </p>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-slate-700 space-y-3">
        <h4 className="font-bold text-lg flex items-center gap-2">
          <span>🔐</span> Compliance = Protection
        </h4>
        <p className="text-slate-200">
          The sellers who survive and thrive on Amazon are the ones who respect the system. Every rule exists because someone broke it and got banned. By following our approach, you make compliance work for you, not against you. You move slowly at first, you scale safely with proper documentation, and your account stays protected.
        </p>
      </div>
    </div>
  );
}
