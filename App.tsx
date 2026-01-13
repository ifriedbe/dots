
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import DotGrid from './components/DotGrid';
import Controls from './components/Controls';
import StatDisplay from './components/StatDisplay';
import NoteModal from './components/NoteModal';
import JournalView from './components/JournalView';
import { DayState, GridScale, ViewMode } from './types';
import { COLORS, INITIAL_YEAR_DAYS, TWO_YEARS_DAYS, THREE_YEARS_DAYS, FIVE_YEARS_DAYS } from './constants';

type ViewType = 'grid' | 'journal';

const App: React.FC = () => {
  const [scale, setScale] = useState<GridScale>('1-year');
  const [selectedColorId, setSelectedColorId] = useState<string>('white');
  const [brushMode, setBrushMode] = useState<'paint' | 'erase' | 'edit'>('edit');
  const [days, setDays] = useState<DayState[]>([]);
  const [editingDotId, setEditingDotId] = useState<number | null>(null);
  const [view, setView] = useState<ViewType>('grid');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('life-dots-view-mode');
    return (saved as ViewMode) || 'advanced';
  });

  // Today index (0-indexed)
  const todayIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) - 1;
  }, []);

  const getTargetCount = useCallback((s: GridScale) => {
    switch(s) {
      case '1-year': return INITIAL_YEAR_DAYS;
      case '2-years': return TWO_YEARS_DAYS;
      case '3-years': return THREE_YEARS_DAYS;
      case '5-years': return FIVE_YEARS_DAYS;
      default: return INITIAL_YEAR_DAYS;
    }
  }, []);

  // Helper to get formatted date string for a specific day index of the year
  const getDateLabel = (index: number) => {
    const date = new Date(new Date().getFullYear(), 0, index + 1);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    const targetCount = getTargetCount(scale);
    const saved = localStorage.getItem(`life-dots-grid-${scale}`);
    
    if (saved) {
      const parsedDays: DayState[] = JSON.parse(saved);
      if (parsedDays.length !== targetCount) {
        const newDays: DayState[] = Array.from({ length: targetCount }, (_, i) => ({
          id: i,
          color: 'white',
          isMarked: i <= todayIndex,
          dateLabel: getDateLabel(i)
        }));
        setDays(newDays);
      } else {
        setDays(parsedDays);
      }
    } else {
      const newDays: DayState[] = Array.from({ length: targetCount }, (_, i) => ({
        id: i,
        color: 'white',
        isMarked: i <= todayIndex,
        dateLabel: getDateLabel(i)
      }));
      setDays(newDays);
    }
  }, [scale, getTargetCount, todayIndex]);

  useEffect(() => {
    if (days.length > 0) {
      localStorage.setItem(`life-dots-grid-${scale}`, JSON.stringify(days));
    }
  }, [days, scale]);

  useEffect(() => {
    localStorage.setItem('life-dots-view-mode', viewMode);
  }, [viewMode]);

  const handleDotClick = useCallback((id: number) => {
    if (brushMode === 'edit') {
      setEditingDotId(id);
    } else if (brushMode === 'paint') {
      setDays(prev => prev.map(d => d.id === id ? { ...d, isMarked: true, color: selectedColorId } : d));
    } else if (brushMode === 'erase') {
      setDays(prev => prev.map(d => d.id === id ? { ...d, isMarked: false } : d));
    }
  }, [brushMode, selectedColorId]);

  const updateDot = useCallback((id: number, data: Partial<DayState>) => {
    setDays(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  }, []);

  const handleReset = () => {
    if (confirm('Are you sure you want to clear all data for this view?')) {
      const targetCount = getTargetCount(scale);
      const newDays: DayState[] = Array.from({ length: targetCount }, (_, i) => ({
        id: i,
        color: 'white',
        isMarked: i <= todayIndex,
        dateLabel: getDateLabel(i)
      }));
      setDays(newDays);
    }
  };

  const markedCount = useMemo(() => days.filter(d => d.isMarked).length, [days]);
  const totalCount = days.length;
  
  const percentage = useMemo(() => {
    if (totalCount === 0) return "0.00";
    return ((markedCount / totalCount) * 100).toFixed(2);
  }, [markedCount, totalCount]);

  const daysLeft = totalCount - markedCount;

  const editingDot = useMemo(() => 
    editingDotId !== null ? days.find(d => d.id === editingDotId) : null
  , [editingDotId, days]);

  const title = useMemo(() => {
    if (view === 'journal') return "Journal Entries";
    const year = new Date().getFullYear();
    return scale === '1-year' ? `${year} Timeline` : `${scale.replace('-', ' ').toUpperCase()}`;
  }, [scale, view]);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center p-4 sm:p-6 overflow-hidden selection:bg-white/20 relative">
      <Header title={title} percentage={percentage} />
      
      <main className="flex-1 w-full flex flex-col items-center justify-start min-h-0 py-2 gap-2 relative">
        {view === 'grid' ? (
          <div className="flex-1 w-full overflow-hidden flex flex-col items-center justify-center min-h-0">
            <DotGrid 
              days={days} 
              onDotClick={handleDotClick} 
              scale={scale}
              todayIndex={todayIndex}
              viewMode={viewMode}
            />
          </div>
        ) : (
          <div className="flex-1 w-full overflow-hidden flex flex-col items-center justify-center min-h-0">
            <JournalView 
              days={days} 
              onBack={() => setView('grid')} 
              onEditEntry={(id) => setEditingDotId(id)}
            />
          </div>
        )}
        {view === 'grid' && <StatDisplay daysLeft={daysLeft} />}
      </main>

      <footer className="w-full mt-2 pb-2">
        <Controls 
          scale={scale} 
          setScale={setScale} 
          onReset={handleReset}
          view={view}
          setView={setView}
          selectedColorId={selectedColorId}
          setSelectedColorId={setSelectedColorId}
          brushMode={brushMode}
          setBrushMode={setBrushMode}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </footer>

      {editingDotId !== null && editingDot && (
        <NoteModal 
          dot={editingDot} 
          onClose={() => setEditingDotId(null)} 
          onSave={(data) => updateDot(editingDotId, data)}
        />
      )}
    </div>
  );
};

export default App;
