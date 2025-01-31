import { PlaylistModel, MusicModel } from "../../models";
import { ArtistModel } from "../../models/Artist.model";

export function PlaylistStandardization(playlist: any, type: string) {
  let data: PlaylistModel = {
    playlist_id: type === "artist" ? playlist.id : playlist.id.playlistId,
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

export function ArtistStandardization(channel: any) {
  let data: ArtistModel = {
    channel_id: channel.snippet.channelId,
    title: channel.snippet.title,
    description: channel.snippet.description,
    published_at: channel.snippet.publishedAt,
    thumbnails: {
      medium: channel.snippet.thumbnails.medium.url,
      high: channel.snippet.thumbnails.high.url,
    },
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
