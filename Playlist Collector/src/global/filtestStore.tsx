import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  isAll: true,
  isSpotify: false,
  isYoutube: false,
  setAll: (isAll: any) => set({ isAll }),
  setSpotify: (isSpotify: any) => set({ isSpotify }),
  setYoutube: (isYoutube: any) => set({ isYoutube }),
}));
