import { Route, Routes, useLocation } from "react-router-dom";
import { PublicRoutes } from "./router.config";

import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../components/home/Home"));
const PlayList = lazy(() => import("../components/playlist/PlayList"));
const ArtistSearch = lazy(() => import("../components/artist/artistSearch"));
const Search = lazy(() => import("../components/search/Search"));

export const AppRouter = () => {
  const location = useLocation();

  //SET THE MAP FOR THE ROUTER
  return (
    <Suspense fallback={<> LOADING... </>}>
      <AnimatePresence mode="wait" initial={true}>
        <Routes location={location} key={location.pathname}>
          <Route path={PublicRoutes.HOME} element={<Home />} />
          <Route path={PublicRoutes.PLAYLIST} element={<PlayList />} />
          <Route path={PublicRoutes.ARTIST} element={<ArtistSearch />} />
          <Route path={PublicRoutes.SEARCH} element={<Search />} />

          <Route path="*" element={<div> NOT FOUND </div>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};
