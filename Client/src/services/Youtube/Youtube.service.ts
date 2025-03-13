import axios from "axios";
import { MusicModel, PlaylistModel } from "../../models";
import PlaylistStandardization, {
  ArtistStandardization,
  MusicStandardization,
} from "../../utils/controllers/Youtube.standardization";

// REGION: Spotify authorization controllers
const authEndPoint = "https://accounts.google.com/o/oauth2/v2/auth?";
const userScope = ["https://www.googleapis.com/auth/youtube.readonly"];

const clientID = import.meta.env.VITE_YOUTUBE_API_ID; // User credentials
const clientSecret = import.meta.env.VITE_YOUTUBE_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_REDIRECT_URI; // Page redirection when login

export async function redirectToYouTubeAuth() {
  //VERIFICATION CODES OF THE USER

  //PARAMS TO ADD TO THE URL
  const params = new URLSearchParams();
  params.append("client_id", clientID); //CLIENT ID
  params.append("redirect_uri", redirectUri); //WHERE IS GOING TO REDIRECT
  console.log("redirection: ", redirectUri);
  params.append("response_type", "token"); //TYPE OF RESPONSE
  params.append("scope", userScope.join(" ")); //WHAT ARE WE GETTING PERMISSION

  //RELOCATE TO THE SPOTIFY PAGE
  document.location = `${authEndPoint}${params.toString()}`;
}

export async function refreshToken() {
  const params = new URLSearchParams();
  params.append("client_id", clientID);
  params.append("client_secret", clientSecret);
  params.append("code", localStorage.getItem("YouTube_token") || "");
  params.append("grant_type", "authorization_code"); //WHAT ARE WE GETTING PERMITIOS
  params.append("redirect_uri", redirectUri); //WHERE IS GOING TO REDIRECT

  axios({
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      client_id: clientID,
      client_secret: clientSecret,
      refresh_token: localStorage.getItem("YouTube_token"),
      grant_type: "refresh_token",
    },
  }).then((response) => {
    console.log(response);
    window.localStorage.setItem("YouTube_token", response.data.access_token);

    const expiresValue = response.data.expires_in;
    const delay = (expiresValue ? parseInt(expiresValue, 10) : 2500) * 10;
    console.log(delay);
    setInterval(refreshToken, delay);
  });
}

//REGION: AXIOS CALL
export const apiYouTube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

export async function fetchYouTubeProfile(signal?: AbortSignal) {
  const result = await apiYouTube("channels", {
    params: { part: "snippet", mine: true },
    signal,
  });
  return result.data;
}

export async function fetchYoutubePlaylists(signal?: AbortSignal) {
  const result = await apiYouTube("playlists", {
    params: { part: "snippet", mine: true, maxResults: 10 },
    signal,
  });

  var data: PlaylistModel[] = [];
  result.data.items.map((item: any) => {
    data.push(PlaylistStandardization(item, "artist"));
  });

  return data;
}

export async function fetchYoutubeChanel(id: any, signal?: AbortSignal) {
  const result = await apiYouTube("channels", {
    params: {
      part: "snippet",
      id: id,
    },
    signal,
  });
  return result.data;
}

export async function fetchYoutubeChannelVideos(
  id: any,
  resultPerPage: number,
  pageToken?: string,
  signal?: AbortSignal
) {
  const result = await apiYouTube("search", {
    params: {
      part: "snippet",
      channelId: id,
      type: "video",
      videoCategoryId: 10,
      maxResults: resultPerPage,
      order: "viewCount",
      pageToken: pageToken || "",
    },
    signal,
  });

  let data: MusicModel[] = [];
  result.data.items.map((item: any) => {
    data.push(MusicStandardization(item, "channelSearch"));
  });

  return {
    pageInfo: {
      ...result.data.pageInfo,
      nextPageToken: result.data.nextPageToken || "",
    },
    items: data,
  };
}

export async function fetchYoutubeVideo(id: any, signal?: AbortSignal) {
  const result = await apiYouTube("videos", {
    params: {
      part: "snippet, contentDetails",
      id: id,
    },
    signal
  });

  return result.data;
}

export async function fetchYoutubeChanelPlaylists(id: any, signal?: AbortSignal) {
  const result = await apiYouTube("playlists", {
    params: {
      part: "snippet",
      channelId: id,
      maxResults: 50,
    },
    signal
  });

  let data: PlaylistModel[] = [];
  result.data.items.map((item: any) => {
    data.push(PlaylistStandardization(item, "artist"));
  });

  return data;
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

export async function fetchYoutubePlaylistsItems(
  id: any,
  signal?: AbortSignal
) {
  const result = await apiYouTube("playlistItems", {
    params: { part: "snippet", maxResults: 50, playlistId: id },
    signal,
  });

  let data: MusicModel[] = [];
  result.data.items.map((item: any) => {
    data.push(MusicStandardization(item, "playlistSearch"));
  });

  return data;
}

export async function fetchSearch(
  q: string,
  resultPerPage: number,
  type: string,
  pageToken?: string,
  signal?: AbortSignal
) {
  const result = await apiYouTube("search", {
    params: {
      part: "snippet",
      q: q,
      type: type,
      maxResults: resultPerPage,
      pageToken: pageToken || "",
    },
    signal,
  });

  let data: any[] = [];
  result.data.items.map((item: any) => {
    type === "channel"
      ? data.push(ArtistStandardization(item))
      : type === "video"
      ? data.push(MusicStandardization(item, "channelSearch"))
      : data.push(PlaylistStandardization(item, "search"));
  });

  return {
    pageInfo: {
      ...result.data.pageInfo,
      nextPageToken: result.data.nextPageToken || "",
    },
    items: data,
  };
}
