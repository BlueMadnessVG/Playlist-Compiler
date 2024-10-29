import { create } from "zustand";
import { MusicModel } from "../models";

export const useArtistStore = create((set) => ({
  artistInfo: null,
  artistSongs: null,
  songsPager: null,
  artistPlaylist: null,
  setArtistInfo: (artistInfo: any) => set({ artistInfo }),
  setArtistSongs: (artistSongs: MusicModel) => set({ artistSongs }),
  setSongsPager: (songsPager: any) => set({ songsPager }),
  setArtistPlaylist: (artistPlaylist: any) => set({ artistPlaylist }),
  updateArtistSongs: (newSongs: MusicModel[]) =>
    set((state: any) => ({
      artistSongs: [...state.artistSongs, ...newSongs],
    })),
}));
