"use client";
import { UserContext } from "@/provider/UserProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Register() {
  const [userAccount, setUserAccount] = useState({
    email: "",
    password: "",
  });

  const { user, handleRegsiter } = useContext(UserContext);

  const router = useRouter();

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

  function handleOnSubmit(event) {
    event.preventDefault();
    handleRegsiter(userAccount);
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
    </>
  );
}
