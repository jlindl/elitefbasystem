'use client';

import { useState, useEffect } from 'react';

const flows = [
  {
    id: 1,
    title: 'Customer Inquiry',
    icon: '💬',
    color: 'from-blue-500 to-blue-400',
    steps: [
      { step: 1, label: 'Customer clicks "Contact Seller"', icon: '🖱️', time: '0s' },
      { step: 2, label: 'Amazon intercepts the message', icon: '🔍', time: '1s' },
      { step: 3, label: 'Amazon support replies using tracking data', icon: '📍', time: '2-30min' },
      { step: 4, label: 'You receive zero messages', icon: '😴', time: '—' },
    ],
  },
  {
    id: 2,
    title: 'Return Request',
    icon: '🔄',
    color: 'from-orange-500 to-orange-400',
    steps: [
      { step: 1, label: 'Customer initiates return', icon: '📦', time: '0s' },
      { step: 2, label: 'Amazon generates return shipping label', icon: '🏷️', time: '1s' },
      { step: 3, label: 'Amazon processes refund from your account', icon: '💳', time: '1-5min' },
      { step: 4, label: 'Item ships back to fulfillment centre', icon: '🚚', time: '3-10 days' },
    ],
  },
  {
    id: 3,
    title: 'Inventory Check',
    icon: '📊',
    color: 'from-green-500 to-green-400',
    steps: [
      { step: 1, label: 'Returned item arrives at warehouse', icon: '📮', time: '0s' },
      { step: 2, label: 'Amazon staff inspect the package', icon: '🔎', time: '1-2 days' },
      { step: 3, label: 'Item marked as Fulfillable or Unfulfillable', icon: '✅', time: '2-3 days' },
      { step: 4, label: 'Resold or recalled to your address', icon: '🏠', time: 'varies' },
    ],
  },
];

export function CustomerServiceFlow() {
  const [activeFlow, setActiveFlow] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentFlow = flows.find((f) => f.id === activeFlow);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev < flows.length ? prev + 1 : 1));
      setActiveStep(0);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const stepInterval = setInterval(() => {
      if (currentFlow) {
        setActiveStep((prev) => (prev < currentFlow.steps.length - 1 ? prev + 1 : 0));
      }
    }, 1200);

    return () => clearInterval(stepInterval);
  }, [isAutoPlaying, currentFlow]);

  return (
    <div className="my-8 space-y-6">
      {/* Instruction */}
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
        <span className="text-lg">🎬</span>
        <span>Click to switch between flows</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 transition-all duration-1000 ${
            isAutoPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${((activeFlow - 1) / flows.length) * 100 + (1 / flows.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Flow tabs */}
      <div className="grid grid-cols-3 gap-3">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => {
              setIsAutoPlaying(false);
              setActiveFlow(flow.id);
              setActiveStep(0);
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className={`p-3 rounded-lg transition-all duration-200 border-2 text-center hover:shadow-md ${
              activeFlow === flow.id
                ? `bg-gradient-to-br ${flow.color} text-white border-opacity-0 shadow-lg`
                : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50'
            }`}
            title={`View ${flow.title}`}
          >
            <span className="text-2xl block mb-1">{flow.icon}</span>
            <span className="text-xs font-medium">{flow.title}</span>
          </button>
        ))}
      </div>

      {/* Flow visualization */}
      {currentFlow && (
        <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-50/50 border border-gray-200 space-y-4">
          <h3 className="font-semibold text-ink flex items-center gap-2">
            <span className="text-2xl">{currentFlow.icon}</span>
            {currentFlow.title}
          </h3>

          <div className="space-y-3">
            {currentFlow.steps.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                  activeStep >= index
                    ? 'bg-white border-2 border-gray-300 shadow-sm'
                    : 'bg-white/50 border border-gray-200'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                    activeStep >= index
                      ? 'bg-gradient-to-br from-blue-500 to-blue-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      activeStep >= index ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">{item.icon} {item.time}</p>
                </div>
                {activeStep === index && (
                  <div className="flex-shrink-0 animate-pulse text-lg">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-ink-muted">
              {activeFlow === 1 && 'You don\'t lift a finger. Amazon handles all customer inquiries automatically.'}
              {activeFlow === 2 && 'Amazon takes the refund from your account. You have no choice in the matter.'}
              {activeFlow === 3 && 'Items in good condition are resold. Damaged items are marked for recall.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
