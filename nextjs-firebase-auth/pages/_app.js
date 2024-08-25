import { StrictMode } from "react";
import "../styles/globals.css";
import { AuthProvider } from "@/utils/auth";
import { ToastProvider } from "@/utils/ToastProvider";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <AuthProvider>
        <ToastProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </ToastProvider>
      </AuthProvider>
    </StrictMode>
  );
}

export default MyApp;
