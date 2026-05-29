'use client';

import { useState } from 'react';

export function FeeCalculator() {
  const [salePrice, setSalePrice] = useState(19.99);
  const [costPrice, setCostPrice] = useState(6.00);
  const [referralRate, setReferralRate] = useState(15);
  const [fulfillmentFee, setFulfillmentFee] = useState(2.80);
  const [storageFeePer100] = useState(0.87);

  const referralFee = salePrice * (referralRate / 100);
  const totalFees = referralFee + fulfillmentFee;
  const grossProfit = salePrice - totalFees;
  const netProfit = grossProfit - costPrice;
  const profitMargin = ((netProfit / salePrice) * 100).toFixed(1);

  const scenarios = [
    {
      name: 'Small Compact Bundle',
      price: 19.99,
      cost: 6.00,
      fulfillment: 2.80,
      description: 'Fits in standard envelope'
    },
    {
      name: 'Large Parcel Bundle',
      price: 24.99,
      cost: 8.00,
      fulfillment: 5.50,
      description: 'Oversized, heavy item'
    },
    {
      name: 'Premium Bundle',
      price: 34.99,
      cost: 10.00,
      fulfillment: 3.20,
      description: 'Higher price, compact'
    },
  ];

  return (
    <div className="my-8 space-y-6">
      {/* Instruction */}
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
        <span className="text-lg">💰</span>
        <span>Adjust values to see fee impact on profit</span>
      </div>

      {/* Interactive Calculator */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-200 space-y-4">
        <h3 className="font-semibold text-ink">Your Fee Breakdown</h3>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-ink-muted block mb-2">
              Sale Price (£)
            </label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              step="0.10"
              className="w-full px-3 py-2 rounded-lg border border-blue-300 transition-all duration-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-muted block mb-2">
              Cost (£)
            </label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              step="0.10"
              className="w-full px-3 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-muted block mb-2">
              Referral % ({referralRate}%)
            </label>
            <input
              type="range"
              value={referralRate}
              onChange={(e) => setReferralRate(Number(e.target.value))}
              min="10"
              max="25"
              step="1"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-ink-muted block mb-2">
              FBA Fulfillment Fee (£)
            </label>
            <input
              type="number"
              value={fulfillmentFee}
              onChange={(e) => setFulfillmentFee(Number(e.target.value))}
              step="0.10"
              className="w-full px-3 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-ink-muted mt-1">Varies by size tier</p>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="pt-4 border-t border-blue-200 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-ink-muted">Referral Fee (15%)</p>
              <p className="font-semibold text-red-600">-£{referralFee.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-ink-muted">FBA Fulfillment</p>
              <p className="font-semibold text-red-600">-£{fulfillmentFee.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-ink-muted">Your Cost</p>
              <p className="font-semibold text-red-600">-£{costPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-ink-muted">Total Fees</p>
              <p className="font-semibold text-red-600">-£{totalFees.toFixed(2)}</p>
            </div>
          </div>

          {/* Profit Highlight */}
          <div className="p-4 rounded-lg bg-white border-2 border-green-500">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-ink-muted mb-1">YOUR PROFIT</p>
                <p className="text-2xl font-bold text-green-600">£{netProfit.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-ink-muted mb-1">PROFIT MARGIN</p>
                <p className="text-2xl font-bold text-green-600">{profitMargin}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Comparison */}
      <div className="space-y-3">
        <h3 className="font-semibold text-ink">Real-World Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, index) => {
            const refFee = scenario.price * 0.15;
            const totalFees = refFee + scenario.fulfillment;
            const profit = scenario.price - totalFees - scenario.cost;
            const margin = ((profit / scenario.price) * 100).toFixed(1);

            return (
              <button
                key={index}
                onClick={() => {
                  setSalePrice(scenario.price);
                  setCostPrice(scenario.cost);
                  setFulfillmentFee(scenario.fulfillment);
                }}
                className="p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-accent hover:shadow-lg hover:scale-105 transition-all duration-200 text-left group"
              >
                <p className="font-semibold text-ink group-hover:text-accent transition-colors">
                  {scenario.name}
                </p>
                <p className="text-xs text-ink-muted mb-3">{scenario.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Sale:</span>
                    <span className="font-medium">£{scenario.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Fees:</span>
                    <span className="font-medium">-£{totalFees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-green-600">Your Profit:</span>
                    <span className="font-bold text-green-600">£{profit.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-green-600 text-right font-medium">{margin}% margin</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Insight */}
      <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 space-y-2">
        <p className="font-semibold text-yellow-900 flex items-center gap-2">
          <span>⚠️</span> The Size Tier Trap
        </p>
        <p className="text-sm text-yellow-800">
          Moving just 1mm over a size boundary can cost you £0.50-£1.50 per unit. That single millimetre can wipe out your entire profit margin. Always design bundles to fit snugly into the smallest possible size tier.
        </p>
      </div>
    </div>
  );
}
