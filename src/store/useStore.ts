import { create } from 'zustand';
import { Theme } from '../types';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useStore = create<AppState>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
