import { PlaylistModel, MusicModel, ArtistInfoModel } from "../../models";
import { ArtistModel } from "../../models/Artist.model";

export function PlaylistStandardization(playlist: any, type: string) {
  let data: PlaylistModel = {
    id: type === "artist" ? playlist.id : playlist.id.playlistId,
    title: playlist.snippet.title,
    creator: playlist.snippet.channelTitle,
    thumbnails: {
      medium: playlist.snippet.thumbnails.medium.url,
      high: playlist.snippet.thumbnails.high.url,
      default: playlist.snippet.thumbnails.default.url
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

export function ArtistInfoStandardization(artist: any) {
  let data: ArtistInfoModel = {
    id: artist.id,
    title: artist.snippet.title,
    description: artist.snippet.description,
    thumbnails : {
      high: artist.snippet.thumbnails.high.url,
      medium: artist.snippet.thumbnails.medium.url,
      default: artist.snippet.thumbnails.default.url
    }
  }

  return data;
}


export default PlaylistStandardization;
