import axios from "axios";

// REGION: Spotify authorization controllers
const authEndPoint = "https://accounts.spotify.com/authorize?";
const userScope = ["user-library-read", "playlist-modify-private"];

const clientID = import.meta.env.VITE_SPOTIFY_API_ID; // User credentials
const redirectUri = import.meta.env.VITE_REDIRECT_URI; // Page redirection when login

//REGION: END POINT FOR SPOTIFY AUTHORIZATION CONTROLLER
//FUNCTION TO REDIRECT TO SPOTIFY AUTHENTICATION PAGE
export async function redirectToSpotifyAuth() {
  //VERIFICATION CODES OF THE USER
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  window.localStorage.setItem("verifier", verifier);

  //PARAMS TO ADD TO THE URL
  const params = new URLSearchParams();
  params.append("client_id", clientID); //CLIENT ID
  params.append("response_type", "token"); //TYPE OF RESPONSE
  params.append("redirect_uri", redirectUri); //WHERE IS GOING TO REDIRECT
  params.append("scope", userScope.join(" ")); //WHAT ARE WE GETTING PERMITIOS
  params.append("code_challenge_method", "S256"); //LAYER OF SECURITY
  params.append("code_challenge", challenge); //ANOTHER LAYER OF SECURITY

  //RELOCATE TO THE SPOTIFY PAGE
  document.location = `${authEndPoint}${params.toString()}`;
}

//GENERATE A RANDOM CODE TO VERIFY IF OUR REQUEST IS AUTHENTIC
function generateCodeVerifier(length: number) {
  let text = ""; //TEXT GENERATED
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; //POSIBLES CHARACTERS TO GENERATE THE TEXT

  //LOOP TO GENERATE A RANDOM TEXT
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

//GENERATE A ENCODE TEXT
async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier); //ENCODE THE TEXT PASSED
  const digest = await window.crypto.subtle.digest("SHA-256", data); //ENCRYPT THE CODE USING SHA256 ALGORITHM
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)])) //TRANSFORM THE CODE IN BASE-64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

//REGION: AXIOS CALL
const apiClient = axios.create({ baseURL: "https://api.spotify.com/v1/" });

export function setSpotifyClientToken(token: string) {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
}

export async function fetchSpotifyProfile(): Promise<any> {
  try {
    const result = await apiClient.get("me");
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSpotifyUserPlaylist() {
  try {
    const result = await apiClient.get("me/playlists");
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}
