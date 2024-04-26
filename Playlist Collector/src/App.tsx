import styles from "./App.module.css";

import { Suspense, useEffect, useState } from "react";
import {
  fetchSpotifyProfile,
  setSpotifyClientToken,
} from "./services/SpotifyService";
import {
  fetchYouTubeProfile,
  redirectToYouTubeAuth,
  setYouTubeClientToken,
} from "./services/YoutubeService";
import { AppRouter } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

import PageAside from "./components/static/aside/pageAside";
import Player from "./components/static/player/player";
import { Home } from "./pages";

function App() {
  /*   const [token, setToken] = useState("");
  const [image, setImage] = useState("https://vitejs.dev");

  useEffect(() => {
    const StorageToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    //window.location.hash = "";

    if (!StorageToken && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setSpotifyClientToken(_token);
      setYouTubeClientToken(_token);
    } else {
      setToken(StorageToken || "");
      setSpotifyClientToken(StorageToken || "");
      setYouTubeClientToken(StorageToken || "");
    }

    async function getUser() {
      const youtube = await fetchYouTubeProfile();
      console.log(youtube);
      const response = await fetchSpotifyProfile();
      //setImage(response.images[1].url);
      setImage(youtube.items[0].snippet.thumbnails.default.url);
    }

    getUser();
  }, []);
 */
  return (
    <>
      <div id={styles.app} className="relative h-screen gap-2 ">
        <Router>
          <aside className="[grid-area:aside]  flex-col flex overflow-y-auto">
            <PageAside />
          </aside>

          <main className="[grid-area:main] flex overflow-y-auto overflow-x-hidden w-full mt-2">
            <Suspense fallback={<> esta cargando que no vez </>}>
              <AppRouter />
            </Suspense>
          </main>

          <footer className="[grid-area:player] bg-zinc-900 ">
            <Player />
          </footer>
        </Router>
      </div>
    </>
  );
}

export default App;
