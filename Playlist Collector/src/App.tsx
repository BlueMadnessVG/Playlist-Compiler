import styles from "./App.module.css";

import { Suspense } from "react";
import { AppRouter } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

import PageAside from "./components/static/aside/pageAside";
import Player from "./components/static/player/player";

function App() {
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

          <footer className="[grid-area:player] ">
            <Player />
          </footer>
        </Router>
      </div>
    </>
  );
}

export default App;
