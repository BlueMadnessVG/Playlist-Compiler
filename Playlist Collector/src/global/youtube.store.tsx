import { create } from "zustand";

export const useYoutubeStore = create((set) => ({
  youtubeToken: false,
  youtubeId: null,
  youtubePlaylist: [],
  setYoutubeToken: (youtubeToken: any) => set({ youtubeToken }),
  setYoutubeId: (youtubeId: any) => set({ youtubeId }),
  setYoutubePlaylist: (youtubePlaylist: any) => set({ youtubePlaylist }),
}));
