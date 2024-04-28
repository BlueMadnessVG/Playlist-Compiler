import axios from "axios";

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
const apiYouTube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

export function setYouTubeClientToken(token: string) {
  apiYouTube.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
}

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
  return result.data;
}

export async function fetchYoutubePlaylistsItems(id: any) {
  const result = await apiYouTube("playlistItems", {
    params: { part: "snippet", maxResults: 50, playlistId: id },
  });
  return result.data;
}
