export interface MusicModel {
  music_id: string;
  artist: {
    id: string;
    title: string;
  };
  title: string;
  published_at: string;
  thumbnails: { medium: string; high: string };
}
