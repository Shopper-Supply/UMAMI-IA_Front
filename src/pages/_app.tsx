import Providers from "@/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </Providers>
  );
}
