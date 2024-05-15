import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Providers from "@/provider/Poviders";

export default function Home() {
  return (
    <Providers>
      <Login />
    </Providers>
  );
}
