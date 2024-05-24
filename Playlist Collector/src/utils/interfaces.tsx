export interface PlaylistData {
  playlist_id: string;
  creator: string;
  title: string;
  thumbnails: { medium: string; high: string };
  created_date: string;
}

export interface MusicData {
  music_id: string;
  artist: {
    id: string;
    title: string;
  };
  title: string;
  published_at: string;
  thumbnails: { medium: string; high: string };
}

export default PlaylistData;
