import React from 'react';
import Axios from 'axios';

export default function CurrentLocation(props) {

  return (
    <main className="">
      <section className="">
      <h1>CurrentLocation</h1>
      <button onClick={() => props.onConfirm}>Yes</button>
      <button onClick={() => props.onCancel}>No</button>
      </section>
    </main>
  );
}