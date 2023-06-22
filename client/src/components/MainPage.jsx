import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";

export default function MainPage() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);
  return <div>{token ? <Home /> : <Login />}</div>;
}
