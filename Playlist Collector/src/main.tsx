import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AxiosInterceptor } from "./interceptor/axios.interceptor.ts";

AxiosInterceptor();

/* <React.StrictMode> */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_YOUTUBE_API_ID}>
    <App />
  </GoogleOAuthProvider>
);
