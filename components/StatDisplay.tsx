
import React from 'react';

interface StatDisplayProps {
  daysLeft: number;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ daysLeft }) => {
  return (
    <div className="flex flex-col items-center gap-0.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <span className="text-3xl sm:text-5xl font-light tracking-tight text-white/90 tabular-nums">
        {daysLeft}
      </span>
      <span className="text-[10px] sm:text-xs font-light text-white/40 uppercase tracking-[0.4em]">
        Days Remaining
      </span>
    </div>
  );
};

export default StatDisplay;
