
import { ColorOption } from './types';

export const COLORS: ColorOption[] = [
  { id: 'white', name: 'White', value: 'bg-white', borderColor: 'border-white' },
  { id: 'gray', name: 'Gray', value: 'bg-gray-500', borderColor: 'border-gray-500' },
  { id: 'red', name: 'Urgent', value: 'bg-red-500', borderColor: 'border-red-500' },
  { id: 'blue', name: 'Deep Focus', value: 'bg-blue-500', borderColor: 'border-blue-500' },
  { id: 'green', name: 'Growth', value: 'bg-green-500', borderColor: 'border-green-500' },
  { id: 'yellow', name: 'Ideas', value: 'bg-yellow-400', borderColor: 'border-yellow-400' },
  { id: 'purple', name: 'Reflection', value: 'bg-purple-500', borderColor: 'border-purple-500' },
  { id: 'pink', name: 'Relationships', value: 'bg-pink-500', borderColor: 'border-pink-500' },
];

export const INITIAL_YEAR_DAYS = 365;
export const TWO_YEARS_DAYS = 730;
export const THREE_YEARS_DAYS = 1095;
export const FIVE_YEARS_DAYS = 1825;
