import styles from "./App.module.css";

import { AppRouter } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

import {PageAside} from "./components/static/aside";
import { Player } from "./components/static/player";
import { usePlayerStore } from "./global/music.store";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfiguration } from "./utils/controllers/snakbar.manager";
import { AnimatePresence } from "framer-motion";

function App() {
  const { currentMusic } = usePlayerStore((state: any) => state);

  return (
    <>
      <SnackbarProvider>
        <SnackbarUtilitiesConfiguration />
        <div id={styles.app} className="relative h-screen  overflow-hidden">
          <Router>
            <aside className="  flex-col flex overflow-y-auto overflow-x-hidden w-auto">
              <PageAside />
            </aside>

            <main className=" flex overflow-y-auto overflow-x-hidden w-full mt-2">
              <AppRouter />
            </main>

            <AnimatePresence mode="wait" initial={true}>
              {currentMusic.playlist && <Player />}
            </AnimatePresence>
          </Router>
        </div>
      </SnackbarProvider>
    </>
  );
}

export default App;
