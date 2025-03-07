import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  playlistType: "youtube",
  currentMusic: {},
  volume: 1,
  setVolume: (volume: any) => set({ volume }),
  setIsPlaying: (isPlaying: any) => set({ isPlaying }),
  setPlaylistType: (playlistType: any) => set({ playlistType }),
  setCurrentMusic: (currentMusic: any) => set({ currentMusic }),
  updateCurrentMusicSongs: (songs: any) =>
    set((state: any) => ({
      currentMusic: { ...state.currentMusic, songs },
    })),
}));
