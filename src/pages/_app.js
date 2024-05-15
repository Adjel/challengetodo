import Providers from "@/provider/Poviders";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <Component {...pageProps} />
      </Providers>
      <ToastContainer />
    </>
  );
}

export default MyApp;
