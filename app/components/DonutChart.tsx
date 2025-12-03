"use client";

type Segment = { value: number; color: string };

type Props = {
  segments: Segment[];
  size?: number;
  strokeWidth?: number;
};

export default function DonutChart({ segments, size = 120, strokeWidth = 12 }: Props) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;

  const { infos: segmentInfos } = segments.reduce(
    (acc, seg, i) => {
      const len = (seg.value / total) * c;
      const dashArray = `${len} ${c - len}`;
      const info = {
        key: `${i}-${seg.color}`,
        dashArray,
        dashOffset: -acc.total,
        color: seg.color,
      };
      return { total: acc.total + len, infos: [...acc.infos, info] };
    },
    { total: 0, infos: [] as Array<{ key: string; dashArray: string; dashOffset: number; color: string }> }
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segmentInfos.map((info) => (
          <circle
            key={info.key}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={info.color}
            strokeWidth={strokeWidth}
            strokeDasharray={info.dashArray}
            strokeDashoffset={info.dashOffset}
            strokeLinecap="butt"
          />
        ))}
      </g>
      <circle cx={size / 2} cy={size / 2} r={r - strokeWidth} fill="white" />
    </svg>
  );
}
