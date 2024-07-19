import axios from "axios";
import { MusicModel, PlaylistModel } from "../../models";
import PlaylistStandardization, {
  MusicStandardization,
} from "../../utils/Youtube.standardization";

// REGION: Spotify authorization controllers
const authEndPoint = "https://accounts.google.com/o/oauth2/v2/auth?";
const userScope = ["https://www.googleapis.com/auth/youtube.readonly"];

const clientID = import.meta.env.VITE_YOUTUBE_API_ID; // User credentials
const redirectUri = import.meta.env.VITE_REDIRECT_URI; // Page redirection when login

export async function redirectToYouTubeAuth() {
  //VERIFICATION CODES OF THE USER

  //PARAMS TO ADD TO THE URL
  const params = new URLSearchParams();
  params.append("client_id", clientID); //CLIENT ID
  params.append("redirect_uri", redirectUri); //WHERE IS GOING TO REDIRECT
  params.append("response_type", "token"); //TYPE OF RESPONSE
  params.append("scope", userScope.join(" ")); //WHAT ARE WE GETTING PERMITIOS

  //RELOCATE TO THE SPOTIFY PAGE
  document.location = `${authEndPoint}${params.toString()}`;
}

//REGION: AXIOS CALL
export const apiYouTube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

export async function fetchYouTubeProfile() {
  const result = await apiYouTube("channels", {
    params: { part: "snippet", mine: true },
  });
  return result.data;
}

export async function fetchYoutubePlaylists() {
  const result = await apiYouTube("playlists", {
    params: { part: "snippet", mine: true, maxResults: 10 },
  });

  var data: PlaylistModel[] = [];
  result.data.items.map((item: any) => {
    data.push(PlaylistStandardization(item));
  });

  return data;
}

export async function fetchYoutubeChanel(id: any) {
  const result = await apiYouTube("channels", {
    params: {
      part: "snippet",
      id: id,
    },
  });
  return result.data;
}

export async function fetchYoutubeChannelVideos(id: any) {
  const result = await apiYouTube("search", {
    params: {
      part: "snippet",
      channelId: id,
      type: "video",
      videoCategoryId: 10,
      maxResults: 50,
      order: "viewCount",
    },
  });

  let data: MusicModel[] = [];
  result.data.items.map((item: any) => {
    data.push(MusicStandardization(item, "channelSearch"));
  });

  return data;
}

export async function fetchYoutubeVideo(id: any) {
  const result = await apiYouTube("videos", {
    params: {
      part: "snippet, contentDetails",
      id: id,
    },
  });

  console.log(result.data);

  return result.data;
}

export async function fetchYoutubeChanelPlaylists(id: any) {
  const result = await apiYouTube("playlists", {
    params: {
      part: "snippet",
      channelId: id,
      maxResults: 50,
    },
  });

  let data: PlaylistModel[] = [];
  result.data.items.map((item: any) => {
    data.push(PlaylistStandardization(item));
  });

  return data;
}

export async function fetchYoutubeChanelRecommendation() {
  const result = await apiYouTube("playlists", {
    params: {
      part: "snippet",
      channelId: "UCUT0DldFAP5KPmBzIhmkCig",
    },
  });

  console.log(result);
}

export async function fetchYoutubePlaylistId(id: any) {
  const result = await apiYouTube("playlists", {
    params: {
      part: "snippet",
      id: id,
    },
  });
  return result.data;
}

export async function fetchYoutubePlaylistsItems(id: any) {
  const result = await apiYouTube("playlistItems", {
    params: { part: "snippet", maxResults: 50, playlistId: id },
  });

  let data: MusicModel[] = [];
  result.data.items.map((item: any) => {
    data.push(MusicStandardization(item, "playlistSearch"));
  });

  return data;
}
