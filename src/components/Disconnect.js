import { UserContext } from "@/provider/UserProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Disconnect() {
  const { user, handleDisconnect } = useContext(UserContext);

  const router = useRouter();
  const notify = (message) => toast(`${message}`);

  useEffect(() => {
    if (!user) router.push("/Login");
  }, [user]);

  return (
    <>
      <button onClick={() => handleDisconnect(notify)}>disconnect</button>
      <ToastContainer />
    </>
  );
}
