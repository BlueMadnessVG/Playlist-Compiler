import ReactDOM from "react-dom/client";
import "./index.css";
import { AxiosInterceptor } from "./interceptor/axios.interceptor.ts";
import { StrictMode } from "react";
import AppHookContainer from "./AppHookContainer.tsx";

AxiosInterceptor();

/* <React.StrictMode> */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>

        <AppHookContainer />

  </StrictMode>
);
