'use client';

import { useState, useEffect } from 'react';

const steps = [
  { id: 1, label: 'You Source Products', icon: '📦' },
  { id: 2, label: 'Create your Listing', icon: '📝' },
  { id: 3, label: 'Ship to Amazon Warehouse', icon: '🚚' },
  { id: 4, label: 'Amazon Stores & Displays Prime Badge', icon: '⭐' },
  { id: 5, label: 'Customer Buys', icon: '🛒' },
  { id: 6, label: 'Amazon Packs & Ships to Customer', icon: '📮' },
  { id: 7, label: 'You get paid', icon: '💰' },
];

export function WorkflowDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === null) return 1;
        return prev < steps.length ? prev + 1 : 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-200">
      {/* Instruction */}
      <div className="mb-4 flex items-center gap-2 text-sm text-blue-700 font-medium">
        <span className="text-lg">👆</span>
        <span>Click any step to explore</span>
      </div>

      <div className="space-y-6">
        {/* Progress bar */}
        <div className="h-1 bg-blue-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 ${
              isAutoPlaying ? 'animate-pulse' : ''
            }`}
            style={{
              width: `${((activeStep || 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(activeStep === step.id ? null : step.id);
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200 cursor-pointer min-w-[140px] group relative hover:scale-105 hover:shadow-lg ${
                    activeStep === step.id
                      ? 'bg-white border-2 border-blue-500 shadow-lg scale-105'
                      : 'bg-white border border-blue-200 hover:border-blue-400'
                  } ${step.id === 1 && activeStep !== 1 ? 'animate-pulse' : ''}`}
                  title="Click to explore this step"
                >
                  {activeStep === step.id && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-t-lg"></div>
                  )}

                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-sm font-medium text-center text-ink leading-tight">
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 w-6 h-1 bg-gradient-to-r from-blue-400 to-blue-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(activeStep === step.id ? null : step.id);
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 text-left hover:shadow-md hover:border-blue-400 ${
                activeStep === step.id
                  ? 'bg-white border-2 border-blue-500 shadow-lg'
                  : 'bg-white border border-blue-200'
              } ${step.id === 1 && activeStep !== 1 ? 'animate-pulse' : ''}`}
              title="Click to explore this step"
            >
              <span className="text-2xl flex-shrink-0">{step.icon}</span>
              <span className="text-sm font-medium text-ink">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Info panel */}
        {activeStep && (
          <div className="p-4 bg-white rounded-lg border-2 border-blue-500 animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">
                {steps.find(s => s.id === activeStep)?.icon}
              </span>
              <div>
                <h3 className="font-semibold text-ink">
                  {steps.find(s => s.id === activeStep)?.label}
                </h3>
                <p className="text-sm text-ink-muted mt-1">
                  {getStepDescription(activeStep)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getStepDescription(stepId: number): string {
  const descriptions: Record<number, string> = {
    1: 'You find products from wholesalers or manufacturers and arrange bulk orders.',
    2: 'You create your product listing on Amazon with title, images, description, and pricing.',
    3: 'You send your inventory to one of Amazon\'s fulfillment centers via FedEx, UPS, or other carriers.',
    4: 'Amazon stores your inventory in their warehouse and displays the Prime badge on your listing.',
    5: 'A customer searches for your product on Amazon and clicks "Buy Now".',
    6: 'Amazon\'s warehouse staff pick, pack, and ship the order directly to the customer.',
    7: 'Amazon deposits your profit into your seller account every 14 days. You only pay fees for storage and fulfillment.',
  };
  return descriptions[stepId] || '';
}
