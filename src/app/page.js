"use client";
import Login from "@/pages/Login";
import Providers from "@/provider/Poviders";
import UserProvider from "@/provider/UserProvider";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isDeconnected } = useContext(UserProvider);

  const notify = (message) => toast(`${message}`);

  useEffect(() => {
    if (isDeconnected) {
      notify("You're disconnected");
      console.log("notif in page");
    }
  }, [isDeconnected]);

  return (
    <Providers>
      <Login />
      <ToastContainer />
    </Providers>
  );
}
