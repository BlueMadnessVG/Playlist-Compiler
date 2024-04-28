import PlayList from "../components/playlist/playList";
import { Home } from "../pages";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "playlist/:type/:id",
    element: <PlayList />,
  },
];
