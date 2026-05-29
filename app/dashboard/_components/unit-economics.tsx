'use client';

import { useState } from 'react';

const economicsData = {
  singleItem: {
    name: 'Single Branded Item',
    example: '(e.g., Car Sponge)',
    color: 'from-red-500 to-red-400',
    metrics: [
      { label: 'Sourcing Cost', value: '£1.50', icon: '🏭' },
      { label: 'Amazon Selling Price', value: '£5.99', icon: '🏷️' },
      { label: 'Competition', value: '35+ sellers', icon: '⚔️' },
      { label: 'Referral Fee', value: '£0.90', icon: '📊' },
      { label: 'FBA Fee', value: '£2.60', icon: '📦' },
      { label: 'Total Fees', value: '£3.50', icon: '💰' },
      { label: 'Net Profit Per Unit', value: '£1.49', icon: '✅' },
    ],
  },
  bundle: {
    name: 'The Value Bundle',
    example: '(Multi-Pack / Complementary Set)',
    color: 'from-green-500 to-green-400',
    metrics: [
      { label: 'Sourcing Cost', value: '£4.50', icon: '🏭' },
      { label: 'Amazon Selling Price', value: '£15.99', icon: '🏷️' },
      { label: 'Competition', value: '0 (You Own It)', icon: '👑' },
      { label: 'Referral Fee', value: '£2.50', icon: '📊' },
      { label: 'FBA Fee', value: '£3.50', icon: '📦' },
      { label: 'Total Fees', value: '£6.00', icon: '💰' },
      { label: 'Net Profit Per Unit', value: '£9.99', icon: '✅' },
    ],
  },
};

export function UnitEconomics() {

  const profitDifference = 9.99 - 1.49;
  const profitMultiple = (9.99 / 1.49).toFixed(1);
  const feesIncrease = ((6.0 - 3.5) / 3.5 * 100).toFixed(0);
  const revenueIncrease = ((15.99 - 5.99) / 5.99 * 100).toFixed(0);

  return (
    <div className="my-8 space-y-8">
      {/* Hero Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 space-y-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-amber-900">
          Understanding the Unit Economics
        </h2>
        <p className="text-amber-900 leading-relaxed">
          Let's look at the financial math. This table illustrates why we build unique bundles instead of fighting over single-item listings.
        </p>
        <div className="p-4 bg-white rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800 font-medium">
            💡 <span className="font-semibold">Key Insight:</span> The net fee for the bundle (£6.00) is only slightly higher than the single item (£3.50), but your net profit increases massively. By raising the Average Order Value (AOV), you make Amazon's flat logistics fees work for you, not against you.
          </p>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="space-y-6">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Single Item */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-50/50 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-1">{economicsData.singleItem.name}</h3>
              <p className="text-sm text-red-700 mb-4">{economicsData.singleItem.example}</p>
              <div className="space-y-3">
                {economicsData.singleItem.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-red-100 hover:shadow-md hover:border-red-300 transition-all duration-200 group">
                    <span className="text-2xl flex-shrink-0">{metric.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-red-700 font-medium">{metric.label}</p>
                      <p className="text-lg font-bold text-red-900 group-hover:text-red-600 transition-colors">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bundle */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-50/50 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-1">{economicsData.bundle.name}</h3>
              <p className="text-sm text-green-700 mb-4">{economicsData.bundle.example}</p>
              <div className="space-y-3">
                {economicsData.bundle.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-green-100 hover:shadow-md hover:border-green-300 transition-all duration-200 group">
                    <span className="text-2xl flex-shrink-0">{metric.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-green-700 font-medium">{metric.label}</p>
                      <p className="text-lg font-bold text-green-900 group-hover:text-green-600 transition-colors">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Profit Difference */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/50 border-2 border-blue-200 hover:shadow-lg hover:border-blue-400 transition-all duration-200 text-center">
              <p className="text-sm text-blue-700 font-medium mb-2">Profit Difference</p>
              <p className="text-4xl font-bold text-blue-900">£{profitDifference.toFixed(2)}</p>
              <p className="text-xs text-blue-700 mt-2">Bundle earns {profitMultiple}x more</p>
            </div>

            {/* Revenue Increase */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-50/50 border-2 border-purple-200 hover:shadow-lg hover:border-purple-400 transition-all duration-200 text-center">
              <p className="text-sm text-purple-700 font-medium mb-2">Revenue Increase</p>
              <p className="text-4xl font-bold text-purple-900">+{revenueIncrease}%</p>
              <p className="text-xs text-purple-700 mt-2">Bundle sells for 2.7x more</p>
            </div>

            {/* Fee Efficiency */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-50/50 border-2 border-orange-200 hover:shadow-lg hover:border-orange-400 transition-all duration-200 text-center">
              <p className="text-sm text-orange-700 font-medium mb-2">Fee Increase</p>
              <p className="text-4xl font-bold text-orange-900">+{feesIncrease}%</p>
              <p className="text-xs text-orange-700 mt-2">But profit grows 6.7x</p>
            </div>

            {/* Buy Box Status */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-50/50 border-2 border-green-200 hover:shadow-lg hover:border-green-400 transition-all duration-200 text-center">
              <p className="text-sm text-green-700 font-medium mb-2">Buy Box</p>
              <p className="text-4xl font-bold text-green-900">100%</p>
              <p className="text-xs text-green-700 mt-2">No competition on unique bundle</p>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-3 border border-slate-700">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-2xl">🎯</span> The Economics Reality
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-300 mb-1">Single Item Strategy:</p>
                <p className="font-medium">Compete on price, low margins, high volume needed</p>
              </div>
              <div>
                <p className="text-slate-300 mb-1">Bundle Strategy:</p>
                <p className="font-medium">Own uniqueness, high margins, lower volume needed</p>
              </div>
            </div>
          </div>
        </div>

      {/* Profit Visualization */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 space-y-4">
        <h3 className="font-bold text-ink text-lg flex items-center gap-2">
          <span>📊</span> Profit Breakdown Visualization
        </h3>

        <div className="space-y-6">
          {/* Single Item */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-red-900">Single Item (£5.99 Sale)</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-red-500 rounded-lg flex items-center justify-end pr-2 text-white font-bold">
                  Cost: £1.50
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-orange-500 rounded-lg flex items-center justify-end pr-2 text-white font-bold">
                  Fees: £3.50
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-green-500 rounded-lg flex items-center justify-end pr-2 text-white font-bold">
                  Profit: £1.49
                </div>
              </div>
            </div>
          </div>

          {/* Bundle */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-green-900">Value Bundle (£15.99 Sale)</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-red-500 rounded-lg flex items-center justify-end pr-2 text-white font-bold">
                  Cost: £4.50
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 bg-orange-500 rounded-lg flex items-center justify-end pr-2 text-white font-bold">
                  Fees: £6.00
                </div>
              </div>
              <div className="flex-1 h-6 bg-green-500 rounded-lg flex items-center justify-end pr-2 text-white font-bold text-sm">
                Profit: £9.99
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-300">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-slate-700">COGS</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-slate-700">Fees</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-slate-700">Profit</span>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-lg bg-blue-50 border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span> Volume Required
          </h4>
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Single item:</span> You need 6.7x more sales volume to match the profit of one bundle sale. This means more time marketing, more competitive pressure, and higher failure risk.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-green-50 border-l-4 border-green-500 hover:shadow-md transition-all duration-200">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <span>🎯</span> The Bundle Advantage
          </h4>
          <p className="text-sm text-green-800">
            <span className="font-semibold">The bundle:</span> 100% Buy Box ownership + 6.7x higher profit per sale = sustainable, scalable business. You make more money selling less.
          </p>
        </div>
      </div>
    </div>
  );
}
