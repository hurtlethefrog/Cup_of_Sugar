import React from 'react';
import Axios from 'axios';

export default function CurrentLocation(props) {

  return (
    <section className="">
      <h1>CurrentLocation</h1>
      <p>Verify your address based on your current location?</p>
      <footer>
        <button onClick={props.onConfirm}>Yes</button>
        <button onClick={props.onCancel}>No</button>
        <button onClick={props.onBack}>Back</button>
      </footer>
    </section>
  );
}