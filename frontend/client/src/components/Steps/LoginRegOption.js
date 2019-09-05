import React from "react";
import Axios from "axios";

export default function LoginRegOption(props) {
  return (
    <main>
      <section className="">
        <ul>
          <li><button onClick={props.onLogin}>Login</button></li>
          <li><button onClick={props.onRegister}>Register</button></li>
        </ul>
      </section>
      <footer>
      </footer>
    </main>
  );
}