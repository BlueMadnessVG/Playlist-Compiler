export interface PlaylistModel {
  id: string;
  creator: string;
  title: string;
  thumbnails: { medium: string; high: string, default: string };
  created_date: string;
}
