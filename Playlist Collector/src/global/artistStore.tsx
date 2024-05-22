import { create } from "zustand";

export const useArtistStore = create((set) => ({
  artistInfo: null,
  artistSongs: null,
  artistPlaylist: null,
  setArtistInfo: (artistInfo: any) => set({ artistInfo }),
  setArtistSongs: (artistSongs: any) => set({ artistSongs }),
  setArtistPlaylist: (artistPlaylist: any) => set({ artistPlaylist }),
}));
