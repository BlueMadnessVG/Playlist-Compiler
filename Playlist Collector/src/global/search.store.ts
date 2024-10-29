import { create } from "zustand";
import { ArtistModel } from "../models/Artist.model";
import { MusicModel } from "../models";

export const useSearchStore = create((set) => ({
  search: "",
  artistsSearch: [],
  musicSearch: [],
  playlistSearch: [],
  setSearch: (search: string) => set({ search }),
  setArtistsSearch: (artistsSearch: ArtistModel) => set({ artistsSearch }),
  setMusicSearch: (musicSearch: MusicModel) => set({ musicSearch }),
  setPlaylistSearch: (playlistSearch: MusicModel) => set({ playlistSearch }),
}));
