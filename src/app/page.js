import Image from "next/image";
import styles from "./page.module.css";
import Providers from "@/provider/Poviders";

export default function Home() {
  return (
    <Providers>
      <Login />
    </Providers>
  );
}
