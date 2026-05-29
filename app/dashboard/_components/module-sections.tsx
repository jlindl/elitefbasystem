'use client';

const sections = [
  {
    id: 1,
    title: 'The Basics of Amazon FBA',
    description: 'Understand how Fulfillment by Amazon eliminates the physical burden of running an online shop.',
    icon: '📦',
    bgGradient: 'from-blue-50 to-blue-100/50',
    borderColor: 'border-blue-200',
    accentColor: 'text-blue-600',
    hoverColor: 'hover:bg-blue-100',
  },
  {
    id: 2,
    title: 'How the Infrastructure Works',
    description: 'Deep dive into storage, the Prime badge, trust, visibility, pricing freedom, and full automation.',
    icon: '⚙️',
    bgGradient: 'from-purple-50 to-purple-100/50',
    borderColor: 'border-purple-200',
    accentColor: 'text-purple-600',
    hoverColor: 'hover:bg-purple-100',
  },
  {
    id: 3,
    title: 'The Prime Badge',
    description: 'Why the Prime badge is your unfair advantage as a new seller with zero history.',
    icon: '⭐',
    bgGradient: 'from-amber-50 to-amber-100/50',
    borderColor: 'border-amber-200',
    accentColor: 'text-amber-600',
    hoverColor: 'hover:bg-amber-100',
  },
  {
    id: 4,
    title: 'Storage & Fees',
    description: 'Navigate Amazon\'s storage costs, peak season penalties, and the Lean Model approach.',
    icon: '💾',
    bgGradient: 'from-green-50 to-green-100/50',
    borderColor: 'border-green-200',
    accentColor: 'text-green-600',
    hoverColor: 'hover:bg-green-100',
  },
  {
    id: 5,
    title: 'Case Study: Our Blueprint',
    description: 'Follow a real-world journey from local shelf research to a protected, scalable asset.',
    icon: '📊',
    bgGradient: 'from-red-50 to-red-100/50',
    borderColor: 'border-red-200',
    accentColor: 'text-red-600',
    hoverColor: 'hover:bg-red-100',
  },
  {
    id: 6,
    title: 'Unit Economics',
    description: 'The financial math that proves bundles beat single items on profit and competition.',
    icon: '💹',
    bgGradient: 'from-emerald-50 to-emerald-100/50',
    borderColor: 'border-emerald-200',
    accentColor: 'text-emerald-600',
    hoverColor: 'hover:bg-emerald-100',
  },
];

export function ModuleSections() {
  return (
    <div className="my-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-ink">
          Module 1: Introduction to Amazon FBA
        </h2>
        <p className="text-ink-muted">
          Six interconnected sections that build your foundation for FBA success
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`bg-gradient-to-br ${section.bgGradient} border-2 ${section.borderColor} rounded-xl p-5 transition-all duration-200 hover:shadow-lg ${section.hoverColor} cursor-pointer group`}
          >
            {/* Icon & Number */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{section.icon}</span>
              <span className={`text-sm font-bold px-2 py-1 rounded-full bg-white/60 ${section.accentColor}`}>
                {section.id}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className={`font-semibold text-ink text-sm leading-snug ${section.accentColor} group-hover:text-inherit transition-colors`}>
                {section.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Arrow Indicator */}
            <div className="flex items-center justify-end mt-4 pt-3 border-t border-white/30">
              <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Bar */}
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
        <span className="text-lg flex-shrink-0">💡</span>
        <p className="text-sm text-slate-700">
          Each section builds on the previous one. Together, they form the complete framework for understanding why Amazon FBA is the fastest path to a six-figure income.
        </p>
      </div>
    </div>
  );
}
