import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./routerConfig";

import { AnimatePresence } from "framer-motion";

export const AppRouter = () => {
  const location = useLocation();

  //SET THE MAP FOR THE ROUTER
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {routes.map((route: any, index: number) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </AnimatePresence>
  );
};
