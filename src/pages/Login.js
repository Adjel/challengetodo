"use client";
import Link from "next/link";
import { UserContext } from "@/provider/UserProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [userAccount, setUserAccount] = useState({
    email: "",
    password: "",
  });

  const { user, handleLogIn } = useContext(UserContext);

  const router = useRouter();

  const notify = (message) => toast(`${message}`);

  useEffect(() => {
    if (user) router.push("/TodoList");
  }, [user]);

  function handleOnChange(event) {
    const { value, name } = event.target;
    setUserAccount({
      ...userAccount,
      [name]: value,
    });
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    // TODO: Pass handleLogIn to the bottom to this function
    await handleLogIn(userAccount, notify);
    if (userAccount.email === "") return notify("You need an email");
    if (userAccount.password === "") return notify("You need a password");
  }

  return (
    <>
      <form>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userAccount.email}
          onChange={(event) => handleOnChange(event)}
        ></input>
        <label htmlFor="password">email</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userAccount.password}
          onChange={(event) => handleOnChange(event)}
        ></input>
        <button type="submit" onClick={(event) => handleOnSubmit(event)}>
          Register
        </button>
      </form>
      <Link href="Register/">Not an account ? Sign up in here</Link>
      <ToastContainer />
    </>
  );
}
