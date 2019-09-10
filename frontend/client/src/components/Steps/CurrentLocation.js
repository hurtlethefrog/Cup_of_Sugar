import React from 'react';
import Axios from 'axios';
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function CurrentLocation(props) {

  return (
    <main>
      <section className="">
        <p>Verify your address based on your current location?</p>
        <button className="location-yes" onClick={props.onConfirm}>Yes</button>
        <button className="location-no" onClick={props.onCancel}>No</button>
      </section>
      <footer>
        <button onClick={props.onBack} className="back-btn">Back</button>
      </footer>
    </main>
  );
}