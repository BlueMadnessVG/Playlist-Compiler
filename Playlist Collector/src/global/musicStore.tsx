import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  musicType: "youtube",
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  setVolume: (volume: any) => set({ volume }),
  setIsPlaying: (isPlaying: any) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: any) => set({ currentMusic }),
}));
