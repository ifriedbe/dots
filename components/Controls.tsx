
import React from 'react';
import { GridScale, ViewMode } from '../types';
import { COLORS } from '../constants';

interface ControlsProps {
  scale: GridScale;
  setScale: (s: GridScale) => void;
  onReset: () => void;
  view: 'grid' | 'journal';
  setView: (v: 'grid' | 'journal') => void;
  selectedColorId: string;
  setSelectedColorId: (id: string) => void;
  brushMode: 'paint' | 'erase' | 'edit';
  setBrushMode: (mode: 'paint' | 'erase' | 'edit') => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  scale, setScale, 
  onReset,
  view, setView,
  selectedColorId, setSelectedColorId,
  brushMode, setBrushMode,
  viewMode, setViewMode
}) => {
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:p-4 flex flex-col xl:flex-row items-center justify-between gap-4 shadow-2xl transition-all hover:border-white/20 max-w-7xl mx-auto">
        
        <div className="flex items-center gap-6">
          {/* View Scaling */}
          <div className="flex bg-black/60 p-1 rounded-2xl border border-white/5 gap-0.5">
            {(['1-year', '2-years', '3-years', '5-years'] as GridScale[]).map((s) => (
              <button 
                key={s}
                onClick={() => {
                  setScale(s);
                  setView('grid');
                }}
                className={`px-3 sm:px-5 py-2 rounded-xl text-[10px] sm:text-xs font-medium tracking-wide transition-all uppercase ${scale === s && view === 'grid' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                {s === '1-year' ? '1Y' : s === '2-years' ? '2Y' : s === '3-years' ? '3Y' : '5Y'}
              </button>
            ))}
          </div>

          {/* Simple/Advanced Toggle */}
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-2xl border border-white/5">
            <span className={`text-[10px] font-bold tracking-tighter transition-colors ${viewMode === 'simple' ? 'text-white' : 'text-white/20'}`}>SIMPLE</span>
            <button 
              onClick={() => setViewMode(viewMode === 'simple' ? 'advanced' : 'simple')}
              className="relative w-10 h-5 bg-white/10 rounded-full transition-all border border-white/10 overflow-hidden"
            >
              <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 shadow-lg ${viewMode === 'advanced' ? 'left-[22px]' : 'left-1'}`} />
            </button>
            <span className={`text-[10px] font-bold tracking-tighter transition-colors ${viewMode === 'advanced' ? 'text-white' : 'text-white/20'}`}>ADVANCED</span>
          </div>
        </div>

        {/* Brush & Tools */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex bg-black/60 p-1 rounded-2xl border border-white/5 gap-0.5">
                <button 
                    onClick={() => setBrushMode('edit')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all ${brushMode === 'edit' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                    EDIT
                </button>
                <button 
                    onClick={() => setBrushMode('paint')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all ${brushMode === 'paint' ? 'bg-green-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                    STICK
                </button>
                <button 
                    onClick={() => setBrushMode('erase')}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all ${brushMode === 'erase' ? 'bg-red-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                    ERASE
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-black/40 rounded-full px-4">
                {COLORS.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => {
                            setSelectedColorId(c.id);
                            if (brushMode === 'edit') setBrushMode('paint');
                        }}
                        className={`w-6 h-6 rounded-full border transition-all ${c.value} ${selectedColorId === c.id ? 'border-white scale-110 ring-2 ring-white/20' : 'border-transparent opacity-60'}`}
                    />
                ))}
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setView(view === 'grid' ? 'journal' : 'grid')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-semibold transition-all border ${view === 'journal' ? 'bg-yellow-400 text-black border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
                {view === 'grid' ? 'NOTEPAD' : 'EAGLE VIEW'}
            </button>

            <button 
                onClick={onReset}
                className="px-6 py-2.5 rounded-2xl text-xs font-semibold bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-red-500/10 hover:border-red-500/50 transition-all"
            >
                RESET
            </button>
        </div>

      </div>
    </div>
  );
};

export default Controls;
