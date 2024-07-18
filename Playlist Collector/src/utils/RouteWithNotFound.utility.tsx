import { Route, Routes, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function RouteWithNotFound({ children }: Props) {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {children}
      <Route path="*" element={<div> NOT FOUND </div>} />
    </Routes>
  );
}

export default RouteWithNotFound;
