import React from 'react';
import Axios from 'axios';

export default function Community(props) {

  return (
    <main className="">
      <section className="">
      <h1>Community</h1>
      <p>Great! You are part of neighbourhood Medieval!</p>
      <button onClick={props.onBack}>Back</button>
      <button onClick={props.onNext}>Next</button>
      </section>
    </main>
  );
}