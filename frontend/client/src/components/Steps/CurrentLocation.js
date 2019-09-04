import React from 'react';
import Axios from 'axios';

export default function CurrentLocation(props) {

  return (
    <main>
      <section className="">
        <h1>Verify your address based on your current location?</h1>
        <button onClick={props.onConfirm}>Yes</button>
        <button onClick={props.onCancel}>No</button>
      </section>
      <footer>
        <button onClick={props.onBack} className="back-btn">Back</button>
      </footer>
    </main>
  );
}