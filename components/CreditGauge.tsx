
import React from 'react';

interface CreditGaugeProps {
  score: number;
  size?: number;
}

const CreditGauge: React.FC<CreditGaugeProps> = ({ score, size = 120 }) => {
  const radius = size * 0.4;
  const stroke = size * 0.1;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (score / 100) * (circumference / 2);

  const getColor = (s: number) => {
    if (s > 85) return '#10b981'; // Emerald
    if (s > 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 1.5 }}>
        <svg
          height={size}
          width={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform rotate-[180deg]"
        >
          {/* Background */}
          <circle
            stroke="#e2e8f0"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 2} ${circumference}`}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress */}
          <circle
            stroke={getColor(score)}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 2} ${circumference}`}
            style={{ strokeDashoffset: offset }}
            r={normalizedRadius}
            cx={size / 2}
            cy={size / 2}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <span className="text-2xl font-bold" style={{ color: getColor(score) }}>{score}</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Credit Score</span>
        </div>
      </div>
    </div>
  );
};

export default CreditGauge;
