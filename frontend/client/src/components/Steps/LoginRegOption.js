import React from "react";
import Axios from "axios";

export default function LoginRegOption(props) {
  console.log("props:", props)
  return (
    <main className="">
      <section className="">
        <button onClick={props.onLogin}>Login</button>
        <button onClick={props.onRegister}>Register</button>
      </section>
    </main>
  );
}
