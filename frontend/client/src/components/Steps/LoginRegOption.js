import React from "react";
import Axios from "axios";

export default function LoginRegOption(props) {
  return (
    <main className="">
      <section className="">
        <h1>LoginRegOption</h1>
        <button onClick={() => props.onRegister} type="submit">
          Next
        </button>
      </section>
    </main>
  );
}
