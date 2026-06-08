export function MeasurementDiagram() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-orange-50/30 p-5 md:p-6">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        📐 How to Measure L × W × H
      </p>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Amazon asks for three dimensions on every product: Length, Width, and
        Height. If you have never measured a box for shipping before, here is
        the convention. Place the box on a flat surface in front of you and
        read off the three edges shown below.
      </p>

      <div className="rounded-2xl border-2 border-orange-300 bg-white p-5 flex justify-center">
        <svg
          viewBox="0 0 420 300"
          className="w-full max-w-md h-auto"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Isometric diagram of a box with Length, Width, and Height labels"
        >
          {/* Top face of the box */}
          <polygon
            points="120,120 280,120 340,80 180,80"
            fill="#fed7aa"
            stroke="#ea580c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Right face of the box */}
          <polygon
            points="280,120 340,80 340,200 280,240"
            fill="#fdba74"
            stroke="#ea580c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Front face of the box */}
          <polygon
            points="120,120 280,120 280,240 120,240"
            fill="#fff7ed"
            stroke="#ea580c"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* L (length) arrow along the front-bottom edge */}
          <line
            x1="120"
            y1="265"
            x2="280"
            y2="265"
            stroke="#9a3412"
            strokeWidth="2"
          />
          <polygon points="120,265 130,260 130,270" fill="#9a3412" />
          <polygon points="280,265 270,260 270,270" fill="#9a3412" />
          <text
            x="200"
            y="284"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fontWeight="700"
            fill="#9a3412"
          >
            L (length)
          </text>

          {/* W (width / depth) arrow along the right-back diagonal */}
          <line
            x1="290"
            y1="247"
            x2="350"
            y2="207"
            stroke="#9a3412"
            strokeWidth="2"
          />
          <polygon points="290,247 295,238 302,246" fill="#9a3412" />
          <polygon points="350,207 343,210 343,200" fill="#9a3412" />
          <text
            x="335"
            y="245"
            textAnchor="start"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fontWeight="700"
            fill="#9a3412"
          >
            W (width)
          </text>

          {/* H (height) arrow along the front-left edge */}
          <line
            x1="100"
            y1="120"
            x2="100"
            y2="240"
            stroke="#9a3412"
            strokeWidth="2"
          />
          <polygon points="100,120 95,130 105,130" fill="#9a3412" />
          <polygon points="100,240 95,230 105,230" fill="#9a3412" />
          <text
            x="92"
            y="186"
            textAnchor="end"
            fontFamily="ui-monospace, monospace"
            fontSize="14"
            fontWeight="700"
            fill="#9a3412"
          >
            H (height)
          </text>
        </svg>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border-2 border-orange-200 bg-orange-50/60 px-4 py-3">
          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-orange-800 mb-1">
            L · Length
          </p>
          <p className="text-[0.85rem] text-ink leading-relaxed">
            The longest horizontal edge as the box sits in front of you. For
            most parcels this is the side running left-to-right.
          </p>
        </div>
        <div className="rounded-lg border-2 border-orange-200 bg-orange-50/60 px-4 py-3">
          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-orange-800 mb-1">
            W · Width
          </p>
          <p className="text-[0.85rem] text-ink leading-relaxed">
            The horizontal edge going away from you (front to back). Also
            sometimes called depth on shipping forms.
          </p>
        </div>
        <div className="rounded-lg border-2 border-orange-200 bg-orange-50/60 px-4 py-3">
          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-orange-800 mb-1">
            H · Height
          </p>
          <p className="text-[0.85rem] text-ink leading-relaxed">
            The vertical edge from the surface up to the top of the box.
            Always the one going up and down.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-700 mb-1">
          💡 Measuring tip
        </p>
        <p className="text-[0.88rem] text-amber-900 leading-relaxed">
          Measure the bundle in its final packaging (polybag sealed, FNSKU
          label attached), with a tape measure or ruler against each edge.
          Round each measurement up by 2mm. Amazon's Cubiscan in the warehouse
          re-measures every inbound box, and if your figures are smaller than
          theirs you get bumped into a higher size tier without warning.
        </p>
      </div>
    </div>
  );
}
