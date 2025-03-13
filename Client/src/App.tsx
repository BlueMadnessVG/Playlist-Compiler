import styles from "./App.module.css";

import { AppRouter } from "./router/router";
import { BrowserRouter } from "react-router-dom";

import { PageAside } from "./components/static/aside";
import { Player } from "./components/static/player";
import { usePlayerStore } from "./global/music.store";
import { AnimatePresence } from "framer-motion";

function App() {
  const { currentMusic } = usePlayerStore((state: any) => state);

  return (
    <>
      <div id={styles.app} className="relative h-screen  overflow-hidden">
        <BrowserRouter>
          <aside className="  flex-col flex overflow-y-auto overflow-x-hidden w-auto">
            <PageAside />
          </aside>

          <main className=" flex overflow-y-auto overflow-x-hidden w-full mt-2">
            <AppRouter />
          </main>

          <AnimatePresence mode="wait" initial={true}>
            {currentMusic.playlist && <Player />}
          </AnimatePresence>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
