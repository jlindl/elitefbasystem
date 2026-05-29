'use client';

import { useState, useEffect } from 'react';

const timelineSteps = [
  {
    id: 1,
    time: 'Second 0',
    title: 'Customer Clicks "Buy Now"',
    icon: '🛒',
    description: 'A customer finds your Prime listing and completes their purchase on Amazon.co.uk. Payment is processed instantly.',
    color: 'from-blue-500 to-blue-400',
  },
  {
    id: 2,
    time: 'Second 1-5',
    title: 'Instant Order Routing',
    icon: '🗺️',
    description: 'Amazon\'s backend software instantly routes the order to the exact fulfillment centre holding your inventory. No manual intervention needed.',
    color: 'from-purple-500 to-purple-400',
  },
  {
    id: 3,
    time: 'Minute 1-30',
    title: 'Robotic Retrieval',
    icon: '🤖',
    description: 'High-speed automated robots locate your specific bundle on the warehouse shelf. It\'s brought to a packing station.',
    color: 'from-pink-500 to-pink-400',
  },
  {
    id: 4,
    time: 'Minute 30-45',
    title: 'Quality Check & Packing',
    icon: '📦',
    description: 'Your product is scanned for accuracy, placed in an official Amazon-branded box, sealed, and labelled.',
    color: 'from-orange-500 to-orange-400',
  },
  {
    id: 5,
    time: 'Hour 1-4',
    title: 'Sorting & Vehicle Load',
    icon: '🚚',
    description: 'Packages are automatically sorted onto delivery vehicles. Amazon\'s shipping network organizes outbound shipments.',
    color: 'from-green-500 to-green-400',
  },
  {
    id: 6,
    time: 'Hour 24',
    title: 'Delivered to Customer',
    icon: '📮',
    description: 'Your product arrives at the customer\'s doorstep, often before 9 AM the next morning. Customer is happy. You get paid.',
    color: 'from-emerald-500 to-emerald-400',
  },
];

export function AutomationTimeline() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < timelineSteps.length ? prev + 1 : 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeItem = timelineSteps.find(step => step.id === activeStep);

  return (
    <div className="my-8 space-y-6">
      {/* Instruction */}
      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium mb-2">
        <span className="text-lg">⏱️</span>
        <span>Click any step to explore</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full overflow-hidden">
        <div
          className={`h-full bg-white/40 transition-all duration-800 rounded-full ${
            isAutoPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            marginLeft: `${((activeStep - 1) / timelineSteps.length) * 100}%`,
            width: `${(1 / timelineSteps.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Visual Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 hidden md:block"></div>

        {/* Timeline Steps */}
        <div className="space-y-4 md:space-y-6">
          {timelineSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(step.id);
              }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              className={`relative w-full text-left transition-all duration-200 ${
                activeStep === step.id ? 'scale-105 md:scale-100' : 'md:hover:shadow-md'
              } ${step.id === 1 && activeStep !== 1 ? 'animate-pulse' : ''}`}
              title="Click to view this step"
            >
              {/* Desktop: Timeline bubble */}
              <div className="hidden md:flex items-start gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg ring-4 ring-white ${
                  activeStep === step.id ? 'ring-8 animate-pulse' : ''
                } transition-all relative`}>
                  {step.icon}
                  {activeStep === step.id && (
                    <div className="absolute inset-0 rounded-full border-2 border-white animate-spin" style={{animationDuration: '2s'}}></div>
                  )}
                </div>
                <div className={`flex-1 p-4 rounded-lg transition-all duration-200 border-2 ${
                  activeStep === step.id
                    ? 'bg-white border-accent shadow-lg'
                    : 'bg-surface border-black/10 hover:border-black/20 hover:shadow-md'
                }`}>
                  <div className="text-sm font-medium text-accent mb-1">{step.time}</div>
                  <h4 className="font-semibold text-ink">{step.title}</h4>
                </div>
              </div>

              {/* Mobile: Card layout */}
              <div className="md:hidden">
                <div className={`p-4 rounded-lg transition-all duration-200 border-2 ${
                  activeStep === step.id
                    ? 'bg-white border-accent shadow-lg'
                    : 'bg-surface border-black/10 hover:shadow-md hover:border-black/20'
                }`}>
                  <div className="flex items-start gap-3 mb-2">
                    <span className={`text-2xl flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      {step.icon}
                    </span>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-accent">{step.time}</div>
                      <h4 className="font-semibold text-ink text-sm">{step.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {activeItem && (
        <div className={`p-6 rounded-xl bg-gradient-to-br ${activeItem.color} bg-opacity-5 border-2 border-opacity-20 animate-in fade-in duration-200`}>
          <div className="flex items-start gap-3">
            <span className="text-4xl flex-shrink-0">{activeItem.icon}</span>
            <div>
              <h3 className="font-semibold text-ink text-lg mb-1">{activeItem.title}</h3>
              <p className="text-ink-muted leading-relaxed">{activeItem.description}</p>
              <div className="mt-3 inline-block px-3 py-1 bg-white rounded-full text-xs font-medium text-accent">
                {activeItem.time}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Insight */}
      <div className="p-4 rounded-xl bg-yellow-50 border-2 border-yellow-200 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⏱️</span>
        <div>
          <p className="font-medium text-yellow-900 text-sm mb-1">Total Time: 24 Hours or Less</p>
          <p className="text-sm text-yellow-800">From customer clicking "Buy Now" to package on their doorstep. All completely automated. You don't lift a finger.</p>
        </div>
      </div>
    </div>
  );
}
