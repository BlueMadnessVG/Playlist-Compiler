import { create } from "zustand";

export const useSpotifyStore = create((set) => ({
  spotifyToken: false,
  spotifyId: null,
  spotifyPlaylist: [],
  setSpotifyToken: (spotifyToken: any) => set({ spotifyToken }),
  setSpotifyId: (spotifyId: any) => set({ spotifyId }),
  setSpotifyPlaylist: (spotifyPlaylist: any) => set({ spotifyPlaylist }),
}));
