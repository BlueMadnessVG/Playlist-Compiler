import styles from "./App.module.css";

import { AppRouter } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

import PageAside from "./components/static/aside/pageAside";
import Player from "./components/static/player/player";
import { usePlayerStore } from "./global/music.store";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfiguration } from "./utils/controllers/snakbar.manager";

function App() {
  const { currentMusic } = usePlayerStore((state: any) => state);

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

            {currentMusic.playlist && (
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
