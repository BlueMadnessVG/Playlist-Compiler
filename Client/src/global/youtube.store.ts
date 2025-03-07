import { create } from "zustand";

export const useYoutubeStore = create((set) => ({
  youtubeToken: false,
  youtubeId: null,
  youtubeProfileThumb: null,
  youtubePlaylist: [],
  youtubeLoading: false,
  setYoutubeToken: (youtubeToken: any) => set({ youtubeToken }),
  setYoutubeId: (youtubeId: any) => set({ youtubeId }),
  setYoutubeProfileThumb: (youtubeProfileThumb: any) =>
    set({ youtubeProfileThumb }),
  setYoutubePlaylist: (youtubePlaylist: any) => set({ youtubePlaylist }),
  setYoutubeLoading: (youtubeLoading: boolean) => set({ youtubeLoading })
}));
