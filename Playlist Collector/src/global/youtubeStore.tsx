import { create } from "zustand";

export const useYoutubeStore = create((set) => ({
  youtubeToken: false,
  youtubePlaylist: [],
  setYoutubeToken: (youtubeToken: any) => set({ youtubeToken }),
  setYoutubePlaylist: (youtubePlaylist: any) => set({ youtubePlaylist }),
}));
