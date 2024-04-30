import { create } from "zustand";

export const useSpotifyStore = create((set) => ({
  spotifyToken: false,
  spotifyPlaylist: [],
  setSpotifyToken: (spotifyToken: any) => set({ spotifyToken }),
  setSpotifyPlaylist: (spotifyPlaylist: any) => set({ spotifyPlaylist }),
}));
