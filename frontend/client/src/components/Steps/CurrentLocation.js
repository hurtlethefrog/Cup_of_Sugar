import React from 'react';
import Axios from 'axios';

export default function CurrentLocation(props) {

  return (
    <main className="">
      <section className="">
      <h1>CurrentLocation</h1>
      <p>Verify your address based on your current location?</p>
      <button onClick={props.onConfirm}>Yes</button>
      <button onClick={props.onCancel}>No</button>
      <button onClick={props.onBack}>Back</button>
      </section>
    </main>
  );
}