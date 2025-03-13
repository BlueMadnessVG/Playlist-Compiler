import { SnackbarProvider } from "notistack";
import App from "./App";
import { SnackbarUtilitiesConfiguration } from "./utils/controllers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./ErrorBoundary";

export default function AppHookContainer() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_YOUTUBE_API_ID}>
        <SnackbarProvider>
          <SnackbarUtilitiesConfiguration />
          <App />
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}
