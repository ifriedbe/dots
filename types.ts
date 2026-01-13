
export type ColorOption = {
  id: string;
  name: string;
  value: string; // Tailwind class or hex
  borderColor: string;
};

export interface DayState {
  id: number;
  color: string; // id of the ColorOption
  isMarked: boolean;
  note?: string; // Personal text for the day
  dateLabel?: string; // e.g., "Jan 15"
  date?: string; // ISO string
}

export type GridScale = '1-year' | '2-years' | '3-years' | '5-years';
export type ViewMode = 'simple' | 'advanced';

export interface AppState {
  days: DayState[];
  scale: GridScale;
  selectedColorId: string;
  brushMode: 'paint' | 'erase' | 'edit';
  viewMode: ViewMode;
}
