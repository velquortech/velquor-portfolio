/**
 * StepField — the identity's signature graphic device.
 *
 * Horizontal bars stair-stepped into a chevron aperture, each bar carrying a
 * violet -> near-white gradient. Taken from the billboard, transit, notebook
 * and brand-board applications in the hand-off, where it is the single most
 * repeated non-logo asset.
 *
 * Pure SVG, no client JS. Decorative only — always aria-hidden.
 */

type Props = {
  /** Number of stacked bars. Odd counts centre a bar on the aperture axis. */
  rows?: number;
  /** How far the shortest bar retracts, 0-1. Higher = deeper notch. */
  depth?: number;
  /** Mirror horizontally — bars step in from the right instead of the left. */
  flip?: boolean;
  className?: string;
};

const VIEW_W = 400;
const VIEW_H = 300;

export function StepField({
  rows = 15,
  depth = 0.62,
  flip = false,
  className = "",
}: Props) {
  const barH = VIEW_H / rows;
  /** Gap between bars, as a share of the row height. */
  const gap = barH * 0.22;

  const bars = Array.from({ length: rows }, (_, i) => {
    // Distance from the vertical centre, 0 at the axis -> 1 at the edges.
    const d = Math.abs(i - (rows - 1) / 2) / ((rows - 1) / 2);
    // Longest bar on the axis, retracting toward the edges: the chevron.
    const w = VIEW_W * (1 - depth * d);
    return {
      y: i * barH,
      w,
      // Bars nearest the axis read brightest.
      opacity: 0.9 - d * 0.55,
      key: i,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="stepfield-bar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#efe5ff" />
          <stop offset="45%" stopColor="#a366ff" />
          <stop offset="100%" stopColor="#6600ff" />
        </linearGradient>
        {/* Bars dissolve into the canvas at the open end rather than
            terminating on a hard edge. */}
        <linearGradient id="stepfield-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.75" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="stepfield-mask">
          <rect width={VIEW_W} height={VIEW_H} fill="url(#stepfield-fade)" />
        </mask>
      </defs>

      <g
        mask="url(#stepfield-mask)"
        transform={flip ? `translate(${VIEW_W},0) scale(-1,1)` : undefined}
      >
        {bars.map(({ key, y, w, opacity }) => (
          <rect
            key={key}
            x="0"
            y={y}
            width={w}
            height={barH - gap}
            fill="url(#stepfield-bar)"
            opacity={opacity}
          />
        ))}
      </g>
    </svg>
  );
}
