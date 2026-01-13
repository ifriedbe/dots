
import React from 'react';
import { DayState, GridScale, ViewMode } from '../types';
import Dot from './Dot';

interface DotGridProps {
  days: DayState[];
  onDotClick: (id: number) => void;
  scale: GridScale;
  todayIndex: number;
  viewMode: ViewMode;
}

const DotGrid: React.FC<DotGridProps> = ({ days, onDotClick, scale, todayIndex, viewMode }) => {
  const getSizing = () => {
    switch(scale) {
      case '1-year': return { dot: 'clamp(12px, 2.2vw, 24px)', gap: 'clamp(4px, 0.8vw, 12px)' };
      case '2-years': return { dot: 'clamp(8px, 1.6vw, 16px)', gap: 'clamp(3px, 0.6vw, 8px)' };
      case '3-years': return { dot: 'clamp(6px, 1.2vw, 13px)', gap: 'clamp(2px, 0.4vw, 6px)' };
      case '5-years': return { dot: 'clamp(4px, 0.9vw, 11px)', gap: 'clamp(1px, 0.3vw, 5px)' };
      default: return { dot: '14px', gap: '8px' };
    }
  };

  const { dot: dotSize, gap: gapSize } = getSizing();

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${dotSize}, 1fr))`,
    gap: gapSize,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'start'
  };

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center p-2 sm:px-4 md:px-8 scrollbar-thin">
      <div style={gridStyle}>
        {days.map((day) => (
          <Dot 
            key={day.id} 
            state={day} 
            onClick={() => onDotClick(day.id)} 
            isToday={day.id === todayIndex}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default DotGrid;
