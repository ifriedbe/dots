
import React, { useState, useEffect } from 'react';
import { DayState } from '../types';
import { COLORS } from '../constants';

interface NoteModalProps {
  dot: DayState;
  onClose: () => void;
  onSave: (data: Partial<DayState>) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ dot, onClose, onSave }) => {
  // If the dot is not marked (empty), default to 'white' and set marked to true
  const [note, setNote] = useState(dot.note || '');
  const [selectedColor, setSelectedColor] = useState(dot.isMarked ? dot.color : 'white');
  const [isMarked, setIsMarked] = useState(true); // Default to marked when reflecting

  const handleSave = () => {
    onSave({ note, color: selectedColor, isMarked });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-[min(90vw,500px)] aspect-square rounded-full flex flex-col items-center justify-center glass shadow-[0_0_100px_rgba(255,255,255,0.1)] p-12 overflow-hidden animate-in zoom-in-95 duration-500"
      >
        {/* Background Sparkle Elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full blur-xl opacity-40 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-purple-400 rounded-full blur-xl opacity-40 animate-pulse delay-700" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <h2 className="text-white/30 text-xs uppercase tracking-[0.4em] mb-6 font-semibold">
          DAY {dot.id + 1} REFLECTION
        </h2>

        {/* Note Input */}
        <textarea 
          autoFocus
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's on your mind today?"
          className="w-full h-32 bg-transparent text-center text-3xl sm:text-4xl note-font text-white/90 focus:outline-none resize-none scrollbar-none placeholder:text-white/10 placeholder:italic"
        />

        {/* Color Palette */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedColor(c.id);
                setIsMarked(true);
              }}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${c.value} ${selectedColor === c.id && isMarked ? 'border-white scale-125 ring-4 ring-white/10' : 'border-black/20 opacity-50 hover:opacity-100 hover:scale-110'}`}
              title={c.name}
            />
          ))}
          <button 
            onClick={() => setIsMarked(false)}
            className={`w-8 h-8 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-white/40 hover:border-white/50 hover:text-white transition-all ${!isMarked ? 'bg-white/10 border-solid border-white ring-4 ring-white/10' : ''}`}
            title="Unmark Day"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <button 
          onClick={handleSave}
          className="mt-12 px-10 py-3 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          SAVE MOMENT
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
