'use client';

export function PillarShowcase() {
  return (
    <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 text-white space-y-4">
      <div className="flex items-start gap-3">
        <span className="text-4xl flex-shrink-0">📊</span>
        <div>
          <h3 className="font-bold text-lg">Sourcing Data vs. Software Laziness</h3>
          <p className="text-sm text-blue-100 mt-1">Finding real-world supply gaps, not copying software reports</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-red-50 border-l-4 border-red-400 text-red-900">
          <p className="font-semibold text-sm mb-1">❌ The Shortcut</p>
          <p className="text-sm leading-relaxed">Open software → Pull high-volume report → Copy 400 others</p>
        </div>

        <div className="p-4 rounded-lg bg-green-50 border-l-4 border-green-400 text-green-900">
          <p className="font-semibold text-sm mb-1">✅ The Method</p>
          <p className="text-sm leading-relaxed">Physical shelf research + live analytics = unique opportunities</p>
        </div>
      </div>
    </div>
  );
}
