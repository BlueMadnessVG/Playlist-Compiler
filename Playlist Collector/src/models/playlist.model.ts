export interface PlaylistModel {
  playlist_id: string;
  creator: string;
  title: string;
  thumbnails: { medium: string; high: string };
  created_date: string;
}
