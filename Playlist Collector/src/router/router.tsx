import { Route, Routes, useLocation } from "react-router-dom";
import { PublicRoutes } from "./router.config";

import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import RouteWithNotFound from "../utils/Page utils/RouteWithNotFound.utility";

const Home = lazy(() => import("../components/home/Home"));
const PlayList = lazy(() => import("../components/playlist/playList"));
const ArtistSearch = lazy(() => import("../components/artist/artistSearch"));

export const AppRouter = () => {
  const location = useLocation();

  //SET THE MAP FOR THE ROUTER
  return (
    <Suspense fallback={<> LOADING... </>}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path={PublicRoutes.HOME} element={<Home />} />
          <Route path={PublicRoutes.PLAYLIST} element={<PlayList />} />
          <Route path={PublicRoutes.ARTIST} element={<ArtistSearch />} />

          <Route path="*" element={<div> NOT FOUND </div>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};
