import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/app";

export default function Ready(props) {

  return (
    <main>
      <section className="">
        <h1>All ready!</h1>
      </section>
      <footer>
        <Link to="/">Go to homepage</Link>
        {/* <button onClick={props.onNext} className="next-btn">Go to homepage</button> */}
      </footer>
    </main>
  );
}