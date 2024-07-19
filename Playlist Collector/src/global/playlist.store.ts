import { create } from "zustand";
import { MusicModel } from "../models";

export const usePlaylistStore = create((set) => ({
  playlistId: null,
  playlistItems: [],
  setPlaylistId: (playlistId: number) => set({ playlistId }),
  setPlaylistItems: (playlistItems: MusicModel) => set({ playlistItems }),
}));
