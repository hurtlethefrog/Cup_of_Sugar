import React from "react";
import Axios from "axios";

export default function LoginRegOption(props) {
  return (
    <main>
      <section className="">
        <button className="btn-login" onClick={props.onLogin}>Login</button>
        <button className="btn-register" onClick={props.onRegister}>Register</button>
      </section>
      <footer>
      </footer>
    </main>
  );
}