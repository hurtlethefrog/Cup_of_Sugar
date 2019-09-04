import React from 'react';
import Axios from 'axios';

export default function Ready(props) {

  return (
    <main>
      <section className="">
        <h1>All ready!</h1>
      </section>
      <footer>
        <button onClick={props.onNext} className="next-btn">Go to homepage</button>
      </footer>
    </main>
  );
}