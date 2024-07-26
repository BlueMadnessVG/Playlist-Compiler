import { create } from "zustand";
import { MusicModel } from "../models";

export const useArtistStore = create((set) => ({
  artistInfo: null,
  artistSongs: null,
  artistPlaylist: null,
  setArtistInfo: (artistInfo: any) => set({ artistInfo }),
  setArtistSongs: (artistSongs: MusicModel) => set({ artistSongs }),
  setArtistPlaylist: (artistPlaylist: any) => set({ artistPlaylist }),
}));
