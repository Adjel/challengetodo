"use client";
import { UserContext } from "@/provider/UserProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [userAccount, setUserAccount] = useState({
    email: "",
    password: "",
  });

  const { user, handleRegsiter } = useContext(UserContext);

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
    // TODO: Pass handleRegister to the bottom to this function
    await handleRegsiter(userAccount, notify);
    if (userAccount.email === "") return notify("You need an email");
    if (userAccount.password === "") return notify("You need a password");
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!emailRegex.test(userAccount.email)) return notify("invalid email");
    if (!passwordRegex.test(userAccount.password))
      return notify(
        "Your password need at least one Uppercase, one undercase, one special chart and one number, and at least 8 chars in total"
      );
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
      <Link href="Login/">Already an account ? Log in here</Link>;
      <ToastContainer />
    </>
  );
}
