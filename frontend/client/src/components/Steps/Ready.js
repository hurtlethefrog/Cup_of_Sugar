import React from 'react';
import Axios from 'axios';

export default function Ready(props) {

  return (
    <section className="">
      <h1>All ready!</h1>
      <button onClick={props.onBack}>Back</button>
      <button onClick={props.onNext}>Go to homepage</button>
    </section>
  );
}