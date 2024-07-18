import { PlaylistModel, MusicModel } from "../models";

export function PlaylistStandardization(playlist: any) {
  let data: PlaylistModel = {
    playlist_id: playlist.id,
    title: playlist.snippet.title,
    creator: playlist.snippet.channelTitle,
    thumbnails: {
      medium: playlist.snippet.thumbnails.medium.url,
      high: playlist.snippet.thumbnails.high.url,
    },
    created_date: playlist.snippet.publishedAt,
  };

  return data;
}

export function MusicStandardization(music: any, type: string) {
  let data: MusicModel = {
    music_id:
      type == "playlistSearch"
        ? music.snippet.resourceId.videoId
        : music.id.videoId,
    artist: {
      id:
        type == "playlistSearch"
          ? music.snippet.videoOwnerChannelId
          : music.snippet.channelId,
      title:
        type == "playlistSearch"
          ? music.snippet.videoOwnerChannelTitle
          : music.snippet.channelTitle,
    },
    title: music.snippet.title,
    thumbnails: {
      medium: music.snippet.thumbnails.medium.url,
      high: music.snippet.thumbnails.high.url,
    },
    published_at: music.snippet.publishedAt,
  };

  return data;
}

export default PlaylistStandardization;
