import React from 'react';
import Axios from 'axios';

export default function Community(props) {

  return (
    <main>
      <section className="">
        <h1>Community</h1>
        <p>Great! You are part of neighbourhood Medieval!</p>
      </section>
      <footer>
      <button onClick={props.onBack} className="back-btn">Back</button>
      <button onClick={props.onNext} className="next-btn">Next</button>
      </footer>
    </main>
  );
}