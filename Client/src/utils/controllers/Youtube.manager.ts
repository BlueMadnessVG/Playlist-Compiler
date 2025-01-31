import { redirectToYouTubeAuth } from "../../services/Youtube/Youtube.service";

export function handleYoutubeLogin() {
  redirectToYouTubeAuth();
}

export function handleYoutubeLogout() {
  window.localStorage.removeItem("YouTube_token");
  window.location.href = "/";
}

export default handleYoutubeLogin;
