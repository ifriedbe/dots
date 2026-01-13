
import React from 'react';
import { DayState } from '../types';

interface JournalViewProps {
  days: DayState[];
  onBack: () => void;
  onEditEntry: (id: number) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ days, onBack, onEditEntry }) => {
  // Entries that have content
  const entries = days.filter(d => d.note && d.note.trim().length > 0);
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-full max-w-2xl bg-[#fdfd96] text-black shadow-2xl rounded-sm overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-500 relative">
      {/* Floating Year Title - Straight and Arial Font */}
      <div className="absolute top-12 right-8 z-20 pointer-events-none">
        <span 
          className="text-6xl opacity-10 font-bold block select-none"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          {currentYear}
        </span>
      </div>

      {/* Legal Pad Header */}
      <div className="h-10 bg-[#f9f95f] border-b border-black/10 flex items-center px-4 justify-between z-10">
        <div className="w-20" /> {/* Spacer */}
        <span className="text-[10px] font-black tracking-[0.5em] text-black/40 uppercase">Life Log</span>
        <button 
          onClick={onBack} 
          className="text-[10px] font-bold text-black/60 hover:text-black uppercase tracking-widest bg-black/5 px-3 py-1 rounded-full transition-all"
        >
          Eagle View
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative p-8 sm:p-12 legal-pad-bg scrollbar-thin scrollbar-thumb-black/10">
        {/* The Red Margin Line - Traditional legal pad style */}
        <div className="absolute left-16 sm:left-24 top-0 bottom-0 w-[1.5px] bg-red-400 opacity-40" />

        <div className="relative z-10 space-y-0">
          {entries.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center pt-20">
              <p className="note-font text-3xl text-black/30 italic">No notes found.</p>
              <p className="note-font text-xl text-black/20 mt-4">Write something in the grid view.</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="group min-h-[5rem] flex items-start relative">
                 {/* Left Margin Info */}
                 <div className="w-12 sm:w-20 shrink-0 pr-4 text-right pt-2">
                    <span className="text-[8px] font-bold text-black/30 uppercase block leading-none">Day {entry.id + 1}</span>
                    <span className="text-sm font-bold text-red-600/60 uppercase">{entry.dateLabel || '—'}</span>
                 </div>
                 
                 {/* Entry Content */}
                 <div className="flex-1 pl-6 sm:pl-10 relative">
                    <p className="note-font text-3xl sm:text-4xl text-black/80 leading-[2.5rem] group-hover:text-black transition-colors pt-1 pr-12">
                      {entry.note}
                    </p>
                    
                    {/* Edit Button inside the entry */}
                    <button 
                      onClick={() => onEditEntry(entry.id)}
                      className="absolute right-0 top-2 p-2 rounded-full opacity-0 group-hover:opacity-100 bg-black/5 hover:bg-black/10 transition-all"
                      title="Edit Entry"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                 </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .legal-pad-bg {
          background-image: linear-gradient(#fdfd96 95%, #94d2ff 95%);
          background-size: 100% 2.5rem;
          line-height: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default JournalView;
