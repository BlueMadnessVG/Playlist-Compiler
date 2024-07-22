import styles from "./App.module.css";

import { useEffect } from "react";
import { AppRouter } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

import PageAside from "./components/static/aside/pageAside";
import Player from "./components/static/player/player";
import { usePlayerStore } from "./global/music.store";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfiguration } from "./utils/snakbar.manager";
import { useYoutubeStore } from "./global";
import { refreshToken } from "./services/Youtube/Youtube.service";

function App() {
  const { currentMusic } = usePlayerStore((state: any) => state);
  const { youtubeToken, setYoutubeToken } = useYoutubeStore(
    (state: any) => state
  );

  useEffect(() => {
    if (youtubeToken) {
      const expiresValue = localStorage.getItem("expires_in");
      const delay = expiresValue ? parseInt(expiresValue, 10) : 2500;

      setTimeout(refreshToken, delay);
    }
  }, [youtubeToken]);

  return (
    <>
      <SnackbarProvider>
        <SnackbarUtilitiesConfiguration />
        <div id={styles.app} className="relative h-screen gap-2 ">
          <Router>
            <aside className="[grid-area:aside]  flex-col flex overflow-y-auto">
              <PageAside />
            </aside>

            <main className="[grid-area:main] flex overflow-y-auto overflow-x-hidden w-full mt-2">
              <AppRouter />
            </main>

            {currentMusic.playList && (
              <footer>
                <Player />
              </footer>
            )}
          </Router>
        </div>
      </SnackbarProvider>
    </>
  );
}

export default App;
