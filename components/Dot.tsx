
import React from 'react';
import { DayState, ViewMode } from '../types';
import { COLORS } from '../constants';

interface DotProps {
  state: DayState;
  onClick: () => void;
  isToday: boolean;
  viewMode: ViewMode;
}

const Dot: React.FC<DotProps> = ({ state, onClick, isToday, viewMode }) => {
  const colorObj = COLORS.find(c => c.id === state.color) || COLORS[0];
  
  const baseClasses = `aspect-square rounded-full transition-all duration-300 cursor-pointer border relative flex items-center justify-center hover:scale-150 z-0 hover:z-20`;
  
  const stateClasses = state.isMarked 
    ? `${colorObj.value} border-transparent shadow-[0_0_10px_rgba(255,255,255,0.1)]` 
    : "bg-transparent border-white/10 hover:border-white/30";

  // Indicator for having a note
  const hasNote = state.note && state.note.trim().length > 0;

  // Determine animation class
  let animationClass = '';
  if (isToday) {
    animationClass = 'sparkle-active border-blue-400/50';
  } else if (hasNote && viewMode === 'advanced') {
    animationClass = 'note-pulse z-10'; // Pulsate only in advanced mode
  }

  return (
    <div 
      onClick={onClick}
      className={`${baseClasses} ${stateClasses} ${animationClass}`}
      style={isToday ? {
        backgroundImage: `url('https://img.icons8.com/color/96/earth-planet.png')`,
        backgroundSize: '110% 110%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0,0,0,0.5)'
      } : {}}
      title={`Day ${state.id + 1}${hasNote ? ': ' + state.note : ''}`}
    >
      {isToday && (
        <div className="absolute -inset-1 rounded-full border border-blue-400/30 animate-ping" />
      )}
    </div>
  );
};

export default Dot;
