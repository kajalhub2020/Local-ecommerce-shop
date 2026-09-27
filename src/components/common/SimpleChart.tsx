import React, { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  formattedValue?: string;
}

interface BarChartProps {
  data: DataPoint[];
  height?: number;
  valuePrefix?: string;
  color?: string;
  title?: string;
}

export const SimpleBarChart: React.FC<BarChartProps> = ({
  data,
  height = 180,
  valuePrefix = '₹',
  color = '#0f172a',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="w-full">
      <div
        className="flex items-end gap-2 sm:gap-4 pt-6 pb-2 w-full"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const heightPercent = Math.max(8, Math.round((item.value / maxValue) * 100));
          const isHovered = hoveredIdx === index;

          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-9 z-20 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap tabular-nums">
                  {valuePrefix}
                  {item.value.toLocaleString()}
                </div>
              )}
              {/* Bar */}
              <div
                className="w-full rounded-t transition-all duration-200"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: isHovered ? '#3b82f6' : color,
                }}
              />
              {/* Label */}
              <span className="text-[11px] text-slate-500 mt-2 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  valuePrefix?: string;
}

export const SimpleLineChart: React.FC<LineChartProps> = ({
  data,
  height = 160,
  valuePrefix = '₹',
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 10);
  const minValue = Math.min(...data.map((d) => d.value), 0);
  const range = maxValue - minValue || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - minValue) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="w-full flex flex-col justify-end" style={{ height: `${height}px` }}>
      <div className="relative w-full h-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-3/4 overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints} fill="url(#chartGradient)" />
          <polyline
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};
