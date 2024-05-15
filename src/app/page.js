"use client";
import Login from "@/pages/Login";
import Providers from "@/provider/Poviders";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <Providers>
      <Login />
    </Providers>
  );
}
