import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  isAll: true,
  isMusic: false,
  isPlaylist: false,
  setAll: (isAll: any) => set({ isAll }),
  setMusic: (isMusic: any) => set({ isMusic }),
  setPlaylist: (isPlaylist: any) => set({ isPlaylist }),
}));
